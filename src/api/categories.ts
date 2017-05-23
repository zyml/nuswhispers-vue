import get from 'lodash/get';
import { normalize } from 'normalizr';

import client from './client';
import { categoryList } from './schema';

const apiRoot: string = process.env.NUSWHISPERS_API_ROOT;

export async function fetchCategories() {
  const response = await client.get(`${apiRoot}/categories`);
  const payload = get(response, 'data.data.categories');

  return normalize(payload, categoryList);
}
