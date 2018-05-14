import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import { fetchCourse } from "../../../modules/courses";

class CourseSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchCourse(this.props.match.params.course);
  }

  render() {
    return (
      <div>
        <PageHeader
          title="Course settings"
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            }
          ]}
        />
        <div className="content">
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseSettings);
