import React, { Component, Fragment } from "react";
import Profile from "./Profile";
import feedCollection from "../../collections/feed";
import { Link } from "react-router-dom";




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
    return (
      <Fragment>
        <Link to="/feed">Feed</Link>
        <br/>
        <Link to="/new">Post form</Link>
        <Profile />
      </Fragment>
    );
  }
}

export default PostFormContainer;
