import React, { Component } from "react";
import _ from 'lodash';
import Feed from "./Feed";
import PostsCollection from "/imports/api/posts/collection";
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import { compose, withState } from 'recompose';

const POSTS_PER_PAGE = 10;
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
    const { postsCount } = this.state;
    const { page, setPage } = this.props;
    const currentPage = page;
    const nextPage = currentPage + adder;
    if (nextPage < 1 ) return
    if (nextPage > Math.ceil(postsCount / POSTS_PER_PAGE)) return
    setPage(currentPage + adder);
  }

  fetchPostsCount = _.debounce(() => {
    const { selectedUsers } = this.props;
    Meteor.call('posts.count', { selectedUsers }, (err, res) => {
      if (err) console.log(err);
      this.setState({ postsCount: res });

    });
  }, 500)

  resetPage() {
    const { setPage } = this.props;
    setPage(1);
  }

  componentDidMount(){
    this.fetchPostsCount();
    // setInterval(this.fetchPostsCount, 10000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.selectedUsers, prevProps.selectedUsers)) {
      this.resetPage();      
      this.fetchPostsCount();
    }
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
        redirect={this.redirect}
        changePage={this.changePage}
        postsCount={postsCount}
      />
    );
  }
}

export default compose(
  withState('isInitialLoading', 'setIsInitialLoading', true),
  withState('selectedUsers', 'setSelectedUsers', []),
  withState('page', 'setPage', 1),
  withTracker(props => {
    const { page, selectedUsers, isInitialLoading, setIsInitialLoading } = props;

    const handlers = [
      Meteor.subscribe('posts', { page, selectedUsers }),
    ];

    const posts = PostsCollection.find().fetch();

    const postsWithUsers = posts.map(p => {
      const user = Meteor.users.findOne(p.userId);
      return { ...p, author: user }
    });

    let loading = Meteor.loggingIn() || handlers.some(h => !h.ready());

    if (!isInitialLoading) {
      loading = false;
    } else {
      if (!loading) {
        setIsInitialLoading(false);
      }
    }

    return {
      posts: postsWithUsers,
      user: Meteor.user(),
      loading,
      isLoggedIn: !Meteor.loggingIn() && Meteor.userId()
    };
  })
)(FeedContainer);
