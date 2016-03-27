import {
  GraphQLObjectType,
} from 'graphql';

import {
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

import ObjectType, {setNodeType} from '../objectType';

const NAME =  'Viewer';

export const VIEWER_OBJECT_ID = 'global';

export const VIEWER_OBJECT = setNodeType({name: NAME}, {
  id: VIEWER_OBJECT_ID
});

import {PostConnection} from './Post';
import {INode} from './Node';
import User from './User';

export default new GraphQLObjectType(ObjectType({
  name: NAME,
  interfaces: [INode],
  description: 'A singleton object that represents the "window" into the global app state.',
  fields: (type) => ({
    id: type.id(NAME),
    currentUser: {
      type: User,
      resolve: ({currentUser}, _, {rootValue: {user}}) => currentUser || user
    },
    posts: {
      type: PostConnection,
      args: connectionArgs,
      resolve: async ({id}, args, {rootValue: {store}}) => {
        const posts = await store.posts.query(q => q.orderBy('created_at', 'desc'));
        return connectionFromArray(posts, args);
      }
    }
  })
}));

