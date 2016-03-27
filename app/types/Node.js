import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

const tableTypeMap = {
  User: 'users',
  Show: 'shows',
};

const resolveNode = (globalID, resolveInfo) => {
  const {VIEWER_OBJECT} = require('./Viewer');
  const {VIEWER_OBJECT_ID} = require('../types/Viewer');
  const {type, id} = fromGlobalId(globalID);
  if (id === VIEWER_OBJECT_ID) return VIEWER_OBJECT;
  const {rootValue: {store}} = resolveInfo;
  return store[tableTypeMap[type]].load(id);
};


const nodeDefs = nodeDefinitions(
  resolveNode,
);


export const INode = nodeDefs.nodeInterface;

export default nodeDefs.nodeField;

