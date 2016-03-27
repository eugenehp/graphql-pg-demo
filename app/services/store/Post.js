import Post from '../../types/Post';

import {createSQLLoader} from './sqlLoader.js';

export default () => {
  const loader = createSQLLoader({tableName: 'posts', type: Post});
  return loader;
};


