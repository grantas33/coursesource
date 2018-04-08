import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SideMenu.css';
import { NavLink } from 'react-router-dom';


const SideMenu = () => (
    <Menu
        
    >
        <NavLink exact activeClassName="navigation-item-active" to="/course/testcourse" className="navigation-item"><i className="fas fa-home fa-fw"></i> Home</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/course/testcourse/notifications" className="navigation-item"><i className="fas fa-bell fa-fw"></i> Notifications</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/course/testcourse/schedule" className="navigation-item"><i className="fas fa-calendar-alt fa-fw"></i> Schedule</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/course/testcourse/lectures" className="navigation-item"><i className="fas fa-id-badge fa-fw"></i> Lectures</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/course/testcourse/homework" className="navigation-item"><i className="fas fa-briefcase fa-fw"></i> Homework</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/main" className="navigation-item"><i className="fas fa-sign-out-alt fa-fw"></i> Back to main</NavLink>
    </Menu>
)

export default SideMenu;