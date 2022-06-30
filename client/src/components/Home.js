import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { connect } from "react-redux";
import { getAllMedicines,findMedicines } from "../actions/search";
import PropTypes from "prop-types";
import showToast from "../utils/showToastNotification";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { findBeds } from "../actions/search";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}



const Home = ({ medicines, getAllMedicines,findMedicines,findBeds }) => {
  const theme = useTheme();
  const [val, setVal] = useState(0);
  
  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  const handleChangeIndex = (index) => {
    setVal(index);
  };

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [med, setMed] = useState("");
  useEffect(() => {
    getAllMedicines();
  }, [medicines, getAllMedicines]);
  if (!navigator.geolocation) showToast('ERROR', 'Please give permission to access location');
  else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
  let latitude;
  let longitude;
  function success(pos) {
    const crd = pos.coords;
    latitude = crd.latitude.toString();
    longitude = crd.longitude.toString();
  }
  function error(err) {
    showToast('ERROR', `ERROR(${err.code}): ${err.message}`);
  }
  const onSubmit = (e) =>{
    e.preventDefault()
    findMedicines({
      latitude,
      longitude,
      item: value,
      quantity

    })

  }

  const onSubmitBed = (e) =>{
    e.preventDefault()
    findBeds({
      latitude,
      longitude,
      item: med
    })

  }
  return (
    <>
      <Container component='main' maxWidth='lg'>
      <Box
      sx={{
        bgcolor: 'background.paper',
        width: "100%",
        position: 'relative',
        minHeight: 200,
        margin: 'auto',
        mt:4
      }}
     
    >
      <AppBar position="static" color="default">
        <Tabs
          value={val}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={val}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={val} index={0} dir={theme.direction}>
        <Box
          component='form'
          
          sx={{
            "& .MuiTextField-root": { mt: 1, mr: 1 },
            display: 'inline-block',
          

          }}
          autoComplete='off'
          onSubmit={(e) => onSubmit(e)}
        >
         
          <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: { sm: 'column', md: 'row' },
                alignItems: 'center',
                marginRight: '15px',
              }}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
            
              options={medicines}
              sx={{ width: 500 }}
              renderInput={(params) =>(
                <>
                <TextField {...params} label='Medicine' />
                </>
              )}
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

          <Button
            type='submit'
            variant='contained'
            sx={{ height: "50px", mt:1 }}
            disabled={value===null || !quantity}
          >
            Search
          </Button>
          </div>
        </Box>
        </TabPanel>
        <TabPanel value={val} index={1} dir={theme.direction}>
        <Box
        component='form'
        sx={{
          "& .MuiTextField-root": { mt: 1, mr: 1 },
        }}
        autoComplete='off'
        onSubmit={(e) => onSubmitBed(e)}
      >
        <div>

     <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">Bed Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={med}
          label="Bed Type"
          onChange={(e) => setMed(e.target.value)}
        >
            <MenuItem value='ICU'>ICU</MenuItem>
            <MenuItem value='covid'>covid</MenuItem>
            <MenuItem value='emergency'>emergency</MenuItem>
            <MenuItem value='mango'>Mango</MenuItem>
        </Select>
      </FormControl>
         
          <Button
            type='submit'
            variant='contained'
            sx={{ height: "50px", mt: 1 }}
            disabled={med===""}
          >
            Search
          </Button>
        </div>
      </Box>
        </TabPanel>
      </SwipeableViews>
     
    </Box>
       
      </Container>
    </>
  );
};
Home.protoTypes = {
  getAllMedicines: PropTypes.func.isRequired,
  findMedicines: PropTypes.func.isRequired,
  findBeds: PropTypes.func.isRequired,
  medicines: PropTypes.array,
};
const mapStateToProps = (state) => ({
  medicines: state.search.medicines,
});
export default connect(mapStateToProps, { getAllMedicines,findMedicines,findBeds })(Home);
