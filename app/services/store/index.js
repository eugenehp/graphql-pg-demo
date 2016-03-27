import pg from '../pg';

import UserStore from './User';
import PostStore from './Post';
import CommentStore from './Comment';

export const createStore = () => {
  const store = {pg};

  store.users = UserStore();
  store.posts = PostStore();
  store.comments = CommentStore();

  return store;
};

