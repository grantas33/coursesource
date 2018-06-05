import React from "react";
import PageHeader from "../../common/PageHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchAssignments,
  fetchSubmissions,
  gradeSubmission
} from "../../../modules/assignments";
import { bindActionCreators } from "redux";

class AssignmentGrading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.props.fetchSubmissions(this.props.match.params.assignment);
  };

  render() {
    let item = this.props.assignments.items.filter(
      item => item.id == this.props.match.params.assignment
    )[0];
    let title = item ? item.title : "assignment";
    return (
      <div>
        <PageHeader
          title={title}
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            },
            {
              name: "Assignments grading",
              url: `/course/${
                this.props.match.params.course
              }/assignments-grading/`
            }
          ]}
        />
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Grades for {title}</h3>
                </div>
                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th>Student</th>
                        <th>Submission date</th>
                        <th>Submission</th>
                        <th>Grade</th>
                      </tr>
                      {this.props.assignments.submissions.map(submission => {
                        return (
                          <tr key={submission.id}>
                            <td>
                              {submission.student.name +
                                " " +
                                submission.student.surname}
                            </td>
                            <td>{submission.submission_date}</td>
                            <td>{submission.submission}</td>
                            <td>
                              {submission.assignment.is_gradeable ? (
                                <input
                                  style={{
                                    width: 20
                                  }}
                                  type="number"
                                  onChange={(e) => this.props.gradeSubmission(submission.id, {score: parseInt(e.target.value)})}
                                  defaultValue={submission.score}
                                />
                              ) : (
                                <span className="label label-danger">
                                  Not gradable
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
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
      fetchAssignments,
      fetchSubmissions,
      gradeSubmission
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentGrading);
