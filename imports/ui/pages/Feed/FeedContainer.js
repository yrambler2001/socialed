import React, { Component } from "react";
import Feed from "./Feed";
import PostsCollection from "/imports/api/posts/collection";
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

class FeedContainer extends Component {
  redirect = () => {
    console.log(this.props);
  }

  render() {
    const { loading, isLoggedIn } = this.props;
    if (loading) {
      return (<h1>Loading</h1>);
    }
    if (!isLoggedIn) {
      return (
        <Redirect to="/login" />
      )
    }
    return (
      <Feed
        {...this.props}
        redirect={this.redirect}
      />
    );
  }
}

export default withTracker(props => {
  const handler = Meteor.subscribe('posts');
  const posts = PostsCollection.find().fetch();
  return {
    posts,
    user: Meteor.user(),
    loading: Meteor.loggingIn(),
    isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
  };
})(FeedContainer);
