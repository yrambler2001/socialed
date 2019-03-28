import React, { Component } from "react";
import Feed from "./Feed";

class FeedContainer extends Component {
  state = {
    posts: []
  };


  async componentDidMount() {
    const posts = await this.fetchPosts();
    this.setState({ posts });
  }


  async fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    const promises = posts.map(async (post) => {
      const { userId } = post;
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = await response.json();
      post.author = user.name;
      return post
    });
        
    const postsWithAuthors = await Promise.all(promises)
    return postsWithAuthors;
  }

  redirect = () => {
    console.log(this.props);
  }

  render() {
    const { posts, text } = this.state;
    return <Feed {...this.props} posts={posts} text={text} redirect={this.redirect} />;
  }
}

// export default class FeedContainerContainer extends Component {
//   state = { kill: false };
//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({ kill: true });
//     }, 5000);
//   }
//   render() {
//     return <div>{this.state.kill ? <h2>KILLED</h2> : <FeedContainer />}</div>;
//   }
// }
export default FeedContainer;
