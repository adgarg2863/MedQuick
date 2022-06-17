import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaHeart, FaGem, FaBars } from "react-icons/fa";
const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppBar(props) {
  return (
    <MuiAppBar
      elevation={0}
      position='fixed'
      {...props}
      style={{ background: "linear-gradient(150deg, #4341be, #23d1a8)" }}
    />
  );
}

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 70,
  },
}));

function Navbar({ auth: { isAuthenticated }, logout }) {
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isAuthenticated && (
            <div
              onClick={() => handleToggleSidebar(!toggled)}
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                background: "#353535",
                color: "#fff",
                textAlign: "center",
                borderRadius: " 50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
              }}
            >
              <FaBars />
            </div>
          )}
          <Box sx={{ flex: 1 }} />

          <Link
            variant='h6'
            underline='none'
            color='inherit'
            href='/'
            sx={{ fontSize: 24 }}
          >
            {"FastMeds"}
          </Link>
          {isAuthenticated === false ? (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                href='/auth/login'
                sx={rightLink}
              >
                {"Sign In"}
              </Link>
              <Link
                variant='h6'
                underline='none'
                href='/auth/register'
                sx={rightLink}
              >
                {"Sign Up"}
              </Link>
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                component='button'
                variant='h6'
                underline='none'
                onClick={logout}
                sx={rightLink}
              >
                {"logout"}
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isAuthenticated && (
        <ProSidebar
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint='xxl'
        >
          <Menu iconShape='square'>
            {/* <Link to="/dashboard/additem"></Link>
            <Link to="/dashboard/removeitem"></Link>
            <Link to="/dashboard/showinventory"></Link> */}
            <MenuItem icon={<FaGem />}>
              <Link href='/dashboard' >Dashboard</Link>
            </MenuItem>
            <MenuItem icon={<FaGem />}><Link href='/dashboard/additem' >Add Items</Link></MenuItem>
            <MenuItem icon={<FaGem />}><Link href='/dashboard/removeitem' >Bill/Remove Items</Link></MenuItem>
            <MenuItem icon={<FaGem />}><Link href='/dashboard/viewinventory' >View Inventory</Link></MenuItem>
            {/* <SubMenu title="Components" icon={<FaHeart />}>
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu> */}
          </Menu>
        </ProSidebar>
      )}
    </div>
  );
}

Navbar.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
