import React from "react";
import { Link } from "react-router-dom";
import "./MyCourseItem.css";

const MyCourseItem = props => (
  <div className="box box-widget widget-user">
    <div className="box box-widget widget-user-2">
      <div className="widget-user-header bg-yellow">
          <div className="course-image-center">
              <img
                  className="course-image"
                  src={props.courseInfo.course.avatar || "https://www.crimsonsummer.harvard.edu/images/gradhat_600x400.png"}
              />
          </div>
        <div className="course-text">
          <h3 id="course-title" className="widget-user-username">
            {props.courseInfo.course.title}
          </h3>
          <p>{props.courseInfo.course.slogan}</p>
        </div>
      </div>
      <div className="box-footer no-padding">
        <ul className="nav nav-stacked">
          <li>
            <a>
              Status
              <span className="pull-right badge bg-green">
                {props.courseInfo.status}
              </span>
            </a>
          </li>
          <li>
            <a>
              Role
              <span className="pull-right badge bg-blue">
                {props.courseInfo.role}
              </span>
            </a>
          </li>
          <li>
            <a>
              Unread notifications:
              <span className="pull-right badge bg-aqua">5</span>
            </a>
          </li>
          <li>
            {props.courseInfo.status === "INVITED" ? (
              <a>
                <button onClick={props.accept} className="btn btn-success">Accept invitation</button>
                <button onClick={props.decline} className="btn btn-danger">Decline invitation</button>
              </a>
            ) : (
              <Link to={`/course/${props.courseInfo.course.id}`}>
                <button className="btn btn-info">Open course</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default MyCourseItem;
