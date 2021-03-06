import React from "react";
import MyCourseItem from "./MyCourseItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMyCourses, acceptInvitation, declineInvitation } from "../../../modules/courses";
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
            {this.props.courses.items.length === 0 ? (
                <h3 id='empty_page'>You are not participating in any courses yet!</h3>
                ) : (
          <div className="row">
            {this.props.courses.items.map((courseInfo) => {
              return (
                <div className="col-md-6" key={courseInfo.course.id}>
                  <MyCourseItem 
                    courseInfo={courseInfo} 
                    accept={() => this.props.acceptInvitation(courseInfo.course.id)}
                    decline={() => this.props.declineInvitation(courseInfo.course.id)}
                    />
                </div>
              );
            })
          }
          </div> )}
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
      fetchMyCourses,
      acceptInvitation,
      declineInvitation
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses);
