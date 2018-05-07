import React from "react";
import PageHeader from "../../common/PageHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAssignments } from "../../../modules/assignments";
import { bindActionCreators } from "redux";

class AssignmentGrading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.props.fetchAssignments(this.props.match.params.course);
  };

  render() {
    return (
      <div>
        <PageHeader
          title={"assignment  title"}
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            },
            {
              name: "Assignments grading",
              url: `/course/${this.props.match.params.course}/assignments-grading/`
            }
          ]}
        />
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Grades for assignment title</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th>Student</th>
                        <th>Status</th>
                        <th>Submission date</th>
                        <th>Link</th>
                        <th>Grade</th>
                      </tr>
                    </tbody>
                  </table>
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
  assignments: state.assignments
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAssignments
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentGrading);
