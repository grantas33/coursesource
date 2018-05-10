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
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-body box-profile">
                  <img
                    className="profile-user-img img-responsive img-circle"
                    src="../../dist/img/user4-128x128.jpg"
                    alt="User profile picture"
                  />
                  <h3 className="profile-username text-center">
                    Nina Mcintire
                  </h3>
                  <p className="text-muted text-center">Software Engineer</p>
                  <ul className="list-group list-group-unbordered">
                    <li className="list-group-item">
                      <b>Followers</b> <a className="pull-right">1,322</a>
                    </li>
                    <li className="list-group-item">
                      <b>Following</b> <a className="pull-right">543</a>
                    </li>
                    <li className="list-group-item">
                      <b>Friends</b> <a className="pull-right">13,287</a>
                    </li>
                  </ul>
                  <a href="#" className="btn btn-primary btn-block">
                    <b>Follow</b>
                  </a>
                </div>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
