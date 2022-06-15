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
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/dashboard/additem'} element={<Additem/>} />
        <Route path={'/auth/login'} element={<Login />} />
        <Route path={'/auth/register'} element={<Register />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
  </Router>
    </Provider>
  );
}

export default App;
