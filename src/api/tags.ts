import get from 'lodash/get';
import { normalize } from 'normalizr';

import client from './client';
import { tagList } from './schema';

const apiRoot: string = process.env.NUSWHISPERS_API_ROOT;

export async function fetchTags(count?: number) {
  const response = await client.get(`${apiRoot}/tags/top/${count}`);
  const payload = get(response, 'data.data.tags');

  return normalize(payload, tagList);
}
