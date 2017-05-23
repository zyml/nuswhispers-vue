const fs = require('fs');
const path = require('path');
const express = require('express');
const serverRenderer = require('vue-server-renderer');
const LRU = require('lru-cache');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

const resolve = p => path.resolve(__dirname, p);

const serveStatic = (p, isCached = false) => express.static(resolve(p), {
  maxAge: isCached && isProduction ? 60 * 60 * 24 * 30 : 0,
});

const createRenderer = (bundle, { template, clientManifest }) =>
  serverRenderer.createBundleRenderer(bundle, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    clientManifest,
    template,
    runInNewContext: false,
  });

let renderer;
let readyPromise;

if (isProduction) {
  // Create server renderer using server bundle and index HTML template
  // from the real filesystem.
  const bundle = require('./dist/vue-ssr-server-bundle.json'); // eslint-disable-line global-require
  const template = fs.readFileSync('./dist/index.template.html', 'utf-8');
  const clientManifest = JSON.parse(fs.readFileSync('./dist/public/vue-ssr-client-manifest.json', 'utf-8'));

  renderer = createRenderer(bundle, { template, clientManifest });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  const createDevServer = require('./internals/scripts/dev-server'); // eslint-disable-line global-require

  readyPromise = createDevServer(app)
    .then(([bundle, renderOptions]) => {
      renderer = createRenderer(bundle, renderOptions);
    }).catch(err => console.error(err));
}

const render = (req, res) => {
  const s = Date.now();

  res.setHeader('Content-Type', 'text/html');

  const errorHandler = (err) => {
    if (err && err.code === 404) {
      res.status(404).end('404 | Page Not Found');
    } else {
      res.status(500).end('500 | Internal Server Error');
      console.error(`Error during render : ${req.url}`);
      console.error(err);
    }
  };

  const ctx = { url: req.url, title: 'NUSWhispers', meta: '' };

  renderer.renderToStream(ctx)
    .on('error', errorHandler)
    .on('end', () => console.log(`Whole request: ${Date.now() - s}ms`))
    .pipe(res);
};

// Serve static assets.
app.use('/', serveStatic('dist/public', true));
app.use('/favicon.ico', serveStatic('dist/public/icons/favicon.ico', true));

app.get('*', (req, res) => {
  if (isProduction) {
    return render(req, res);
  }

  return readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || 8090;
app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Server started on http://localhost:${port}.`);
});
