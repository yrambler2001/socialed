import React, { Component } from "react";
import _ from 'lodash';
import { ReactiveVar } from 'meteor/reactive-var';
import Feed from "./Feed";
import PostsCollection from "/imports/api/posts/collection";
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';

const page = new ReactiveVar(1);
const loadNextPage = new ReactiveVar(false);
const content = new ReactiveVar([]);
const hasMore = new ReactiveVar(true);


class FeedContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      postsCount: 0
    }
  }
  redirect = () => {
    console.log(this.props);
  }

  changePage = (adder) => {
    console.log(1)
    hasMore.set(false)
    const { postsCount } = this.state;
    const pageCount = page.get();
    const nextPage = pageCount + adder;
    if (nextPage < 1 ) return
    if (nextPage > Math.ceil(postsCount/10)) return
    hasMore.set(true)
    page.set(pageCount + adder);
    loadNextPage.set(true)
  }

  componentDidMount(){
    setInterval(() => {
      Meteor.call('posts.count', (err, res) => {
        if (err) console.log(err);
        this.setState({ postsCount: res });
      });
    }, 1000)

  }

  render() {
    const { loading, isLoggedIn } = this.props;
    const { postsCount } = this.state;
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
        hasMore={hasMore.get()}
        posts={content.get()}
        redirect={this.redirect}
        page={page.get()}
        changePage={this.changePage}
        postsCount={postsCount}
      />
    );
  }
}

export default withTracker(props => {
  const posts = PostsCollection.find().fetch();
  const pageCount = page.get();
  const handlers = [
    Meteor.subscribe('posts', page.get()),
  ]

  const postsWithUsers = posts.map(p => {
    const user = Meteor.users.findOne(p.userId);
    return { ...p, author: user }
  });
  if (loadNextPage.get()){
  content.set(content.get().concat(postsWithUsers))
  loadNextPage.set(false)
  }
  return {
    posts: postsWithUsers,
    user: Meteor.user(),
    loading: Meteor.loggingIn(),//|| handlers.some(h => !h.ready()),
    isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
  };
})(FeedContainer);
