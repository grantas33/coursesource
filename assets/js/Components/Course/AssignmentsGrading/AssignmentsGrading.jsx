import React from "react";
import PageHeader from "../../common/PageHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAssignments } from "../../../modules/assignments";
import { bindActionCreators } from "redux";

class AssignmentsGrading extends React.Component {
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
          title={"Assignments grading"}
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            }
          ]}
        />
        <div className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Choose an assignment</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th>Lector</th>
                        <th>Title</th>
                        <th>Deadline date</th>
                        <th>Gradable</th>
                      </tr>
                      {this.props.assignments.items.map(assignment => {
                        return (
                          <tr
                            key={assignment.id}
                            onClick={() =>
                              this.props.history.push(
                                `/course/${
                                  this.props.match.params.course
                                }/assignments-grading/${assignment.id}`
                              )
                            }
                            style={{cursor: "pointer"}}
                          >
                            <td>{assignment.teacher.name + " " + assignment.teacher.surname}</td>
                            <td>{assignment.title}</td>
                            <td>{assignment.deadline_date}</td>
                            <td>
                              {assignment.is_gradeable ? (
                                <span className="label label-success">Yes</span>
                              ) : (
                                <span className="label label-danger">No</span>
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
      fetchAssignments
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentsGrading);
