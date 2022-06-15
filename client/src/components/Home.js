import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './helper/Navbar'
import Container from '@mui/material/Container';
export default function Home() {
  return (
    <>
     <Navbar />
     <Container component="main" maxWidth="sm">
       <div>Home</div>
     </Container>
    </>
   
  )
}
