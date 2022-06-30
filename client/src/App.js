import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import React , {useEffect} from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard';
import Additem from './components/dashboard/Additem';
import Navbar from './components/helper/Navbar';
import Removeitem from './components/dashboard/Removeitem';
import Addbeditem from './components/dashboard/Addbeditem';
import Removebeditem from './components/dashboard/Removebeditem';
import AllocatedBeds from './components/dashboard/AllocatedBeds';
import Inventory from './components/dashboard/Inventory';
if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App=()=> {
  //replicating componentDidMount method
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return (
    <Provider store={store}>
    <Router>
    <ToastContainer/>
    <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/dashboard/additem'} element={<Additem/>} />
        <Route path={'/dashboard/addbed'} element={<Addbeditem/>} />
        <Route path={'/dashboard/removeitem'} element={<Removeitem/>} />
        <Route path={'/dashboard/removebed'} element={<Removebeditem/>} />
        <Route path={'/dashboard/allocatedbeds'} element={<AllocatedBeds/>} />
        <Route path={'/dashboard/viewinventory'} element={<Inventory/>} />
        <Route path={'/auth/login'} element={<Login />} />
        <Route path={'/auth/register'} element={<Register />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
  </Router>
    </Provider>
  );
}

export default App;
