import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom'; 

const LandingPage = () => (
  <div className="landing-page-container">
    <h1 className="landing-page-header">Coursesource</h1>
    <h3>Coursesource will help you to manage your courses</h3>
    <Link to="/login"><input className="login-register-button" type="button" value="Login" /></Link>
    <Link to="/register"><input className="login-register-button" type="button" value="Register"/></Link>
  </div>
);

export default LandingPage;
