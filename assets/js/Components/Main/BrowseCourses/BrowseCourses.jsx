import React from "react";
import BrowseCourseItem from "./BrowseCourseItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCourses } from "../../../modules/courses";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";

class BrowseCourses extends React.Component {
  componentWillMount() {
    this.props.fetchCourses('public');
  }

  render() {
    if (this.props.courses.loading === true) {
      return <h3>Loading...</h3>;
    } else if (
      this.props.courses.loading === false &&
      this.props.courses.error === true
    ) {
      return <h3>Error</h3>;
    }
    return (
      <div>
        <PageHeader
          title={"Browse courses"}
          links={[
            {
              name: "Home",
              url: `/`
            }
          ]}
        />
        <div className="content">
          <div className="box-header with-border">
            <select defaultValue="0" className="input-sm">
              <option value="0" disabled>
                Sort by
              </option>
              <option value="1">Creation date</option>
              <option value="2">Mentors count</option>
              <option value="3">Lectors count</option>
              <option value="4">Lectures count</option>
            </select>
            <div className="pull-right">
              <div className="has-feedback">
                <input
                  type="text"
                  className="form-control input-sm"
                  placeholder="Search Courses"
                />
                <span className="glyphicon glyphicon-search form-control-feedback" />
              </div>
            </div>
          </div>

          <div className="row">
            {this.props.courses.items.map((course, i) => (
              <div className="col-md-6" key={i}>
                <BrowseCourseItem key={course.id} course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses.allCourses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCourses
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCourses);
