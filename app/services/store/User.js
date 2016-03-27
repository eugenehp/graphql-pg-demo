import User from '../../types/User';

import {createSQLLoader} from './sqlLoader.js';

export default () => {
  const loader = createSQLLoader({tableName: 'users', type: User});
  return loader;
};

