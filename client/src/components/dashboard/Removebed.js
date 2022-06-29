import React, { useState } from "react";
// import './App.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import RemoveTable from "../helper/RemoveTable";
import { deleteItems } from "../../actions/item";
const Removemeds = ({
  auth: { user, isAuthenticated, loading },
  deleteItems,
}) => {
  const [patient, setPatient] = useState("");
  const [med, setMed] = useState("");
  const [price, setPrice] = useState(0);


  const updateInventory = async (e) => {
    e.preventDefault();
    setPatient("");
    setMed("");
    setPrice(0);
  };

  return (
    <>
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { mt: 1, mr: 1 },
        }}
        autoComplete='off'
        onSubmit={(e) => updateInventory(e)}
      >
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>
              Bed Type
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={med}
              label='Bed Type'
              onChange={(e) => setMed(e.target.value)}
            >
              <MenuItem value='ICU'>ICU</MenuItem>
              <MenuItem value='covid'>covid</MenuItem>
              <MenuItem value='emergency'>emergency</MenuItem>
              <MenuItem value='mango'>Mango</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            id='outlined-helperText1'
            label='Patient Name'
            value={patient}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setPatient(e.target.value)}
          />
          <TextField
            required
            id='outlined-number2'
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
            <Button
                variant='contained'
                sx={{ mt: 2, height: "50px" }}
                type="submit"
                disabled={med === "" || patient===""}
            >
                Update Inventory
            </Button>
        </div>
      </Box>
    </>
  );
};

Removemeds.protoTypes = {
  auth: PropTypes.object.isRequired,
  deleteItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteItems })(Removemeds);
