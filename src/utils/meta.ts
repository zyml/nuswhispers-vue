/* tslint:disable:max-line-length */
import Vue from 'vue';

interface Meta {
  [key: string]: string;
}

const batchAttributes = (properties: string[], content: string): Meta[] =>
  properties.map((property) => ({ content, property }));

export const generateTitle = (content: string): Meta[] =>
  batchAttributes(['og:title', 'twitter:title'], content);

export const generateDescription = (content: string): Meta[] =>
  batchAttributes(['description', 'og:description', 'twitter:description'], content);

export const generateImage = (content: string): Meta[] =>
  batchAttributes(['og:image', 'twitter:image'], content);

export const defaultTitle = (): Meta[] => generateTitle('NUSWhispers');

export const defaultDescription = (): Meta[] =>
  generateDescription('Have an interesting story to share or just need to get something off your chest? Tell us your story here at NUSWhispers! No one will know it was you.');

export const defaultImage = (): Meta[] => generateImage('https://nuswhispers.com/favicon-512x512.png');
