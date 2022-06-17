import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { useNavigate, Navigate } from 'react-router-dom';
import ProfileCard from '../helper/ProfileCard';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
const Dashboard = ({
  auth: { user, isAuthenticated , loading},
}) => {
    if(!isAuthenticated){
        return  <Navigate to='/auth/login'/>
    }
  return (
    <Fragment>
        {user === null && loading ? (
          <Spinner />
        ) :<>
        <div>
          {console.log(user)}
          <Container component="main" maxWidth="lg" style={{padding:"20vh"}}>
          <CssBaseline />
          <ProfileCard user={user}/>
          </Container>
        </div>
        </>}
    </Fragment>
  );
};

Dashboard.protoTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(
  Dashboard
);