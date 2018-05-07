import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import CourseSidebarHeader from './CourseSidebarHeader'
import user2img from '../../../Resources/img/user2-160x160.jpg'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrent } from '../../modules/user';

class CourseSidebar extends React.Component {
  componentDidMount = () => {
    this.props.getCurrent();
  }
  
  render() {
    return (
      <div>
        <CourseSidebarHeader />
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src={user2img} className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p>{this.props.user.current.name + ' ' + this.props.user.current.surname}</p>
                <a href="#">
                  <i className="fa fa-circle text-success" /> Admin
                </a>
              </div>
            </div>
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">MAIN NAVIGATION</li>
              <li>
                <Link to={`/course/${this.props.match.params.course}`} className="navigation-item">
                  <i className="fas fa-home fa-fw" />
                  <span> Home</span>
                </Link>
              </li>
              <li>
                <Link to={`/course/${this.props.match.params.course}/notifications`} className="navigation-item">
                  <i className="fas fa-bell fa-fw" /> <span>Notifications</span>
                </Link>
              </li>

              <li>
                <Link to={`/course/${this.props.match.params.course}/schedule`} className="navigation-item">
                  <i className="fas fa-calendar-alt fa-fw" /> <span>Schedule</span>
                </Link>
              </li>

              <li>
                <Link to={`/course/${this.props.match.params.course}/lectures`} className="navigation-item">
                  <i className="fas fa-id-badge fa-fw" /> <span>Lectures</span>
                </Link>
              </li>

              <li>
                <Link to={`/course/${this.props.match.params.course}/assignments`} className="navigation-item">
                  <i className="fas fa-briefcase fa-fw" /> <span>Assignments</span>
                </Link>
              </li>

              <li>
                <Link to="/main/my-courses" className="navigation-item">
                  <i className="fas fa-sign-out-alt fa-fw" /> <span>Back to main</span>
                </Link>
              </li>
              <li className="header">LECTOR MENU</li>
              <li>
                <Link to={`/course/${this.props.match.params.course}/assignments-grading`} className="navigation-item">
                  <i className="fas fa-check fa-fw" /> <span>Assignments grading</span>
                </Link>
              </li>
              <li className="header">ADMIN MENU</li>
              <li>
                <Link to={`/course/${this.props.match.params.course}/users-management`} className="navigation-item">
                  <i className="fas fa-users fa-fw" /> <span>Users management</span>
                </Link>
              </li>
              <li>
                <Link to={`/course/${this.props.match.params.course}/course-settings`} className="navigation-item">
                  <i className="fas fa-wrench fa-fw" /> <span>Course settings</span>
                </Link>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCurrent
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CourseSidebar)