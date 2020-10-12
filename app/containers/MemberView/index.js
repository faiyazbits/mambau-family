/**
 *
 * MemberView
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik, Form, FieldArray } from "formik";
import { states, relations } from "../Register/index";


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
  membersArea: {
    border: "2px solid red",
    padding: 10,
    marginTop: 20
  },
  pointerNone: {
    pointerEvents: 'none'
  }
}));


import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMemberView from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function MemberView() {
  useInjectReducer({ key: 'memberView', reducer });
  useInjectSaga({ key: 'memberView', saga });

  const classes = useStyles();
  const [registerData, setRegisterData] = useState(null);

  useEffect(() => {
    const r = localStorage.getItem("registerData");
    console.log(JSON.parse(r))
    setRegisterData(JSON.parse(r));
  }, []);

  return (
    <React.Fragment>
       <Helmet>
        <title>MemberView</title>
        <meta name="description" content="Description of MemberView" />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {registerData && (
            <Formik
              initialValues={registerData}
              validate={values => {
                const errors = {};
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {}}
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
                <Form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        className={classes.pointerNone}
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
                        className={classes.pointerNone}
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
                        className={classes.pointerNone}
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
                        className={classes.pointerNone}
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
                        className={classes.pointerNone}
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
                        className={classes.pointerNone}
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
                        className={classes.pointerNone}
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
                        {values.members &&
                          values.members.map((member, index) => (
                            <div key={index} className={classes.membersArea}>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    autoComplete="fname"
                                    name={`members.${index}.firstName`}
                                    variant="outlined"
                                    required
                                    className={classes.pointerNone}
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
                                    className={classes.pointerNone}
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
                                    className={classes.pointerNone}
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
                                    className={classes.pointerNone}
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
                                    className={classes.pointerNone}
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
                            </div>
                          ))}
                      </div>
                    )}
                  />
                </Form>
              )}
            </Formik>
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

MemberView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  memberView: makeSelectMemberView(),
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

export default compose(withConnect)(MemberView);
