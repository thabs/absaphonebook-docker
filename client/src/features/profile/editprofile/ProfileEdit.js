import React from 'react';
//! @material-ui/core components
import {
  CardContent,
  CardActions,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';

//! core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
//! Styles
import styles from './ProfileEditStyles';
const useStyles = makeStyles(styles);

const ProfileEdit = () => {
  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitle}>Profile</h4>
              <p className={classes.cardSubTitle}>Edit profile details</p>
            </CardHeader>
            <CardContent className={classes.cardBody}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    color="secondary"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    color="secondary"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="email"
                    label="Email address"
                    color="secondary"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    id="mobileNum"
                    label="Mobile number"
                    color="secondary"
                  />
                </GridItem>
              </GridContainer>
            </CardContent>
            <CardActions className={classes.cardFooter}>
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
              <Button variant="contained" color="secondary">
                Delete Profile
              </Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ProfileEdit;
