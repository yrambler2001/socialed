import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Profile from "./Profile";
import { withTracker } from 'meteor/react-meteor-data';

class ProfileContainer extends Component {
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
    return (
      <Profile
        {...this.props}
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
})(ProfileContainer);
