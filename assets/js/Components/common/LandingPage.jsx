import React from "react";
import { Link } from "react-router-dom";
import { Redirect, Route } from 'react-router-dom'
import "./LandingPage.css";


class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    };
  }

  render() {
    const isLoggedIn = window.localStorage.getItem("userToken")
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/main/my-courses', state: { from: this.props.location } }} />
    }
    return (
      <div className="landingpage">
        {/* Nav Menu */}
        <header className="bg-gradient" id="home">
          <div id="landing-header--margin-top" className="container mt-5">
            <h1 className="landing-page-header">Join CourseSource</h1>
            <p className="tagline">
              The one and the only multiple courses manager. Just register and
              start learning today.{" "}
            </p>
            <Link
              to="/register"
              id="landing-button"
              className="btn btn-primary landing-button"
            >
              Register
            </Link>
            <Link to="/login" id="landing-button" className="btn btn-primary">
              Login
            </Link>
          </div>
          <div className="img-holder mt-3">
            <img
              src="https://www.odoo.com/apps/modules/8.0/project_task_repetition/task_scheduling.png"
              className="img-fluid"
            />
          </div>
        </header>
        <div className="section light-bg" id="features">
          <div className="container">
            <div className="section-title">
              <small>HIGHLIGHTS</small>
              <h3>Features you love</h3>
            </div>
            <div className="row">
              <div className="col-12 col-lg-4">
                <div className="card features">
                  <div className="card-body">
                    <div className="media">
                      <span className="ti-face-smile gradient-fill ti-3x mr-3" />
                      <div className="media-body">
                        <h4 className="card-title">Simple</h4>
                        <p className="card-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer rutrum, urna eu pellentesque{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="card features">
                  <div className="card-body">
                    <div className="media">
                      <span className="ti-settings gradient-fill ti-3x mr-3" />
                      <div className="media-body">
                        <h4 className="card-title">Customize</h4>
                        <p className="card-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer rutrum, urna eu pellentesque{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="card features">
                  <div className="card-body">
                    <div className="media">
                      <span className="ti-lock gradient-fill ti-3x mr-3" />
                      <div className="media-body">
                        <h4 className="card-title">Secure</h4>
                        <p className="card-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Integer rutrum, urna eu pellentesque{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section light-bg">
          <div className="container">
            <div className="section-title">
              <small>FEATURES</small>
              <h3>Do more with our app</h3>
            </div>
            <ul className="nav nav-tabs nav-justified" role="tablist">
              <li className="nav-item">
                <a
                  className={
                    "nav-link " + (this.state.activeTab === 1 ? "active" : "")
                  }
                  onClick={() => this.setState({ activeTab: 1 })}
                  data-toggle="tab"
                  href="#communication"
                >
                  Communication
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    "nav-link " + (this.state.activeTab === 2 ? "active" : "")
                  }
                  onClick={() => this.setState({ activeTab: 2 })}
                  data-toggle="tab"
                  href="#schedule"
                >
                  Scheduling
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    "nav-link " + (this.state.activeTab === 3 ? "active" : "")
                  }
                  onClick={() => this.setState({ activeTab: 3 })}
                  data-toggle="tab"
                  href="#messages"
                >
                  Messages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    "nav-link " + (this.state.activeTab === 4 ? "active" : "")
                  }
                  onClick={() => this.setState({ activeTab: 4 })}
                  data-toggle="tab"
                  href="#livechat"
                >
                  Live Chat
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade" id="communication">
                <div className="d-flex flex-column flex-lg-row">
                  <img
                    src="images/graphic.png"
                    alt="graphic"
                    className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                  />
                  <div>
                    <h2>Communicate with ease</h2>
                    <p className="lead">
                      Uniquely underwhelm premium outsourcing with proactive
                      leadership skills.{" "}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer rutrum, urna eu pellentesque pretium, nisi nisi
                      fermentum enim, et sagittis dolor nulla vel sapien.
                      Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                      congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem
                      placerat volutpat. Praesent quis facilisis elit. Sed
                      condimentum neque quis ex porttitor,
                    </p>
                    <p>
                      {" "}
                      malesuada faucibus augue aliquet. Sed elit est, eleifend
                      sed dapibus a, semper a eros. Vestibulum blandit vulputate
                      pharetra. Phasellus lobortis leo a nisl euismod, eu
                      faucibus justo sollicitudin. Mauris consectetur, tortor
                      sed tempor malesuada, sem nunc porta augue, in dictum arcu
                      tortor id turpis. Proin aliquet vulputate aliquam.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade active show" id="schedule">
                <div className="d-flex flex-column flex-lg-row">
                  <div>
                    <h2>Scheduling when you want</h2>
                    <p className="lead">
                      Uniquely underwhelm premium outsourcing with proactive
                      leadership skills.{" "}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer rutrum, urna eu pellentesque pretium, nisi nisi
                      fermentum enim, et sagittis dolor nulla vel sapien.
                      Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                      congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem
                      placerat volutpat. Praesent quis facilisis elit. Sed
                      condimentum neque quis ex porttitor,
                    </p>
                    <p>
                      {" "}
                      malesuada faucibus augue aliquet. Sed elit est, eleifend
                      sed dapibus a, semper a eros. Vestibulum blandit vulputate
                      pharetra. Phasellus lobortis leo a nisl euismod, eu
                      faucibus justo sollicitudin. Mauris consectetur, tortor
                      sed tempor malesuada, sem nunc porta augue, in dictum arcu
                      tortor id turpis. Proin aliquet vulputate aliquam.
                    </p>
                  </div>
                  <img
                    src="images/graphic.png"
                    alt="graphic"
                    className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                  />
                </div>
              </div>
              <div className="tab-pane fade" id="messages">
                <div className="d-flex flex-column flex-lg-row">
                  <img
                    src="images/graphic.png"
                    alt="graphic"
                    className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                  />
                  <div>
                    <h2>Realtime Messaging service</h2>
                    <p className="lead">
                      Uniquely underwhelm premium outsourcing with proactive
                      leadership skills.{" "}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer rutrum, urna eu pellentesque pretium, nisi nisi
                      fermentum enim, et sagittis dolor nulla vel sapien.
                      Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                      congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem
                      placerat volutpat. Praesent quis facilisis elit. Sed
                      condimentum neque quis ex porttitor,
                    </p>
                    <p>
                      {" "}
                      malesuada faucibus augue aliquet. Sed elit est, eleifend
                      sed dapibus a, semper a eros. Vestibulum blandit vulputate
                      pharetra. Phasellus lobortis leo a nisl euismod, eu
                      faucibus justo sollicitudin. Mauris consectetur, tortor
                      sed tempor malesuada, sem nunc porta augue, in dictum arcu
                      tortor id turpis. Proin aliquet vulputate aliquam.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="livechat">
                <div className="d-flex flex-column flex-lg-row">
                  <div>
                    <h2>Live chat when you needed</h2>
                    <p className="lead">
                      Uniquely underwhelm premium outsourcing with proactive
                      leadership skills.{" "}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Integer rutrum, urna eu pellentesque pretium, nisi nisi
                      fermentum enim, et sagittis dolor nulla vel sapien.
                      Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                      congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem
                      placerat volutpat. Praesent quis facilisis elit. Sed
                      condimentum neque quis ex porttitor,
                    </p>
                    <p>
                      {" "}
                      malesuada faucibus augue aliquet. Sed elit est, eleifend
                      sed dapibus a, semper a eros. Vestibulum blandit vulputate
                      pharetra. Phasellus lobortis leo a nisl euismod, eu
                      faucibus justo sollicitudin. Mauris consectetur, tortor
                      sed tempor malesuada, sem nunc porta augue, in dictum arcu
                      tortor id turpis. Proin aliquet vulputate aliquam.
                    </p>
                  </div>
                  <img
                    src="images/graphic.png"
                    alt="graphic"
                    className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
