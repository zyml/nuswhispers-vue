import snakeCase from 'lodash/snakeCase';
import store from 'store';
import { ActionContext, ActionTree } from 'vuex';
import { fetchCategories } from '../api/categories';
import {
  fetchByCategory,
  fetchById,
  fetchByKeyword,
  fetchByTag,
  fetchFeatured,
  fetchLatest,
  fetchPopular,
  postConfession,
} from '../api/confessions';
import { fetchTags } from '../api/tags';
import capitalize from '../utils/capitalize';
import State from './state';

type FetchFunction = (count?: number, offset?: number) => Promise<any>;
type FetchByFunction = (id: string, count?: number, offset?: number) => Promise<any>;

const getNext = (fetch: FetchFunction, type: string, skipIfNotEmpty?: boolean) => {
  return (ctx: ActionContext<State, any>) => {
    if (skipIfNotEmpty && ctx.state[type].length) {
      return Promise.resolve();
    }

    return fetch(ctx.state.itemsPerPage, ctx.state[type].length).then((payload) => {
      ctx.commit('updateEntities', payload.entities);
      ctx.commit(`update${capitalize(type)}`, payload.result);
    });
  };
};

const getFeatured = getNext(fetchFeatured, 'featured', true);
const getNextFeatured = getNext(fetchFeatured, 'featured');
const getLatest = getNext(fetchLatest, 'latest', true);
const getNextLatest = getNext(fetchLatest, 'latest');
const getPopular = getNext(fetchPopular, 'popular', true);
const getNextPopular = getNext(fetchPopular, 'popular');

const getCategories = (ctx: ActionContext<State, any>) => {
  if (Object.keys(ctx.state.categories).length) {
    return Promise.resolve();
  }

  return fetchCategories().then((payload) => {
    ctx.commit('updateEntities', payload.entities);
  });
};

const getTags = (ctx: ActionContext<State, any>) => {
  if (Object.keys(ctx.state.tags).length) {
    return Promise.resolve();
  }

  return fetchTags(9).then((payload) => {
    ctx.commit('updateEntities', payload.entities);
  });
};

const getByNext = (fetch: FetchByFunction, type: string, skipIfNotEmpty?: boolean) => {
  return (ctx: ActionContext<State, any>, id: string) => {
    const count: number = ctx.state[type][id] ?
      ctx.state[type][id].length : 0;

    if (skipIfNotEmpty && count) {
      return Promise.resolve();
    }

    return fetch(id, ctx.state.itemsPerPage, count).then((payload) => {
      ctx.commit('updateEntities', payload.entities);
      ctx.commit(`update${capitalize(type)}`, { id, list: payload.result });
    });
  };
};

const getByCategory = getByNext(fetchByCategory, 'listsByCategory', true);
const getNextByCategory = getByNext(fetchByCategory, 'listsByCategory');

const getByTag = getByNext(fetchByTag, 'listsByTag', true);
const getNextByTag = getByNext(fetchByTag, 'listsByTag');

const getByKeyword = getByNext(fetchByKeyword, 'listsByKeyword', true);
const getNextByKeyword = getByNext(fetchByKeyword, 'listsByKeyword');

const getById = (ctx: ActionContext<State, any>, id: string) => {
  if (ctx.state.items[id]) {
    return Promise.resolve();
  }

  return fetchById(id).then((payload) => {
    ctx.commit('updateEntities', payload.entities);
  });
};

interface SubmitOptions {
  captcha: string;
  categories: string[];
  content: string;
  image?: string;
}

const submitConfession = (ctx: ActionContext<State, any>, payload: SubmitOptions) => {
  const storageKey: string = '7pF4ZPxJEE';

  // API returns a 200 on validation error (bad practice, I know).
  // We need to wrap the API call promise with another one to catch failures.
  return new Promise<any>((resolve, reject) => {
    postConfession({ ...payload, fingerprint: store.get(storageKey) })
    .then(({ errors, fingerprint, success }) => {
      if (!success) {
        reject({ errors, fingerprint, success });
      }
      store.set(storageKey, fingerprint);
      resolve({ errors, fingerprint, success });
    });
  });
};

export default {
  getByCategory,
  getById,
  getByKeyword,
  getByTag,
  getCategories,
  getFeatured,
  getLatest,
  getNextByCategory,
  getNextByKeyword,
  getNextByTag,
  getNextFeatured,
  getNextLatest,
  getNextPopular,
  getPopular,
  getTags,
  submitConfession,
};
