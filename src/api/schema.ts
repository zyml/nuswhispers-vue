import { schema } from 'normalizr';

export const category: schema.Entity = new schema.Entity('category', {
}, {
  idAttribute: 'confessionCategoryId',
});

export const categoryList: schema.Entity[] = [category];

export const comment = new schema.Entity('comment', {});

export const commentList = [comment];

// Circular reference...
comment.define({ comments: { data: commentList }});

export const facebookInformation: schema.Entity = new schema.Entity('facebookInformation', {
  comments: { data: commentList },
});

export const confession: schema.Entity = new schema.Entity('confession', {
  categories: categoryList,
  facebookInformation,
}, {
  idAttribute: 'confessionId',
});

export const confessionList: schema.Entity[] = [confession];

export const tag = new schema.Entity('tag', {}, {
  idAttribute: 'confessionTagId',
});

export const tagList: schema.Entity[] = [tag];
