import {GraphQLString, GraphQLNonNull, GraphQLID} from 'graphql';
import winston from 'winston';
import {mutationWithClientMutationId} from 'graphql-relay';
import Comment, {CommentEdge} from '../types/Comment';
import Post from '../types/Post';
import {setNodeType} from '../objectType';

import {
  fromGlobalId,
  cursorForObjectInConnection
} from 'graphql-relay';

export default mutationWithClientMutationId({
  name: 'createComment',

  inputFields: {
    text: {
      type: new GraphQLNonNull(GraphQLString)
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID)
    },
  },

  outputFields: {
    post: {
      type: new GraphQLNonNull(Post)
    },
    newCommentEdge: {
      type: new GraphQLNonNull(CommentEdge),
    },
  },

  mutateAndGetPayload: async (input, {rootValue: {user, db}}) => {
    try {
      const {comment, post} = await db.transaction(async (trx) => {
        const {id: postId} = fromGlobalId(input.postId);
        const post = await trx('posts').where('id', postId).first();
        const [comment] = await trx('comments').insert({
          text: input.text,
          post_id: post.id,
          user_id: user.id
        }, '*');

        return {
          comment: setNodeType(Comment, comment),
          post: setNodeType(Post, post)
        };
      });

      const comments = await db('comments')
        .select('id')
        .where({post_id: post.id})
        .orderByRaw('created_at ASC');

      return {
        post,
        newCommentEdge: {
          node: comment,
          cursor: cursorForObjectInConnection(comments.map(({id}) => id), comment.id)
        }
      };
    } catch(e) {
      winston.error(e);
      throw(e);
    }
  }

});



