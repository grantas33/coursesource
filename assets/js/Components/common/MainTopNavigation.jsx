import React from 'react';
import { Link } from 'react-router-dom';
import user2img from '../../../Resources/img/user2-160x160.jpg'


class MainTopNavigation extends React.Component {
    componentDidMount = () => {
        document.body.classList.toggle('layout-top-nav', true)
    }

    componentWillUnmount = () => {
        document.body.classList.toggle('layout-top-nav', false)
    }

    render() {
        return (
            <header className="main-header">
                <nav className="navbar navbar-static-top">
                    <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand"><b>CourseSource</b></Link>
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                        <i className="fa fa-bars" />
                        </button>
                    </div>
                    {/* Collect the nav links, forms, and other content for toggling */}
                    <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                        <ul className="nav navbar-nav">

                          <li><Link to="/main">Your courses</Link></li>

                          <li><Link to="/main">Browse courses</Link></li>
                        
                        </ul>
                        <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                            <input type="text" className="form-control" id="navbar-search-input" placeholder="Search" />
                        </div>
                        </form>
                    </div>
                    {/* /.navbar-collapse */}
                    {/* Navbar Right Menu */}
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">

                        {/* Notifications Menu */}
                        <li className="dropdown notifications-menu">
                            {/* Menu toggle button */}
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-bell-o" />
                            <span className="label label-warning">10</span>
                            </a>
                            <ul className="dropdown-menu">
                            <li className="header">You have 10 notifications</li>
                            <li>
                                {/* Inner Menu: contains the notifications */}
                                <ul className="menu">
                                <li>{/* start notification */}
                                    <a href="#">
                                    <i className="fa fa-users text-aqua" /> 5 new members joined today
                                    </a>
                                </li>
                                {/* end notification */}
                                </ul>
                            </li>
                            <li className="footer"><a href="#">View all</a></li>
                            </ul>
                        </li>

                        {/* User Account Menu */}
                        <li className="dropdown user user-menu">
                            {/* Menu Toggle Button */}
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            {/* The user image in the navbar*/}
                            <img src={user2img} className="user-image" alt="User Image" />
                            {/* hidden-xs hides the username on small devices so only the image appears. */}
                            <span className="hidden-xs">Alexander Pierce</span>
                            </a>
                            <ul className="dropdown-menu">
                            {/* The user image in the menu */}
                            <li className="user-header">
                                <img src={user2img} className="img-circle" alt="User Image" />
                                <p>
                                Alexander Pierce - Web Developer
                                <small>Member since Nov. 2012</small>
                                </p>
                            </li>
                            {/* Menu Body */}
                            <li className="user-body">
                                <div className="row">
                                <div className="col-xs-4 text-center">
                                    <a href="#">Followers</a>
                                </div>
                                <div className="col-xs-4 text-center">
                                    <a href="#">Sales</a>
                                </div>
                                <div className="col-xs-4 text-center">
                                    <a href="#">Friends</a>
                                </div>
                                </div>
                                {/* /.row */}
                            </li>
                            {/* Menu Footer*/}
                            <li className="user-footer">
                                <div className="pull-left">
                                <a href="#" className="btn btn-default btn-flat">Profile</a>
                                </div>
                                <div className="pull-right">
                                <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                </div>
                            </li>
                            </ul>
                        </li>
                        </ul>
                    </div>
                    {/* /.navbar-custom-menu */}
                    </div>
                    {/* /.container-fluid */}
                </nav>
          </header>
        )
    }
};

export default MainTopNavigation;
