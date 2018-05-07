import React from 'react'
import { Link } from 'react-router-dom'
import './MyCourseItem.css'

const MyCourseItem = (props) => (
<div className="box box-widget widget-user">
  <Link to={`/course/${props.course.id}`}>
    <div id="removed-height" className="widget-user-header bg-aqua-active ">
      <img className="course-image" src="https://www.designrepublic.com/11094-cart_default/krossing-100x100-cm.jpg" />
      <div className="course-text">
      <h3 className=" widget-user-username">{props.course.title}</h3>
      <p >{props.course.description}</p>
      <p >Creation date: {props.course.creation_date}</p>
      </div>
    </div>
  </Link>
</div>
)

export default MyCourseItem
