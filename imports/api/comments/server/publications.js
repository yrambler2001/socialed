import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import CommentsCollection from '../collection';

publishComposite('comments', function({ postId, limit, skip }) {
  if (!this.userId) return this.ready();
  return {
    find(){
      return CommentsCollection.find({ postId }, {
        sort: {
          createdAt: -1
        },
        limit,
        skip,
      });
    },
    children: [
      {
        find(comment){
          return Meteor.users.find(comment.userId, { fields: { 'profile.fullName': 1 }});
        }
      },
      // {
      //   find(post){
      //     return customElements.find({postId: post._id})
      //   },

      // }
    ]
  }
});

