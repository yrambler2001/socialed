import 'bootstrap/dist/css/bootstrap.css';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
// import Feed from "./pages/Feed";
// import PostForm from "./pages/PostForm"
import { Feed, Profile, PostForm, NotFound } from "./pages";

import "./styles.css";

function App() {
  return (
    <AppLayout>
      <Router>
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/new" exact component={PostForm} />
          <Redirect from="/feed" to="/" />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppLayout>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
