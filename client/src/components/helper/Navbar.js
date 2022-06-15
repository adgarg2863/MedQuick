import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} style={{background: 'linear-gradient(150deg, #4341be, #23d1a8)'}}/>;
}

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
}));

function Navbar({ auth:{ isAuthenticated }, logout }) {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link variant="h6" underline="none" color="inherit" href="/" sx={{ fontSize: 24 }}>
            {'FastMeds'}
          </Link>
          {isAuthenticated === false ? (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link color="inherit" variant="h6" underline="none" href="/auth/login" sx={rightLink}>
                {'Sign In'}
              </Link>
              <Link variant="h6" underline="none" href="/auth/register" sx={rightLink}>
                {'Sign Up'}
              </Link>
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link color="inherit" variant="h6" underline="none" href="/inventory" sx={rightLink}>
                {'Update Inventory'}
              </Link>
              <Link component="button" variant="h6" underline="none" onClick={logout} sx={rightLink}>
                {'logout'}
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

Navbar.protoTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(
  Navbar
);
