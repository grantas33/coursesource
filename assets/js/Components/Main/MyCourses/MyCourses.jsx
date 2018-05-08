import React from "react";
import MyCourseItem from "./MyCourseItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCourses } from "../../../modules/courses";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";

class MyCourses extends React.Component {
  componentWillMount() {
    this.props.fetchCourses('my');
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
          title={"My courses"}
          links={[
            {
              name: "Home",
              url: `/`
            }
          ]}
        />
        <div className="content">
          <div className="row">
            {this.props.courses.items.map((course, i) => {
              return (
                <div className="col-md-12" key={i}>
                  <MyCourseItem key={course.id} course={course} />
                </div>
              );
            })}
          </div>
          <h3> Are you a mentor? </h3>
          <div className="row col-sm-3">
            <Link to="/main/create-new-course">
              <button type="button" className="btn btn-block btn-primary">
                Create new course
              </button>
            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses);
