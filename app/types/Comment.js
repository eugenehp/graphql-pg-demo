import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import ObjectType from '../objectType';
import Time from './Time';
import User from './User';
import Post from './Post';
import {INode} from './Node';

import {
  connectionDefinitions,
} from 'graphql-relay';

const NAME = 'Comment';

const Comment = new GraphQLObjectType(ObjectType({
  name: NAME,
  description: 'A post',
  interfaces: [INode],
  fields: (field) => ({
    id: field.id(NAME),
    text: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(Time),
      resolve: ({created_at}) => new Date(created_at)
    },
    user: {
      type: new GraphQLNonNull(User),
      resolve: ({user_id}, _, {rootValue: {store}}) => store.users.load(user_id)
    },
    post: {
      type: new GraphQLNonNull(Post),
      resolve: async ({id}, args, {rootValue: {store}}) => {
      }
    },
  })
}));

export default Comment;

export const {
  connectionType: CommentConnection,
  edgeType: CommentEdge,
} = connectionDefinitions({name: NAME, nodeType: Comment});


