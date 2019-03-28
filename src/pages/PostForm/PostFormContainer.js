import React, { Component } from "react";
import PostForm from "./PostForm";

class PostFormContainer extends Component {
  render() {
    return <PostForm {...this.props} />;
  }
}

export default PostFormContainer;
