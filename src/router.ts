import Vue from 'vue';
import Router, { Route, RouteConfig } from 'vue-router';
import { Store } from './store';

import Category from './views/Category';
import Confession from './views/Confession';
import Featured from './views/Featured';
import Latest from './views/Latest';
import NotFound from './views/NotFound';
import Policy from './views/Policy';
import Popular from './views/Popular';
import Search from './views/Search';
import Submit from './views/Submit';
import Success from './views/Success';
import Tag from './views/Tag';

Vue.use(Router);

const routes: RouteConfig[] = [
  { path: '/', component: Featured },
  { path: '/latest', component: Latest },
  { path: '/popular', component: Popular },
  { path: '/category/:id', component: Category },
  { path: '/tag/:id', component: Tag },
  { path: '/confession/:id', component: Confession },
  { path: '/search/:keyword?', component: Search },
  { path: '/submit', component: Submit },
  { path: '/success', component: Success },
  { path: '/policy', component: Policy },
  { path: '*', component: NotFound },
];

export default function createRouter(): Router {
  return new Router({
    mode: 'history',
    routes,
  });
}
