import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../../../modules/user';

class Register extends React.Component {
  componentDidMount = () => {
    document.body.classList.toggle("layout-top-nav", true);
    document.body.classList.toggle("sidebar-collapse", false);
  };

  componentWillUnmount = () => {
    document.body.classList.toggle("layout-top-nav", false);
  };

  constructor(props) {
    super(props);
    this.state = {
      userObject: {
        name: "",
        surname: "",
        username: "",
        email: "",
        plainPassword: "",
      },
      showError: false
    };
  }

  render() {
    return (
      <div className="register-box">
        <div className="register-logo">
          <Link to="/">
            <b>CourseSource</b>
          </Link>
        </div>
        <div className="register-box-body">
          <p className="login-box-msg">Register a new membership</p>

          {this.state.showError &&
          this.props.user.register.error &&
          !this.props.user.register.loading ? (
            Object.keys(this.props.user.register.error).map((key, index) => (
              <div className="alert alert-danger alert-dismissible" key={index}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                <h4>
                  <i className="icon fa fa-ban" /> {this.props.user.register.error[key]}
                </h4>
              </div>
            ))
          ) : (
            <div />
          )}

          <form method="post">
            <div className="form-group has-feedback">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    userObject: {
                      ...this.state.userObject,
                      name: e.target.value
                    }
                  })
                }
              />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>

            <div className="form-group has-feedback">
              <input
                type="text"
                className="form-control"
                placeholder="Surname"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    userObject: {
                      ...this.state.userObject,
                      surname: e.target.value
                    }
                  })
                }
              />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>

            <div className="form-group has-feedback">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    userObject: {
                      ...this.state.userObject,
                      email: e.target.value,
                      username: e.target.value
                    }
                  })
                }
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    userObject: {
                      ...this.state.userObject,
                      plainPassword: 
                        e.target.value
                    }
                  })
                }
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                className="form-control"
                placeholder="Retype password"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    secondPassword: e.target.value
                  })
                }
              />
              <span className="glyphicon glyphicon-log-in form-control-feedback" />
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  <label>
                    <div
                      className="icheckbox_square-blue"
                      aria-checked="false"
                      aria-disabled="false"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          position: "absolute",
                          top: "-20%",
                          left: "-20%",
                          display: "block",
                          width: "140%",
                          height: "140%",
                          margin: 0,
                          padding: 0,
                          background: "rgb(255, 255, 255)",
                          border: 0,
                          opacity: 0
                        }}
                      />
                      <ins
                        className="iCheck-helper"
                        style={{
                          position: "absolute",
                          top: "-20%",
                          left: "-20%",
                          display: "block",
                          width: "140%",
                          height: "140%",
                          margin: 0,
                          padding: 0,
                          background: "rgb(255, 255, 255)",
                          border: 0,
                          opacity: 0
                        }}
                      />
                    </div>{" "}
                    I agree to the <a href="#">terms</a>
                  </label>
                </div>
              </div>
              <div className="col-xs-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                  onClick={e => {
                    this.props.register(this.state.userObject);
                    e.preventDefault();
                    this.setState({ ...this.state, showError: true });
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
          <Link to="/login" className="text-center">
            I already have a membership
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      register
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
