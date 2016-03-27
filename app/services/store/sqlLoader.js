
import DataLoader from 'dataloader';
import pg from '../pg';

import {setNodeType} from '../../objectType';

DataLoader.prototype.prime = function(key, value) {
  if (this._options && this._options.cache === false) {
    return;
  }
  if (!(this._promiseCache instanceof Map)) {
    throw new Error('DataLoader implementation changed. Need to change impl of DataLoader.prime');
  }
  this._promiseCache.set(key, Promise.resolve(value));
};

DataLoader.prototype.primeManyById = function(records) {
  for (let record of records) {
    if (record.id === undefined) {
      console.warn(`DataLoader.primeManyById() called with record that lacks 'id' field`);
    } else {
      this.prime(record.id, record);
    }
  }
};

export const createSQLLoader = ({tableName, type}) => {
  const toNodeType = setNodeType.bind(null, type);

  const query = async (cb) => {
    let records = await cb(pg(tableName));
    records = records.map(toNodeType);
    loader.primeManyById(records);
    return records;
  };

  const batchFn = async (keys) => {
    const results = await query(q => q.whereIn('id', keys));
    return keys.map(k => results.find(({id}) => id === k));
  };

  const loader = new DataLoader(batchFn);
  loader.query = query;
  return loader;
};
