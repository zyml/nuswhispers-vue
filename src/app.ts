import Vue from 'vue';
import Router from 'vue-router';

import App from './components/App/index.vue';
import createRouter from './router';
import createStore, { Store } from './store';

import './components';

export interface Application {
  app: Vue;
  router: Router;
  store: Store;
}

export default function createApp(): Application {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    render: (h) => h(App),
    router,
    store,
  });

  return {
    app,
    router,
    store,
  };
}
