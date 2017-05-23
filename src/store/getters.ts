import { Dictionary } from 'lodash';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import { GetterTree } from 'vuex';
import State, { Category, Confession, Tag } from './state';

const map = (type: string) => (state: State): Confession[] => state[type].map((id: string) => state.items[id]);
const mapById = (type: string) => (state: State) => (taxonomyId: string) => {
  if (!state[type][taxonomyId]) {
    return [];
  }
  return state[type][taxonomyId].map((id: string) => state.items[id]);
};

const featured = map('featured');
const latest = map('latest');
const popular = map('popular');

const listByCategory = mapById('listsByCategory');
const listByTag = mapById('listsByTag');
const listByKeyword = mapById('listsByKeyword');

const listById = (state: State) => (id: string) =>
  find(state.items, (item: Confession) => item.confessionId === id);

const categories = (state: State): Category[] =>
  sortBy<Category>(state.categories, 'confessionCategory');

const categoryById = (state: State) => (id: string) =>
  find(state.categories, (category: Category) => category.confessionCategoryId === id);

const categoriesByIds = (state: State) => (ids: string[]) =>
  ids.map((id: string) => find(state.categories, (category: Category) => category.confessionCategoryId === id));

const tags = (state: State): Tag[] => state.tags;

export default {
  categories,
  categoryById,
  categoriesByIds,
  featured,
  latest,
  popular,
  tags,
  listByCategory,
  listByTag,
  listByKeyword,
  listById,
};
