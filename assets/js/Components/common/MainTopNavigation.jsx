import React from "react";
import { Link } from "react-router-dom";
import user2img from "../../../Resources/img/user2-160x160.jpg";
import { getCurrent, signout } from "../../modules/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNotifications } from "../../modules/notifications";

class MainTopNavigation extends React.Component {
  componentDidMount = () => {
    document.body.classList.toggle("layout-top-nav", true);
    document.body.classList.toggle("sidebar-collapse", false);
    document.body.classList.toggle("sidebar-open", false);
    if (window.localStorage.getItem("userToken")) {
      this.props.getCurrent();
      this.props.fetchNotifications();
    }
  };

  componentWillUnmount = () => {
    document.body.classList.toggle("layout-top-nav", false);
  };

  render() {
    return (
      <header className="main-header">
        <nav className="navbar navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                <b>CourseSource</b>
              </Link>
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse"
              >
                <i className="fa fa-bars" />
              </button>
            </div>
            {/* Collect the nav links, forms, and other content for toggling */}
            {window.localStorage.getItem("userToken") && (
              <div
                className="collapse navbar-collapse pull-left"
                id="navbar-collapse"
              >
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/main/my-courses">My courses</Link>
                  </li>

                  <li>
                    <Link to="/main/browse-courses">Browse courses</Link>
                  </li>
                </ul>
              </div>
            )}

            {window.localStorage.getItem("userToken") ? (
              <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                  {/* Notifications Menu */}
                  <li className="dropdown notifications-menu">
                    {/* Menu toggle button */}
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <i className="fa fa-bell-o" />
                      {this.props.notifications.items.length > 0 && (
                        <span className="label label-warning">
                          {this.props.notifications.items.length}
                        </span>
                      )}
                    </a>
                    <ul className="dropdown-menu">
                      <li className="header">
                        You have {" "}
                        {this.props.notifications.items.length}
                        {" "} notifications
                      </li>
                      <li>
                        <ul className="menu">
                          {this.props.notifications.items.map(notification => (
                            <li>
                              <a href="#">
                                <i className="fa fa-users text-aqua" /> 5 new
                                members joined today
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="footer">
                        <a href="#">View all</a>
                      </li>
                    </ul>
                  </li>

                  {/* User Account Menu */}
                  <li className="dropdown user user-menu">
                    {/* Menu Toggle Button */}
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      {/* The user image in the navbar*/}
                      <img
                        src={user2img}
                        className="user-image"
                        alt="User Image"
                      />
                      {/* hidden-xs hides the username on small devices so only the image appears. */}
                      <span className="hidden-xs">
                        {this.props.user.current.name +
                          " " +
                          this.props.user.current.surname}
                      </span>
                    </a>
                    <ul className="dropdown-menu">
                      {/* The user image in the menu */}
                      <li className="user-header">
                        <img
                          src={user2img}
                          className="img-circle"
                          alt="User Image"
                        />
                        <p>
                          {this.props.user.current.name +
                            " " +
                            this.props.user.current.surname}
                        </p>
                      </li>

                      <li className="user-footer">
                        <div className="pull-left">
                          <a href="#" className="btn btn-default btn-flat">
                            Settings
                          </a>
                        </div>
                        <div className="pull-right">
                          <button
                            className="btn btn-default btn-flat"
                            onClick={this.props.signout}
                          >
                            Sign out
                          </button>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="navbar-custom-menu">
                <Link to="/register">
                  <button style={{ height: 47 }} className="btn btn-primary">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notifications: state.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCurrent,
      signout,
      fetchNotifications
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainTopNavigation);
