import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  componentDidMount = () => {
    document.body.classList.toggle("layout-top-nav", true);
    document.body.classList.toggle("sidebar-collapse", false);
  };

  componentWillUnmount = () => {
    document.body.classList.toggle("layout-top-nav", false);
  };

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
          <form method="post">
            <div className="form-group has-feedback">
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
              />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                className="form-control"
                placeholder="Retype password"
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

export default Register;
