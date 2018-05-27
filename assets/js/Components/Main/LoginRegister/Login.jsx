import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../../modules/user";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userObject: {
        email: "",
        password: ""
      },
      showError: false
    };
  }

  render() {
    return (
      <div className="landingpage">
        <header className="bg-gradient" style={{minHeight: 1000, "overflow": "hidden"}}>
          <div className="login-box ">
            <div className="login-logo">
              <Link style={{color: "#FFFFFF"}} to="/">
                CourseSource
              </Link>
            </div>
            <div className="login-box-body">
              {this.state.showError &&
                this.props.user.login.error &&
                !this.props.user.login.loading && (
                  <div className="alert alert-danger">
                    <h4>
                      <i className="icon fa fa-ban" />{" "}
                      {this.props.user.login.error}
                    </h4>
                  </div>
                )}

              <form>
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
                          email: e.target.value
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
                          password: e.target.value
                        }
                      })
                    }
                  />
                  <span className="glyphicon glyphicon-lock form-control-feedback" />
                </div>
                <div className="row">
                  <div className="col-xs-4 col-xs-offset-8">
                    <button
                      className="btn btn-primary btn-block btn-flat"
                      onClick={e => {
                        this.props.login(this.state.userObject);
                        e.preventDefault();
                        this.setState({ ...this.state, showError: true });
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>

              <br />
              <Link to="/register" className="text-center">
                Register a new membership
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
      login
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
