import React from "react";
import { Link } from "react-router-dom";
import "./BrowseCourseItem.css";

const CourseItem = props => (
  <div className="box box-widget widget-user">
    <Link to={`/main/course/${props.course.id}`}>
      <div className="widget-user-header bg-aqua-active ">
        <img
          className="course-image"
          src={props.course.avatar || "https://www.crimsonsummer.harvard.edu/images/gradhat_600x400.png"}
        />
        <div className="course-text">
          <h3 className=" widget-user-username">{props.course.title}</h3>
          <p>{props.course.slogan}</p>
        </div>
      </div>
    </Link>
    <div className="row">
      <div className="col-sm-4 border-right">
        <div className="description-block">
          <h5 className="description-header">{props.course.teacherCount}</h5>
          <span className="description-text">TEACHERS</span>
        </div>
        {/* /.description-block */}
      </div>
      {/* /.col */}
      <div className="col-sm-4 border-right">
        <div className="description-block">
          <h5 className="description-header">{props.course.assignmentCount}</h5>
          <span className="description-text">ASSIGNMENTS</span>
        </div>
        {/* /.description-block */}
      </div>
      {/* /.col */}
      <div className="col-sm-4">
        <div className="description-block">
          <h5 className="description-header">{props.course.lectureCount}</h5>
          <span className="description-text">LECTURES</span>
        </div>
      </div>
    </div>
  </div>
);

export default CourseItem;
