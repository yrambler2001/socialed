import React from "react";
import { Post } from "../../components";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Feed = ({ posts, redirect }) => {
  return (
    <div>
      <Button onClick={redirect}>
        <Link to="/new">
          New Post +
        </Link>
      </Button>
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
