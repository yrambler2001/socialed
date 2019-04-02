import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Button, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Card } from 'reactstrap';


const Profile = ({ user }) => (
  <div>
    <Card>
      <CardBody>
        <CardTitle>{user.profile.fullName}</CardTitle>
        <CardText>
          {user.emails[0].address} {user.emails[0].verified ? '(verified)' : '(not verified)'}
        </CardText>
        {/* <Button>Edit</Button> */}
      </CardBody>
    </Card>
  </div>
);

export default Profile;


