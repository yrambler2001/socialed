import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Button, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Card } from 'reactstrap';


const Profile = props => (
  <div>
    <Card>
      <CardBody>
        <CardTitle>Name Surname</CardTitle>
        <CardText>
          Achievements: Good person
          <br />
          User
        </CardText>
        <Button>Edit</Button>
      </CardBody>
    </Card>
  </div>
);

export default Profile;


