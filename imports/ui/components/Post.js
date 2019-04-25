import React from "react";
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import PostComments from '/imports/ui/components/PostComments';

const Post = ({ userId, body, createdAt, _id, author }) => (
  <Card className="mb-4" id={_id}>
    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
    <CardBody>
      <CardSubtitle>{author ? author.profile.fullName : userId}</CardSubtitle>
      <CardText>{body}</CardText>
      <CardText>{String(createdAt)}</CardText>
      <PostComments postId={_id} />
    </CardBody>
  </Card>
);
export default Post;
