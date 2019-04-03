import React, { Component } from "react";
import Feed from "./Feed";
import feedCollection from "../../collections/feed";
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

class FeedContainer extends Component {
  state = {
    _posts: [],
    postsLoaded: false
  };

  async getPosts() {
    try {
      const _posts = await new Promise((resolve, reject) => {
        (feedCollection.items.length == 0) ? reject("empty feed") : resolve(feedCollection.items)
      });
      return _posts;
    } catch (e) { console.log(e); return [];/*[{title: "Lorem",author:"ipsum",body:"dolor sit amet"}];*/ }
  }

  async updatePosts() {
    const _posts = await this.getPosts();
    this.setState({ _posts });
  }

  //posts are loaded only when user is logged in and only one time.
  get posts() { if (!this.state.postsLoaded) { this.state.postsLoaded = true; this.updatePosts(); }; return this.state._posts; }

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
    const { text } = this.state;
    return <Feed {...this.props} posts={this.posts} text={text} redirect={this.redirect} />;
  }
}

export default withTracker(props => {
  return {
    user: Meteor.user(),
    loading: Meteor.loggingIn(),
    isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
  };
})(FeedContainer);
