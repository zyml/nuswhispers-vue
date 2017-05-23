export interface Dictionary<T> {
  [key: string]: T;
}

export interface Category {
  confessionCategory: string;
  confessionCategoryId: string;
}

export interface Confession {
  categories: string[];
  confessionId: string;
  content: string;
  createdAt: string;
  facebookInformation: string;
  favourites: string[];
  fbCommentCount: number;
  fbLikeCount: number;
  fbPostId: number;
  images: string | null;
  status: string;
  statusUpdatedAt: string;
  statusUpdatedAtTimestamp: string;
  updatedAt: string;
  views: number;
}

export interface Meta {
}

export interface Comment {
}

export interface Tag {
}

export default class State {
  public categories: Dictionary<Category> = {};
  public comments: Dictionary<Comment> = {};
  public items: Dictionary<Confession> = {};
  public itemsPerPage: number = 10;

  public featured: string[] = [];
  public latest: string[] = [];
  public popular: string[] = [];

  public listsByCategory: { [key: string]: string[] } = {};
  public listsByTag: { [key: string]: string[] } = {};
  public listsByKeyword: { [key: string]: string[] } = {};

  public metas: Dictionary<Meta> = {};
  public tags: Tag[] = [];
}
