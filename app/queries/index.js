import {
  GraphQLObjectType,
} from 'graphql';

import NodeType from '../types/Node';
import ViewerQuery from './Viewer';
import User from './User';
import Post from './Post';
import Comment from './Comment';

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    node: NodeType,
    viewer: ViewerQuery,
    user: User,
    post: Post,
    comment: Comment,
  }
});


