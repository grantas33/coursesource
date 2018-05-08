import React from 'react'
import { Link } from 'react-router-dom';

const CourseSidebarHeader = () => (
  <header className="main-header">
    <Link to="/main/my-courses" className="logo">
      <span className="logo-mini">
        <b>C</b>S
      </span>
      <span className="logo-lg">
        <b>CourseSource</b>
      </span>
    </Link>
    <nav className="navbar navbar-static-top">
      <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
        <span className="sr-only">Toggle navigation</span>
      </a>
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li className="dropdown messages-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-envelope-o" />
              <span className="label label-success">4</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 4 messages</li>
              <li>
                <ul className="menu">
                  <li>
                    <a href="#">
                      <div className="pull-left">
                        <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                      </div>
                      <h4>
                        Support Team
                        <small>
                          <i className="fa fa-clock-o" /> 5 mins
                        </small>
                      </h4>
                      <p>Why not buy a new awesome theme?</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default CourseSidebarHeader
