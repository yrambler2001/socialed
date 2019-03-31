import React, { Component } from "react";
import PostForm from "./PostForm";
import feedCollection from "../../collections/feed";
import { Redirect } from "react-router-dom";



class PostFormContainer extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let post = {
      author: event.currentTarget.author.value,
      title: event.currentTarget.title.value,
      body: event.currentTarget.body.value
    };

    feedCollection.insert(post);
    this.props.history.push('/feed');
  }
  render() {
    return <PostForm handleSubmit={this.handleSubmit} {...this.props} />;
  }
}

export default PostFormContainer;
