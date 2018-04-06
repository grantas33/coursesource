import React from 'react';
import './LoginRegister.css';
import { Link } from 'react-router-dom'; 

const Register = () => (
  <div className="landing-page-container">
    <h2>Register a New User</h2>
    <input className="form-input" placeholder="Email"/>
    <br />
    <input className="form-input" type="password" placeholder="Password"/>
    <br />
    <Link to="/main"><input className="login-register-button" type="button" value="Register"/></Link>
  </div>
);

export default Register;
