import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
//! @material-ui/core components
import {
  CardContent,
  CardActions,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
//! Context
import {Context as ProfileContext} from './state/ProfileContext';

//! core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
//! Styles
import styles from './ProfileCreateStyles';
const useStyles = makeStyles(styles);

const ProfileCreate = () => {
  const history = useHistory();
  const classes = useStyles();
  //! Context
  const {state, createProfile} = useContext(ProfileContext);
  const {loading, error, profile} = state;
  //! States
  const [modal, setModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNum: '',
    },
    validationSchema,
    onSubmit: async values => {
      await createProfile(values);
      setModal(true);
    },
  });

  const ProfileCreateForm = () => {
    return (
      <form
        onSubmit={formik.handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off">
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitle}>Create Profile</h4>
                <p className={classes.cardSubTitle}>
                  Enter new profile details
                </p>
              </CardHeader>
              <CardContent className={classes.cardBody}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      color="secondary"
                      error={
                        formik.touched['firstName'] &&
                        formik.errors['firstName']
                      }
                      onChange={formik.handleChange('firstName')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      color="secondary"
                      error={
                        formik.touched['lastName'] && formik.errors['lastName']
                      }
                      onChange={formik.handleChange('lastName')}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email address"
                      color="secondary"
                      error={formik.touched['email'] && formik.errors['email']}
                      onChange={formik.handleChange('email')}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      id="mobileNum"
                      name="mobileNum"
                      label="Mobile number"
                      color="secondary"
                      error={
                        formik.touched['mobileNum'] &&
                        formik.errors['mobileNum']
                      }
                      onChange={formik.handleChange('mobileNum')}
                    />
                  </GridItem>
                </GridContainer>
              </CardContent>
              <CardActions className={classes.cardFooter}>
                <Button variant="contained" color="primary" type="submit">
                  Create Profile
                </Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    );
  };

  return (
    <div>
      {ProfileCreateForm()}
      <Dialog
        open={modal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'New Profile'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error ? error.message : 'Profile created successfully...'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              error ? setModal(false) : history.push('dashboard');
            }}
            color="primary"
            autoFocus>
            {error ? 'OK' : 'DONE'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required!'),
  mobileNum: Yup.string().required('Mobile number is required'),
});

export default ProfileCreate;
