import { Meteor } from 'meteor/meteor';
import PostsCollection from '../collection';

Meteor.methods({
  'posts.insert': function ({ body }) {
    if (!this.userId) {
      throw Meteor.Error('Not authorized');
    }

    if (typeof body !== 'string' || body.length <= 5) {
      throw Meteor.Error('Post should be longer than 5 characters');
    }

    const _id = PostsCollection.insert({
      body,
      userId: this.userId,
      createdAt: new Date(),
    });

    return _id;
  }
});
