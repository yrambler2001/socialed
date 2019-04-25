import React from 'react'
import Comment from './components/Comment';
import CommentForm from './components/CommentForm';
import { ListGroup, ListGroupItem } from 'reactstrap';

const PostComments = ({ submitComment, comments }) => {
  return (
    <div>
      { comments.length ? (
        <details>
          <summary>Comments ({ comments.length })</summary>
          <ListGroup>
            {
              comments.map((c) => <ListGroupItem key={c._id}> <Comment {...c} /> </ListGroupItem>)
            }
          </ListGroup>
        </details>
      ) : null }
      <CommentForm onSubmit={submitComment} />
    </div>
  )
}

export default PostComments;
