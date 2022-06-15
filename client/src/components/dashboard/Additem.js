import React from 'react'
import Navbar from '../helper/Navbar'
import Addmeds from './Addmeds'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const Additem = () => {
  return (
  <>
         <Navbar />
         <Container component="main" maxWidth="lg">
            <CssBaseline/>
         <h1>Additem</h1>
         <Addmeds/>
         </Container>
        
          {/* <Container component="main" maxWidth="sm">
            <CssBaseline />
            <h1>Additem</h1>
            <Addmeds/>
          <Container/> */}
        
    </>)
}

export default Additem
