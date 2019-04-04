import React, { Component } from "react";
import Feed from "./Feed";
import feedCollection from "../../collections/feed";
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

class FeedContainer extends Component {
  state = {
    posts: [],
    postsLoaded: false
  };

  async getPosts() {
    console.log('Getting posts', this.props.isLoggedIn);
    try {
      const posts = await new Promise((resolve, reject) => {
        (feedCollection.items.length == 0) ? reject("empty feed") : resolve(feedCollection.items)
      });
      return posts;
    } catch (e) { console.log(e); return [];/*[{title: "Lorem",author:"ipsum",body:"dolor sit amet"}];*/ }
  }

  async fetchAndSetPosts() {
    this.fetchedPostsOnce = true;
    const posts = await this.getPosts();
    this.setState({ posts });
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.fetchAndSetPosts();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn && !this.fetchedPostsOnce) {
      this.fetchAndSetPosts();
    }
  }

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
    const { text, posts } = this.state;
    return (
      <Feed
        {...this.props}
        posts={posts}
        text={text}
        redirect={this.redirect}
      />
    );
  }
}

export default withTracker(props => {
  return {
    user: Meteor.user(),
    loading: Meteor.loggingIn(),
    isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
  };
})(FeedContainer);
