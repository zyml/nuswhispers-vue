import get from 'lodash/get';
import { normalize } from 'normalizr';

import client from './client';
import { confession, confessionList } from './schema';

const apiRoot: string = process.env.NUSWHISPERS_API_ROOT;

async function fetch(endpoint: string, count: number = 10, offset: number = 0) {
  const response = await client.get(`${apiRoot}${endpoint}?count=${count}&offset=${offset}`);
  const payload = get(response, 'data.data.confessions');

  return normalize(payload, confessionList);
}

export function fetchLatest(count?: number, offset?: number) {
  return fetch('/confessions/recent', count, offset);
}

export function fetchFeatured(count?: number, offset?: number) {
  return fetch('/confessions', count, offset);
}

export function fetchPopular(count?: number, offset?: number) {
  return fetch('/confessions/popular', count, offset);
}

export function fetchByCategory(category: string, count?: number, offset?: number) {
  return fetch(`/confessions/category/${category}`, count, offset);
}

export function fetchByTag(tag: string, count?: number, offset?: number) {
  return fetch(`/confessions/tag/${tag}`, count, offset);
}

export function fetchByKeyword(keyword: string, count?: number, offset?: number) {
  return fetch(`/confessions/search/${keyword}`, count, offset);
}

export async function fetchById(id: string) {
  const response = await client.get(`${apiRoot}/confessions/${id}`);
  return normalize(get(response, 'data.data.confession'), confession);
}

export interface PostConfessionOptions {
  captcha: string;
  categories: string[];
  content: string;
  fingerprint?: string;
  image?: string;
}

export interface PostConfessionResponse {
  errors?: ErrorBag;
  fingerprint?: string;
  success: boolean;
}

export interface ErrorBag {
  [key: string]: string[];
}

export async function postConfession(payload: PostConfessionOptions) {
  const apiKey = 'EW5AnBNC5YauIxLW<tN';
  const data: object = {
    captcha: payload.captcha,
    categories: payload.categories,
    content: payload.content,
    image: payload.image,
  };
  data[apiKey] = payload.fingerprint;

  const response = await client.post(`${apiRoot}/confessions`, data);
  return {
    errors: get(response, `data.errors`) as ErrorBag,
    fingerprint: get(response, `data.${apiKey}`) as string,
    success: get(response, 'data.success') as boolean,
  };
}
