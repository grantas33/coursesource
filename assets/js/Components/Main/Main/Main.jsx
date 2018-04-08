import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom'; 

const Main = () => (
  <div className="landing-page-container">
    <h1 className="">Get back to learning!</h1>
    <h3>Your Coursesource courses:</h3>
    <div className="course-card">
      <h2>Test Course</h2>
      <p>0 unread notifications</p>
      <p>A test course description</p>
      <p>Last activity: 2016-11-30</p>
      <Link to="/course/testcourse/"><input className="login-register-button" type="button" value="Open course" /></Link>
    </div>
    <div className="course-card">
      <h2>Learnify programming academy</h2>
      <p>3 unread notifications</p>
      <p>Learn new things every week</p>
      <p>Last activity: 2017-04-02</p>
      <Link to="/course/learnify/"><input className="login-register-button" type="button" value="Open course"/></Link>
    </div>
    <h3>For mentors:</h3>
    <Link to="/main/create-new-course"><input className="login-register-button" type="button" value="Create a new course"/></Link>
  </div>
);

export default Main;
