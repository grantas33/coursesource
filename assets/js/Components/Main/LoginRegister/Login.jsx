import React from 'react';
import './LoginRegister.css';
import { Link } from 'react-router-dom'; 

const Login = () => (
  <div className="landing-page-container content-wrapper">
    <h2>Member Login</h2>
    <input className="form-input" placeholder="Email"/>
    <br />
    <input className="form-input" type="password" placeholder="Password"/>
    <br />
    <Link to="/main" ><input className="login-register-button" type="button" value="Login"/></Link>
  </div>
);

export default Login;
