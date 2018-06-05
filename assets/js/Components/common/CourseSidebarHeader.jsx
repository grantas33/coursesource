import React from "react";
import { Link } from "react-router-dom";
import NotificationsMenu from './NotificationsMenu';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchNotifications, readAllNotifications } from '../../modules/notifications';

class CourseSidebarHeader extends React.Component {
  componentDidMount = () => {
    this.props.fetchNotifications();
  }

  render() {
    return (
      <header className="main-header">
        <Link to="/main/dashboard" className="logo">
          <span className="logo-mini">
            <b>C</b>S
          </span>
          <span className="logo-lg">
            <b>CourseSource</b>
          </span>
        </Link>
        <nav className="navbar navbar-static-top">
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <NotificationsMenu
                notifications={this.props.notifications}
                readAllNotifications={this.props.readAllNotifications}
              />
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNotifications,
      readAllNotifications
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseSidebarHeader);
