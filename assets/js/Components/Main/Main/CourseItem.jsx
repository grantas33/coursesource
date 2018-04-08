import React from 'react';
import { Link } from 'react-router-dom'; 

const CourseItem = ({title, description, creation_date, id}) => (
    <div className="course-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Creation date: {creation_date}</p>
      <Link to={`/course/${id}`}><input className="login-register-button" type="button" value="Open course" /></Link>
    </div>
);

export default CourseItem;
