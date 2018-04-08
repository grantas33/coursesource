import React from 'react';
import './CreateNewCourse.css';
import { Link } from 'react-router-dom'; 

const CreateNewCourse = () => (
  <div className="landing-page-container">
    <h1 className="">Create a new course</h1>
    <input className="form-input" placeholder="Title"/>
    <input className="form-input" placeholder="Description"/>
    <Link to="/course/testcourse/"><input className="login-register-button" type="button" value="Create"/></Link>
  </div>
);

export default CreateNewCourse;
