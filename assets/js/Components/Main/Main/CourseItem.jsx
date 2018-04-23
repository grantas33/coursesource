import React from 'react'
import { Link } from 'react-router-dom'
import './CourseItem.css'

const CourseItem = (props) => (
<div className="box box-widget widget-user">
  <Link to={`/course/${props.course.id}`}>
    <div id="removed-height" className="widget-user-header bg-aqua-active ">
      <h3 className="widget-user-username">{props.course.title}</h3>
      <p >{props.course.description}</p>
      <p >Creation date: {props.course.creation_date}</p>
    </div>
  </Link>
    <div className="row">
      <div className="col-sm-4 border-right">
        <div className="description-block">
          <h5 className="description-header">7</h5>
          <span className="description-text">MENTORS</span>
        </div>
        {/* /.description-block */}
      </div>
      {/* /.col */}
      <div className="col-sm-4 border-right">
        <div className="description-block">
          <h5 className="description-header">42</h5>
          <span className="description-text">STUDENTS</span>
        </div>
        {/* /.description-block */}
      </div>
      {/* /.col */}
      <div className="col-sm-4">
        <div className="description-block">
          <h5 className="description-header">35</h5>
          <span className="description-text">LECTURES</span>
        </div>
      </div>
  </div>
</div>
)

export default CourseItem
