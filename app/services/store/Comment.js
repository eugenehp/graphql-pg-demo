import Comment from '../../types/Comment';

import {createSQLLoader} from './sqlLoader.js';

export default () => {
  const loader = createSQLLoader({tableName: 'comments', type: Comment});
  return loader;
};

