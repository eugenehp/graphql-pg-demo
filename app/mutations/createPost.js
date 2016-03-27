import {GraphQLString, GraphQLNonNull} from 'graphql';
import winston from 'winston';
import {mutationWithClientMutationId} from 'graphql-relay';
import Post, {PostEdge} from '../types/Post';
import User from '../types/User';
import Viewer, {VIEWER_OBJECT} from '../types/Viewer';
import {setNodeType} from '../objectType';

import {
  cursorForObjectInConnection
} from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'createPost',

  inputFields: {
    text: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },

  outputFields: {
    viewer: {
      type: new GraphQLNonNull(Viewer)
    },
    user: {
      type: new GraphQLNonNull(User)
    },
    newPostEdge: {
      type: new GraphQLNonNull(PostEdge),
    },
  },

  mutateAndGetPayload: async (input, {rootValue: {user, db}}) => {
    try {
      let post = await db.transaction(async (trx) => {
        const [post] = await trx('posts').insert({
          text: input.text,
          user_id: user.id
        }, '*');

        return post;
      });

      const posts = await db('posts');

      return {
        user,
        viewer: VIEWER_OBJECT,
        newPostEdge: {
          node: setNodeType(Post, post),
          cursor: cursorForObjectInConnection(posts.map(({id}) => id), post.id)
        }
      };
    } catch(e) {
      winston.error(e);
      throw(e);
    }
  }

});

