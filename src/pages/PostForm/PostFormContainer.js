import React, { Component } from "react";
import PostForm from "./PostForm";
import feedCollection from "../../collections/feed";
import { Redirect } from "react-router-dom";



class PostFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validTitle: undefined,
      validAuthor: undefined,
      validBody: undefined
    }
  }
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


  onChangeAuthor = (e) => {
    this.setState({
      validAuthor: ((t = e.currentTarget.value) => (
        (t.length > 2) //length must be longer than 2
        && (t.charAt(0).toUpperCase() === t.charAt(0)) //first char must be capital
        && (t.length < 30) //length must be shorter than 30
      ))()
    })
  }
  onChangeBody = (e) => {
    this.setState({
      validBody: ((t = e.currentTarget.value) => (
        (t.length > 5) //length must be longer than 2
        && (t.charAt(0).toUpperCase() === t.charAt(0)) //first char must be capital
        && (t.length < 1000) //length must be shorter than 20
      ))()
    })
  }
  onChangeTitle = (e) => {
    this.setState({
      validTitle: ((t = e.currentTarget.value) => (
        (t.length > 2) //length must be longer than 2
        && (t.charAt(0).toUpperCase() === t.charAt(0)) //first char must be capital
        && (t.length < 30) //length must be shorter than 30
      ))()
    })
  }
  render() {
    return <PostForm onChangeAuthor={this.onChangeAuthor} onChangeTitle={this.onChangeTitle} onChangeBody={this.onChangeBody}
      handleSubmit={this.handleSubmit} validTitle={this.state.validTitle} validAuthor={this.state.validAuthor}
      validBody={this.state.validBody} {...this.props} />;
  }
}

export default PostFormContainer;
