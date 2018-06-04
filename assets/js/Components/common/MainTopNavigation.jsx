import React from "react";
import { Link } from "react-router-dom";
import { getCurrent, signout, updateProfile } from "../../modules/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNotifications } from "../../modules/notifications";
import FileBase64 from "react-file-base64";

class MainTopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editting: false,
      newUser: {
        name: this.props.user.current.name
      }
    };
  }
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
      <div>
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

                    <li>
                        <Link to="/main/create-new-course">Create a new course</Link>
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
                          You have {this.props.notifications.items.length}{" "}
                          notifications
                        </li>
                        <li>
                          <ul className="menu">
                            {this.props.notifications.items.map(
                              notification => (
                                <li key={notification.id}>
                                  <a>
                                    <i className="fa fa-users text-aqua" />
                                    {notification.message}
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
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
                          src={this.props.user.current.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"}
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
                            src={this.props.user.current.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"}
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
                            <a
                              className="btn btn-default btn-flat"
                              href="#aboutModal"
                              data-toggle="modal"
                              data-target="#myModal"
                            >
                              Profile
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
        <div
          className="modal fade"
          id="myModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            {this.state.editting ? (
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    Editting {this.props.user.current.name} Profile
                  </h4>
                </div>
                <div className="modal-body">
                  <form role="form">
                    <div className="box-body">
                      <div className="form-group">
                        <label>Avatar</label>
                        {(this.state.newUser.avatar !== "" ||
                          this.props.user.current.avatar !== "") && (
                          <img
                            style={{ display: "block" }}
                            width="100 px"
                            src={
                              this.state.newUser.avatar !== ""
                                ? this.state.newUser.avatar
                                : this.props.user.current.avatar
                            }
                          />
                        )}
                        <FileBase64
                          multiple={false}
                          onDone={file => {
                            if (
                              file.type === "image/png" ||
                              file.type === "image/jpeg"
                            ) {
                              this.setState({
                                ...this.state,
                                newUser: {
                                  ...this.state.newUser,
                                  avatar: file.base64
                                }
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          className="form-control"
                          defaultValue={this.props.user.current.name}
                          onChange={e => {
                            this.setState({
                              ...this.state,
                              newUser: {
                                ...this.state.newUser,
                                name: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Surname</label>
                        <input
                          className="form-control"
                          defaultValue={this.props.user.current.surname}
                          onChange={e => {
                            this.setState({
                              ...this.state,
                              newUser: {
                                ...this.state.newUser,
                                surname: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Resume</label>
                        <textarea
                          className="form-control"
                          defaultValue={this.props.user.current.resume}
                          onChange={e => {
                            this.setState({
                              ...this.state,
                              newUser: {
                                ...this.state.newUser,
                                resume: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <center>
                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={() => {
                            this.props.updateProfile(this.state.newUser);
                            this.setState({
                              ...this.state,
                              editting: false
                            });
                          }}
                        >
                          Save
                        </button>
                      </center>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    More About {this.props.user.current.name}
                  </h4>
                </div>
                <div className="modal-body">
                  <center>
                    <img
                      src={this.props.user.current.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"}
                      name="aboutme"
                      width={140}
                      height={140}
                      border={0}
                      className="img-circle"
                    />
                    <h3 className="media-heading">
                      {this.props.user.current.name +
                        " " +
                        this.props.user.current.surname}{" "}
                      <br />
                      <small>{this.props.user.current.email}</small>
                    </h3>
                    <span>
                      <strong>Skills: </strong>
                    </span>
                    <span className="label label-warning">HTML5/CSS</span>
                    <span className="label label-info">Adobe CS 5.5</span>
                    <span className="label label-info">Microsoft Office</span>
                    <span className="label label-success">
                      Windows XP, Vista, 7
                    </span>
                  </center>
                  <hr />
                  <center>
                    <p className="text-left">
                      <strong>Bio: </strong>
                      <br />
                      {this.props.user.current.resume}
                    </p>
                    <br />
                  </center>
                </div>
                <div className="modal-footer">
                  <center>
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          editting: true
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </center>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
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
      fetchNotifications,
      updateProfile
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainTopNavigation);
