import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCourses } from "../../../modules/courses";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import { fetchCourse } from "../../../modules/courses";

class CourseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      submitted: false,
      activeTab: 1
    };
  }

  componentWillMount() {
    this.props.fetchCourse(this.props.match.params.course);
  }

  render() {
    if (this.props.course.loading === true) {
      return <h3>Loading...</h3>;
    } else if (
      this.props.course.loading === false &&
      this.props.course.error === true
    ) {
      return <h3>Error</h3>;
    }
    return (
      <div>
        <PageHeader
          title={this.props.course.item.title}
          links={[
            {
              name: "Home",
              url: `/`
            },
            {
              name: "Browse courses",
              url: `/main/browse-courses`
            }
          ]}
        />
        <div className="content">
          <h1>{this.props.course.item.title}</h1>
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li
                className={this.state.activeTab === 1 ? "active" : ""}
                onClick={() => this.setState({ ...this.state, activeTab: 1 })}
              >
                <a>Description</a>
              </li>
              <li
                className={this.state.activeTab === 2 ? "active" : ""}
                onClick={() => this.setState({ ...this.state, activeTab: 2 })}
              >
                <a>Stats</a>
              </li>
              <li
                className={this.state.activeTab === 3 ? "active" : ""}
                onClick={() => this.setState({ ...this.state, activeTab: 3 })}
              >
                <a>Lectors</a>
              </li>
              <li
                className={this.state.activeTab === 4 ? "active" : ""}
                onClick={() => this.setState({ ...this.state, activeTab: 4 })}
              >
                <a>Other info</a>
              </li>
            </ul>
            <div className="tab-content">
              {this.state.activeTab === 1 &&
                <h3>{this.props.course.item.description}</h3>
              }
              {this.state.activeTab === 2 && 
                <h3>{this.props.course.item.description}</h3>
              }
              {this.state.activeTab === 3 && 
                <h3>{this.props.course.item.description}</h3>
              }
              {this.state.activeTab === 4 && 
                <h3>{this.props.course.item.creationDate}</h3>
              }
            </div>
          </div>

          {!this.state.showMore && (
            <button
              onClick={() =>
                this.setState({
                  ...this.state,
                  showMore: true
                })
              }
            >
              Join course
            </button>
          )}
          {(this.state.showMore || this.state.submitted) && (
            <div>
              <h3>
                In order to join this course you have to submit a solution for
                the following task:
              </h3>
              {!this.state.submitted ? (
                <div>
                  <input />
                  <button
                    onClick={() =>
                      this.setState({
                        ...this.state,
                        submitted: true
                      })
                    }
                  >
                    Submit a solution
                  </button>
                </div>
              ) : (
                <h3>You have already submitted a solution</h3>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  course: state.courses.course
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCourse
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo);
