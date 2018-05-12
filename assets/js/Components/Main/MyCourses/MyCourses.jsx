import React from "react";
import MyCourseItem from "./MyCourseItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMyCourses } from "../../../modules/courses";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";

class MyCourses extends React.Component {
  componentWillMount() {
    this.props.fetchMyCourses();
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
            {console.log(this.props) || this.props.courses.items.map((courseInfo) => {
              return (
                <div className="col-md-6" key={courseInfo.course.id}>
                  <MyCourseItem courseInfo={courseInfo} />
                </div>
              );
            })
          }
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
  courses: state.courses.allMyCourses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMyCourses
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses);
