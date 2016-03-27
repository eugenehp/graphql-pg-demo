import winston from 'winston';

export const seed = async (knex) => {
  await knex('comments').del();
  await knex('posts').del();
  await knex('users').del();

  try {
    await knex('users').insert({
      username: 'foo',
      email: 'foo@bar.com',
    });

    const user = await knex('users').first();

    const posts = [
      { text: 'Post 1', },
      { text: 'Post 2', }
    ];

    for (let post of posts) {
      await knex('posts').insert({
        ...post,
        user_id: user.id,
      });
    }

    const post = await knex('posts').first();

    const comments = [
      'A comment',
      'A comment 2',
      'A comment 3',
      'A comment 4',
      'A comment 4',
      'A comment 5',
    ];

    for (let text of comments) {
      await knex('comments').insert({
        text,
        post_id: post.id,
        user_id: user.id,
      });
    }

  } catch (e) {
    winston.error('Error', e);
    throw e;
  }
};
