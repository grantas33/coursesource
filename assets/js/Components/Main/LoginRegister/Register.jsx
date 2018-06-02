import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register } from "../../../modules/user";

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
        plainPassword: ""
      },
      showError: false,
      secondPassword: ""
    };
  }

  render() {
    return (
      <div className="landingpage">
        <header
          className="bg-gradient"
          style={{ minHeight: 1000, overflow: "hidden" }}
        >
          <div className="register-box">
            <div className="register-logo">
              <Link style={{ color: "#FFFFFF" }} to="/">
                CourseSource
              </Link>
            </div>
            <div className="register-box-body">
              <p className="login-box-msg">Register a new membership</p>

              {this.state.showError &&
                this.props.user.register.error &&
                !this.props.user.register.loading && (
                  <div
                    className="alert alert-danger alert-dismissable"
                  >
                    <h4>
                      <i className="icon fa fa-ban" />
                      Alert
                    </h4>
                    {Object.keys(this.props.user.register.error).map(
                      (key, index) => {
                        return <div key={index}>{this.props.user.register.error[key]}</div>
                      }
                    )}
                  </div>
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
                <div
                  className={
                    "form-group has-feedback" +
                    (this.state.secondPassword ===
                    this.state.userObject.plainPassword
                      ? ""
                      : " has-error")
                  }
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={e =>
                      this.setState({
                        ...this.state,
                        userObject: {
                          ...this.state.userObject,
                          plainPassword: e.target.value
                        }
                      })
                    }
                  />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div
                  className={
                    "form-group has-feedback" +
                    (this.state.secondPassword ===
                    this.state.userObject.plainPassword
                      ? ""
                      : " has-error")
                  }
                >
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
                  <div className="col-xs-offset-7 col-xs-5">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-flat"
                      onClick={e => {
                        if (
                          this.state.secondPassword ===
                          this.state.userObject.plainPassword
                        ) {
                          this.props.register(this.state.userObject);
                          this.setState({ ...this.state, showError: true });
                        }
                        e.preventDefault();
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
        </header>
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
