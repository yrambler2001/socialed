import { Meteor } from 'meteor/meteor';
import CommentsCollection from '../collection';

Meteor.methods({
  'comments.insert': function ({ text, postId }) {
    if (!this.userId) {
      throw Meteor.Error('Not authorized');
    }

    if (typeof text !== 'string' || !postId) {
      throw new Meteor.Error('Comment or parent post is missing');
    } 

    const trimmed = text.trim();
    if (!trimmed) {
      throw new Meteor.Error('Comment cannot be empty');
    }

    const _id = CommentsCollection.insert({
      postId,
      text: trimmed,
      userId: this.userId,
      createdAt: new Date(),
    });

    return _id;
  },

  // 'posts.count'({ selectedUsers }){
  //   if (!this.userId) {
  //     throw Meteor.Error('Not authorized');
  //   }

  //   return CommentsCollection.find({
  //     ...(selectedUsers.length ? { userId: { $in: selectedUsers } } : {})
  //   }).count();
  // },

});
