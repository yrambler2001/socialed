import React, { Component } from "react";
import Feed from "./Feed";
import feedCollection from "../../collections/feed";

class FeedContainer extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const posts = await this.getPosts();
    this.setState({ posts });
  }

  async getPosts() {
    try {
      const posts = await new Promise((resolve, reject) => {
        (feedCollection.items.length == 0) ? reject("empty feed") : resolve(feedCollection.items)
      });
      return posts;
    } catch (e) { console.log(e);return [];/*[{title: "Lorem",author:"ipsum",body:"dolor sit amet"}];*/ }
  }

  redirect = () => {
    console.log(this.props);
  }

  render() {
    const { posts, text } = this.state;
    return <Feed {...this.props} posts={posts} text={text} redirect={this.redirect} />;
  }
}

export default FeedContainer;
