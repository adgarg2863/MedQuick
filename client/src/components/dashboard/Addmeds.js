import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Addmeds = () => {
  const [list, setList] = useState([]);
  const [generic, setGeneric] = useState("");
  const [med, setMed] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(med);
    setList([
      ...list,
      {
        generic,
        med,
        price,
        quantity,
      },
    ]);
    setGeneric("");
    setMed("");
    setPrice(0);
    setQuantity(0);
  };
  return (
    <>
      {console.log(list)}
      <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete='off'
        onSubmit={(e) => onSubmit(e)}
      >
        <div>
          <TextField
            required
            id='outlined-helperText'
            label='Medicine Name'
            value={med}
            onChange={(e) => setMed(e.target.value)}
          />
          <TextField
            required
            id='outlined-helperText'
            label='Generic Name'
            value={generic}
            onChange={(e) => setGeneric(e.target.value)}
          />
          <TextField
            required
            id='outlined-number'
            label='Quantity'
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id='outlined-number'
            label='Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ m: 1, height: "50px" }}
          >
            Add Item
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Addmeds;
