import React from "react";
import { Post } from "../../components";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Feed = ({ posts, text, redirect }) => {
  return (
    <div>
      <h1>{text}</h1>
      <Link to="/new">Post form</Link>
      <Button onClick={redirect}>Post form button</Button>
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
