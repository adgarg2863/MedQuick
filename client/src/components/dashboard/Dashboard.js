import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { useNavigate, Navigate } from 'react-router-dom';

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