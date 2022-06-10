import React,{useState , useEffect} from 'react';
import { Link , Navigate }from 'react-router-dom';
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';


function Register({ setAlert , register , isAuthenticated}) {
    const [formData,setFormData] = useState({
        name:"",
        email:'',
        password:'',
        password2:''
    });
    const {name,email,password,password2}=formData;

    const onChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        if(password !==password2){
            setAlert('passwords do not match', 'danger');
        }else{
            register({ name , email , password});
            console.log('SUCCESS');
        }
    }
    //redirect if authenticated
    if(isAuthenticated){
        return  <Navigate to='/dashboard'/>
    }
    return (
        <>
            <section className='container'>
                <Alert></Alert>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e=> onSubmit(e)}>
                <div className="form-group">
                <input value={name} onChange={e => onChange(e)} type="text" placeholder="Name" name="name"/>
                </div>
                <div className="form-group">
                <input value={email} onChange={e => onChange(e)} type="email" placeholder="Email Address" name="email" />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input
                    value={password}
                    onChange={e => onChange(e)}
                    type="password"
                    placeholder="Password"
                    name="password"
                    // minLength="6"
                />
                </div>
                <div className="form-group">
                <input
                    value={password2}
                    onChange={e => onChange(e)}
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    // minLength="6"
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
            </section>
        </>
    )
}

{/* export default Register; */}

Register.propTypes={
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{ setAlert , register})(Register);
//1st any state u want to map =null
//2nd object with any actions u want to use.. ={setAlert}
// this allows to props.setAlert
