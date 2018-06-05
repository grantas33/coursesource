import React from "react";
import { NavLink, Link } from "react-router-dom";
import CourseSidebarHeader from "./CourseSidebarHeader";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrent, fetchCourseRole } from "../../modules/user";
import { ROLES } from "../../consts/userRoles";
import { fetchCourse } from "../../modules/courses";

class CourseSidebar extends React.Component {
  componentDidMount = () => {
    this.props.getCurrent();
    this.props.fetchCourseRole(this.props.match.params.course);
    this.props.fetchCourse(this.props.match.params.course);
  };

  render() {
    return (
      <div>
        <CourseSidebarHeader />
        <aside className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src={this.props.user.current.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"} className="img-circle" alt="User Image" />
              </div>
              <div className="pull-left info">
                <p>
                  {this.props.user.current.name +
                    " " +
                    this.props.user.current.surname}
                </p>
                <a href="#">
                  <i className="fa fa-circle text-success" />{" "}
                  {!this.props.user.courseRole.loading &&
                    !this.props.user.courseRole.error &&
                    this.props.user.courseRole.item.role}
                </a>
              </div>
            </div>
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">MAIN NAVIGATION</li>
              <li>
                <Link
                  to={`/course/${this.props.match.params.course}/schedule`}
                  className="navigation-item"
                >
                  <i className="fas fa-calendar-alt fa-fw" />{" "}
                  <span>Schedule</span>
                </Link>
              </li>

              <li>
                <Link
                  to={`/course/${this.props.match.params.course}/lectures`}
                  className="navigation-item"
                >
                  <i className="fas fa-id-badge fa-fw" /> <span>Lectures</span>
                </Link>
              </li>

              <li>
                <Link
                  to={`/course/${this.props.match.params.course}/assignments`}
                  className="navigation-item"
                >
                  <i className="fas fa-briefcase fa-fw" />{" "}
                  <span>Assignments</span>
                </Link>
              </li>

              <li>
                <Link to="/main/my-courses" className="navigation-item">
                  <i className="fas fa-sign-out-alt fa-fw" />{" "}
                  <span>Back to main</span>
                </Link>
              </li>
              {!this.props.user.courseRole.loading &&
                !this.props.user.courseRole.error &&
                (this.props.user.courseRole.item.role === ROLES.LECTOR ||
                  this.props.user.courseRole.item.role === ROLES.ADMIN) && (
                  <li className="header">LECTOR MENU</li>
                )}

              {!this.props.user.courseRole.loading &&
                !this.props.user.courseRole.error &&
                (this.props.user.courseRole.item.role === ROLES.LECTOR ||
                  this.props.user.courseRole.item.role === ROLES.ADMIN) && (
                  <li>
                    <Link
                      to={`/course/${
                        this.props.match.params.course
                      }/assignments-grading`}
                      className="navigation-item"
                    >
                      <i className="fas fa-check fa-fw" />
                      <span>Assignments grading</span>
                    </Link>
                  </li>
                )}

              {!this.props.user.courseRole.loading &&
                !this.props.user.courseRole.error &&
                this.props.user.courseRole.item.role === ROLES.ADMIN && (
                  <li className="header">ADMIN MENU</li>
                )}

              {!this.props.user.courseRole.loading &&
                !this.props.user.courseRole.error &&
                this.props.user.courseRole.item.role === ROLES.ADMIN && (
                  <li>
                    <Link
                      to={`/course/${
                        this.props.match.params.course
                      }/users-management`}
                      className="navigation-item"
                    >
                      <i className="fas fa-users fa-fw" />{" "}
                      <span>Users management</span>
                    </Link>
                  </li>
                )}
              {!this.props.user.courseRole.loading &&
                !this.props.user.courseRole.error &&
                this.props.user.courseRole.item.role === ROLES.ADMIN &&
                !this.props.course.item.loading &&
                this.props.course.item.is_submittable && (
                  <li>
                    <Link
                      to={`/course/${
                        this.props.match.params.course
                      }/submissions`}
                      className="navigation-item"
                    >
                      <i className="fas fa-users fa-fw" />{" "}
                      <span>Submissions</span>
                    </Link>
                  </li>
                )}

              {!this.props.user.courseRole.loading &&
                !this.props.user.courseRole.error &&
                this.props.user.courseRole.item.role === ROLES.ADMIN && (
                  <li>
                    <Link
                      to={`/course/${
                        this.props.match.params.course
                      }/course-settings`}
                      className="navigation-item"
                    >
                      <i className="fas fa-wrench fa-fw" />{" "}
                      <span>Course settings</span>
                    </Link>
                  </li>
                )}
            </ul>
          </section>
        </aside>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  course: state.courses.course
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCurrent,
      fetchCourseRole,
      fetchCourse
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseSidebar);
