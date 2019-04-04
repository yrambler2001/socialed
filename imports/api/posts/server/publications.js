import { Meteor } from 'meteor/meteor';
import PostsCollection from '../collection';

Meteor.publish('posts', function() {
  if (!this.userId) return this.ready();
  return PostsCollection.find({
    // userId: this.userId
  }, {
    // fields: {
    //   createdAt: false
    // },
    sort: {
      createdAt: -1
    }
  });
});

