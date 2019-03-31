import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const PostForm = props => (
  <Fragment>
    <Link to="/feed">Feed</Link>
    <h4>PostForm</h4>
    <Form onSubmit={props.handleSubmit}>
    <FormGroup>
          <Label for="authorInput">Author</Label>
          <Input type="text" name="author" id="AuthorInput" placeholder="It's me :P" />
        </FormGroup>
        <FormGroup>
          <Label for="titleInput">Title</Label>
          <Input type="text" name="title" id="titleInput" placeholder="My awesome title" />
        </FormGroup>
        <FormGroup>
          <Label for="bodyInput">Body</Label>
          <Input type="textarea" name="body" id="bodyInput" placeholder="Lorem ipsum..." />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
  </Fragment>
);

export default PostForm;


