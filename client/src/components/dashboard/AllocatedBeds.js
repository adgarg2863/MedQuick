import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AllocatedBedsTable from './AllocatedBedsTable';


const freeBed=(id)=>{
    console.log(id);
}
function AllocatedBeds({list}) {
  return (
    <Container component="main" maxWidth="lg">
    <CssBaseline />
      <h1>Allocated Beds</h1>
      <AllocatedBedsTable rows={list} freeBed={freeBed}/>
    </Container>
  )
}

AllocatedBeds.protoTypes = {
    auth: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    list: state.bed.list
  });
  
  export default connect(mapStateToProps, null)(
    AllocatedBeds
  );
