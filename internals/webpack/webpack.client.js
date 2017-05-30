require('dotenv').config();

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconPlugin = require('favicons-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');

const baseConfig = require('./webpack.base');
const createClientEnvironment = require('./env');

const rootPath = path.join(__dirname, '../../');

const isProduction = env => env.NODE_ENV === 'production';

module.exports = (env = process.env) => {
  const config = merge(baseConfig(env), {
    devtool: isProduction(env) ? 'source-map' : 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin(createClientEnvironment(Object.assign(env, {
        VUE_ENV: 'client',
      }))),
      new CopyWebpackPlugin([
        {
          from: path.join(rootPath, 'static'),
          to: path.join(rootPath, 'dist/public'),
        },
      ]),
      new webpack.optimize.UglifyJsPlugin({
        compress: isProduction(env) ? { warnings: false } : false,
      }),
      new FaviconPlugin({
        logo: './internals/templates/favicon.png',
        prefix: 'icons/',
        persistentCache: true,
        inject: true,
        background: '#fff',
        title: 'NUSWhispers',
        icons: {
          android: isProduction(env),
          appleIcon: isProduction(env),
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: isProduction(env),
          windows: isProduction(env),
          yandex: isProduction(env),
        },
      }),
      new HtmlPlugin({
        filename: '../index.template.html',
        template: './internals/templates/index.hbs',
        inject: true,
        minify: {
          removeComments: false,
          collapseWhitespace: isProduction(env),
          removeAttributeQuotes: isProduction(env),
        },
        chunksSortMode: 'dependency',
        excludeChunks: ['app', 'vendor'], // Handled by vue-server-renderer.
      }),
      new VueSSRClientPlugin(),
    ],
  });

  if (isProduction(env)) {
    config.plugins.push(
      // Split vendor into its own file.
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module =>
          // Any required modules inside node_modules are extracted to vendor.
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0,
      }),
      // Extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated.
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor'],
        minChunks: Infinity,
      }),
      new SWPrecachePlugin({
        cacheId: 'nuswhispers-vue',
        filename: 'service-worker.js',
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/index\.template\.html$/, /\.json$/, /\.map$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.nuswhispers\.com\/api/,
            handler: 'networkFirst',
          },
          {
            urlPattern: '/',
            handler: 'networkFirst',
          },
          {
            urlPattern: /\/(latest|popular|success|policy)/,
            handler: 'networkFirst',
          },
          {
            urlPattern: '/confession/:id',
            handler: 'networkFirst',
          },
          {
            urlPattern: '/category/:id',
            handler: 'networkFirst',
          },
          {
            urlPattern: '/tag/:id',
            handler: 'networkFirst',
          },
          {
            urlPattern: '/search/:id',
            handler: 'networkFirst',
          },
        ],
      })
    );
  }

  return config;
};
