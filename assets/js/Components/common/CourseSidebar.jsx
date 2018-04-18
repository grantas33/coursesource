import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const CourseSidebar = () => (
<aside className="main-sidebar">
    <section className="sidebar">
        <div className="user-panel">
            <div className="pull-left image">
                <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">
                <p>Alexander Pierce</p>
                <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
            <input type="text" name="q" className="form-control" placeholder="Search..." />
            <span className="input-group-btn">
                    <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                    </button>
                </span>
            </div>
        </form>
        <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>
            <li>
                <Link 
                    to="/course/testcourse" 
                    className="navigation-item"
                >
                    <i className="fas fa-home fa-fw"></i> 
                    <span> Home</span>
                </Link>
            </li>
            <li>
                <Link to="/course/testcourse/notifications" className="navigation-item"><i className="fas fa-bell fa-fw"></i> <span>Notifications</span></Link>
            </li>

            <li>
                <Link to="/course/testcourse/schedule" className="navigation-item"><i className="fas fa-calendar-alt fa-fw"></i> <span>Schedule</span></Link>
            </li>
            
            <li>
                <Link to="/course/testcourse/lectures" className="navigation-item"><i className="fas fa-id-badge fa-fw"></i> <span>Lectures</span></Link>
            </li>
            
            <li>
                <Link to="/course/testcourse/homework" className="navigation-item"><i className="fas fa-briefcase fa-fw"></i> <span>Homework</span></Link>
            </li>
            
            <li>
                <Link to="/main" className="navigation-item"><i className="fas fa-sign-out-alt fa-fw"></i> <span>Back to main</span></Link>
            </li>                
        </ul>
    </section>
</aside> 
);

export default CourseSidebar;
