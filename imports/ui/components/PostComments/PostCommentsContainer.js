import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PostComments from './PostComments';
import { toast } from 'react-toastify';
import CommentsCollection from '/imports/api/comments/collection';

class PostCommentsContainer extends Component {
  submitComment = ({ text }) => {
    return new Promise((resolve, reject) => {
      if (!text) {
        reject('Comment text cannot be empty');
        return;
      }
      const { postId } = this.props;
      Meteor.call('comments.insert', { postId, text }, (error) => {
        if (error) {
          reject(error.message);
          return;
        }
        resolve();
      });
    });
  }

  render() {
    return (
      <PostComments {...this.props} submitComment={this.submitComment} />
    )
  }
}

export default withTracker((props) => {
  const { postId } = props;

  Meteor.subscribe('comments', { postId });
  let comments = CommentsCollection.find({ postId }).fetch();

  // let comments = [{
  //   _id: '123',
  //   userId: 'j5ubEmnkgbAmm2nBN',
  //   text: 'asdf',
  //   createdAt: new Date(),
  //   postId,
  // }];

  comments = comments.map(p => {
    const user = Meteor.users.findOne(p.userId);
    return { ...p, author: user }
  });

  return {
    comments,
  }
})(PostCommentsContainer);
