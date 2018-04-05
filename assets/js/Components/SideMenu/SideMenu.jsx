import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SideMenu.css';
import { NavLink } from 'react-router-dom';


const SideMenu = () => (
    <Menu
        
    >
        <NavLink exact activeClassName="navigation-item-active" to="/" className="navigation-item"><i className="fas fa-home fa-fw"></i> Home</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/notifications" className="navigation-item"><i className="fas fa-bell fa-fw"></i> Notifications</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/schedule" className="navigation-item"><i className="fas fa-calendar-alt fa-fw"></i> Schedule</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/lectures" className="navigation-item"><i className="fas fa-id-badge fa-fw"></i> Lectures</NavLink>
        <NavLink activeClassName="navigation-item-active" to="/homework" className="navigation-item"><i className="fas fa-briefcase fa-fw"></i> Homework</NavLink>
    </Menu>
)

export default SideMenu;