import React from "react";
import { Link } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import "./LandingPage.css";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    };
  }

  render() {
    const isLoggedIn = window.localStorage.getItem("userToken");
    if (isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/main/my-courses",
            state: { from: this.props.location }
          }}
        />
      );
    }
    return (
      <div className="landingpage">
        {/* Nav Menu */}
        <header className="bg-gradient" id="home">
          <div id="landing-header--margin-top" className="container mt-5">
            <h1 className="landing-page-header">CourseSource</h1>
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
                          Use it anytime to check the upcoming lectures or
                          deadline date for a homework
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
                        <h4 className="card-title">Responsive</h4>
                        <p className="card-text">
                          Looks good on computers, tablets and even mobile
                          phones
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
                          Courses can be made private and hidden from everybody
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
                  Notifications
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
                  Mentoring
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
                  Scheduling
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active in" id="communication">
                <div className="d-flex flex-column flex-lg-row">
                  <div>
                    <h2>Communicate with ease</h2>
                    <p className="lead">
                      Common system for chat, lecture dates and assignment
                      deadlines.
                    </p>
                    <p>
                      You can use CourseSource to communicate with lectors and
                      other fellow students.
                    </p>
                    <p>
                      If you have any questions about upcoming lecture, you can
                      comment and ask about it.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="schedule">
                <div className="d-flex flex-column flex-lg-row">
                  <div>
                    <h2>Notifications</h2>
                    <p className="lead">
                      Get real time notifications about new events
                    </p>
                    <p>
                      With CourseSource you won't miss any events. You can
                      toggle on notifications and get information about all new
                      lectures, assignments or even new grades.
                    </p>
                    <p>
                      Should you don't want to be disturbed, you can turn off
                      notifications in the settings panel.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="messages">
                <div className="d-flex flex-column flex-lg-row">
                  <div>
                    <h2>Mentoring</h2>
                    <p className="lead">
                      Better tools - easier learning
                    </p>
                    <p>
                      With CourseSource mentors can create new courses, invite lectors, students and start teaching. 
                    </p>
                    <p>
                      Should you want only the most clever and motivated students to attend, you can create an entry task and invite students based on their knowledge.
                    </p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="livechat">
                <div className="d-flex flex-column flex-lg-row">
                  <div>
                    <h2>Scheduling when you want</h2>
                    <p className="lead">Check schedule at any time</p>
                    <p>
                      With CourseSource you can check your schedule at any time.
                      This way you can make plans more easily.
                    </p>
                    <p>
                      Every course has it's dedicated schedule that includes
                      lectures and assignment dates.
                    </p>
                  </div>
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
