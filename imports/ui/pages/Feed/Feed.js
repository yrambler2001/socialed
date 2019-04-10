import React from "react";
import { Post } from "../../components";
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller'

const Feed = ({ posts, redirect, loading, page, postsCount, changePage, hasMore }) => {
  // if (loading) return <h1>...Loading</h1>
  // console.log(hasMore)
  return (
    <div>
      <Button onClick={redirect}>
        <Link to="/new">
          New Post +
        </Link>
      </Button>
      {/*<Button onClick={() => changePage(-1)}>Prev Page</Button>*/}
      <Button onClick={() => changePage(1)}>Next Page</Button>
      <Card>
        <CardHeader>Page:{page} Count:{postsCount}</CardHeader>
        <CardBody>
        {(postsCount!==0)?
          <InfiniteScroll
            pageStart={0}
            loadMore={() => changePage(1)}//this.loadItems.bind(this)}
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}>
            {posts.map(post => (
              <Post {...post} key={post._id} />
            ))}
          </InfiniteScroll>:<div className="loader" key={0}>Loading ...</div>}
        </CardBody>
      </Card>

    </div>
  );
};

export default Feed;
