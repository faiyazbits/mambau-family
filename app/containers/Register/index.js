/**
 *
 * Register
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik, Form, FieldArray } from "formik";
import { withRouter } from 'react-router-dom';


export const states = [
  { code: "NA", title: "National" },
  { code: "AN", title: "Andaman and Nicobar Islands" },
  { code: "AP", title: "Andhra Pradesh" },
  { code: "AR", title: "Arunachal Pradesh" },
  { code: "AS", title: "Assam" },
  { code: "BR", title: "Bihar" },
  { code: "CG", title: "Chandigarh" },
  { code: "CH", title: "Chhattisgarh" },
  { code: "DH", title: "Dadra and Nagar Haveli" },
  { code: "DD", title: "Daman and Diu" },
  { code: "DL", title: "Delhi" },
  { code: "GA", title: "Goa" },
  { code: "GJ", title: "Gujarat" },
  { code: "HR", title: "Haryana" },
  { code: "HP", title: "Himachal Pradesh" },
  { code: "JK", title: "Jammu and Kashmir" },
  { code: "JH", title: "Jharkhand" },
  { code: "KA", title: "Karnataka" },
  { code: "KL", title: "Kerala" },
  { code: "LD", title: "Lakshadweep" },
  { code: "MP", title: "Madhya Pradesh" },
  { code: "MH", title: "Maharashtra" },
  { code: "MN", title: "Manipur" },
  { code: "ML", title: "Meghalaya" },
  { code: "MZ", title: "Mizoram" },
  { code: "NL", title: "Nagaland" },
  { code: "OR", title: "Odisha" },
  { code: "PY", title: "Puducherry" },
  { code: "PB", title: "Punjab" },
  { code: "RJ", title: "Rajasthan" },
  { code: "SK", title: "Sikkim" },
  { code: "TN", title: "Tamil Nadu" },
  { code: "TS", title: "Telangana" },
  { code: "TR", title: "Tripura" },
  { code: "UK", title: "Uttarakhand" },
  { code: "UP", title: "Uttar Pradesh" },
  { code: "WB", title: "West Bengal" }
].map(s => s.title);

export const relations = [
  "son",
  "daughter",
  "wife",
  "mother",
  "father",
  "wife",
  "husband",
  "brother",
  "sister"
];


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  membersArea: {
    border: "2px solid red",
    padding: 10,
    marginTop: 20
  }
}));


export function Register(registerProps) {
  useInjectReducer({ key: 'register', reducer });
  useInjectSaga({ key: 'register', saga });

  const classes = useStyles();

  const memberInitialValue = {
    firstName: "",
    lastName: "",
    age: "",
    job: "",
    relation: ""
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    age: "",
    houseName: "",
    job: "",
    address: "",
    state: "",
    members: []
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Become a Mambau family member
          </Typography>

          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              localStorage.setItem('registerData',JSON.stringify(values));
              registerProps.history.push('/member/view');
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
              /* and other goodies */
            }) => (
              <Form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      onChange={handleChange}
                      value={values.firstName}
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="houseName"
                      label="House  Name"
                      name="houseName"
                      onChange={handleChange}
                      value={values.houseName}
                      autoComplete="fName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="job"
                      label="Job"
                      name="job"
                      onChange={handleChange}
                      value={values.job}
                      autoComplete="job"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="number"
                      id="age"
                      label="Age"
                      name="age"
                      onChange={handleChange}
                      value={values.age}
                      autoComplete="age"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      rowsMax={4}
                      id="address"
                      label="Address"
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                      autoComplete="address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-select-state"
                      select
                      required
                      fullWidth
                      name="state"
                      onChange={handleChange}
                      value={values.state}
                      label="Select state"
                      variant="outlined"
                    >
                      {states.map(state => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <FieldArray
                  name="members"
                  render={arrayHelpers => (
                    <div>
                      {values.members.map((member, index) => (
                        <div key={index} className={classes.membersArea}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                autoComplete="fname"
                                name={`members.${index}.firstName`}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                onChange={handleChange}
                                value={member.firstName}
                                label="First Name"
                                autoFocus
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name={`members.${index}.lastName`}
                                onChange={handleChange}
                                value={member.lastName}
                                autoComplete="lname"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="job"
                                label="job"
                                name={`members.${index}.job`}
                                onChange={handleChange}
                                value={member.job}
                                autoComplete="job"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type="number"
                                id="age"
                                label="Age"
                                name={`members.${index}.age`}
                                onChange={handleChange}
                                value={member.age}
                                autoComplete="age"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                id="outlined-select-state"
                                select
                                required
                                fullWidth
                                name={`members.${index}.relation`}
                                onChange={handleChange}
                                value={member.relation}
                                label="relationship"
                                variant="outlined"
                              >
                                {relations.map(relation => (
                                  <MenuItem key={relation} value={relation}>
                                    {relation}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                          </Grid>

                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => arrayHelpers.remove(index)}
                            startIcon={<DeleteIcon />}
                            className={classes.submit}
                          ></Button>
                        </div>
                      ))}
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        className={classes.submit}
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add family member
                      </Button>
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className={classes.submit}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </React.Fragment>
  );
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  register: makeSelectRegister(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withRouter,withConnect)(Register);
