import WebFont from 'webfontloader';
import createApp from './app';
import { ASyncComponent } from './components/ASyncComponent';

WebFont.load({
  google: {
    families: ['Open Sans:400,600'],
  },
});

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// Add router hook for handling async data.

// Doing it after initial route is resolved so that we don't double-fetch
// the data that we already have. Using router.beforeResolve() so that all
// async components are resolved.
router.beforeResolve((to, from, next) => {
  const matched = router.getMatchedComponents(to);
  const prevMatched = router.getMatchedComponents(from);

  // We only care about none-previously-rendered components,
  // so we compare them until the two matched lists differ.
  let diffed = false;

  const activated = matched.filter((c, i) => {
    return diffed || (diffed = (prevMatched[i] !== c));
  });

  if (!activated.length) {
    return next();
  }

  Promise.all(activated.map((c) => {
    if ((c as ASyncComponent).fetchInitialData) {
      return (c as ASyncComponent).fetchInitialData({
        store,
        route: to,
      });
    }
  }))
  .then(() => next())
  .catch(next);
});

router.onReady(() => {
  app.$mount('#app');
});

// Service worker
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
