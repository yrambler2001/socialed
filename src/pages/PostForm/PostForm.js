import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { isUndefined } from "util";


const PostForm = props => (
  <Fragment>
    <Link to="/feed">Feed</Link>
    <h4>PostForm</h4>
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label for="authorInput">Author</Label>
        <Input invalid={isUndefined(props.validAuthor) ? undefined /* For neutral color of form before first onChange */ : !props.validAuthor}
          valid={props.validAuthor} type="text" name="author" id="AuthorInput" onChange={props.onChangeAuthor} placeholder="It's me :P" />
      </FormGroup>
      <FormGroup>
        <Label for="titleInput">Title</Label>
        <Input invalid={isUndefined(props.validTitle) ? undefined /* For neutral color of form before first onChange */ : !props.validTitle}
          valid={props.validTitle} type="text" name="title" id="titleInput" onChange={props.onChangeTitle} placeholder="My awesome title (First char is capital)" />
      </FormGroup>
      <FormGroup>
        <Label for="bodyInput">Body</Label>
        <Input invalid={isUndefined(props.validBody) ? undefined /* For neutral color of form before first onChange */ : !props.validBody}
          valid={props.validBody} type="textarea" name="body" id="bodyInput" onChange={props.onChangeBody} placeholder="Lorem ipsum..." />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  </Fragment>
);

export default PostForm;


