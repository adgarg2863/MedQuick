import React from "react";
import Addbed from "./Addbed";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const Addbeditem = () => {
  return (
    <>
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <h1>Add Beds</h1>
        <Addbed />
      </Container>
    </>
  );
};

export default Addbeditem;
