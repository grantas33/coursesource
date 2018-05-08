import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchCourses } from "../../../modules/courses";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import { fetchCourse } from "../../../modules/courses";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      submitted: false
    };
  }

  componentWillMount() {
    this.props.fetchCourse(this.props.match.params.course);
  }

  render() {
    return (
      <div>
        <PageHeader
          title="Vardas pavarde"
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            },
            {
              name: "Users management",
              url: `/course/${this.props.match.params.course}/users-management`
            }
          ]}
        />
        <div className="content" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
