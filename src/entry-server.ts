import Vue from 'vue';
import createApp from './app';
import { ASyncComponent } from './components/ASyncComponent';

export default (context: any) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }

      // Include fetching categories + top tags for navigation.
      Promise.all([
        store.dispatch('getCategories') as Promise<any>,
        store.dispatch('getTags') as Promise<any>,
        ...matchedComponents.map((c) => {
          if ((c as ASyncComponent).fetchInitialData) {
            return (c as ASyncComponent).fetchInitialData({
              store,
              route: router.currentRoute,
            });
          }
        }),
      ]).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);
  });
};
