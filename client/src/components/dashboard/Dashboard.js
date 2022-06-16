import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Navbar from '../helper/Navbar';
import { useNavigate, Navigate } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = ({
  auth: { user, isAuthenticated , loading},
}) => {
    if(!isAuthenticated){
        return  <Navigate to='/auth/login'/>
    }
  return (
    <Fragment>
        <Navbar />
        {user === null && loading ? (
          <Spinner />
        ) :<>
        <Sidebar index={0} style={{float:"left"}}/>
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