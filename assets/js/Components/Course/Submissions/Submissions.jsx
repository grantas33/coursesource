import React from "react";
import PageHeader from "../../common/PageHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers, inviteUser } from "../../../modules/users";
import Select from "react-select";
import axios from "axios";
import fetch from "isomorphic-fetch";
import tokenObject from "../../../tokenObject";
import swal from "sweetalert2";
import { fetchSubmissions, acceptSubmission, declineSubmission } from "../../../modules/submissions";

class Submissions extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.props.fetchSubmissions(this.props.match.params.course);
  };

  render() {
    if (this.props.submissions.loading === true) {
      return <h3>Loading...</h3>;
    } else if (
      this.props.submissions.loading === false &&
      this.props.submissions.error === true
    ) {
      return <h3>Error</h3>;
    }
    return (
      <div>
        <PageHeader
          title={"Submissions"}
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
                  <h3 className="box-title">Submissions list</h3>
                </div>
                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th />
                        <th>User name</th>
                        <th>Submission</th>
                        <th>Score</th>
                        <th />
                      </tr>
                      {this.props.submissions.items.map(sub => {
                        return (
                          <tr key={sub.id}>
                            <td className="td-user-image">
                              <img
                                className="user-image"
                                src={
                                  sub.student.avatar ||
                                  "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"
                                }
                                alt="User Image"
                              />
                            </td>
                            <td>
                              {sub.student.name + " " + sub.student.surname}
                            </td>
                            <td>{sub.submission}</td>
                            <td>
                              <input
                                style={{
                                  width: 20,
                                }}
                                type="number"
                                defaultValue={sub.score}
                              />
                            </td>
                            <td>
                              <span onClick={() => this.props.acceptSubmission(this.props.match.params.course, {user_id: sub.student.id})} style={{cursor: "pointer"}} className="label label-success">
                                Accept
                              </span>
                              <span onClick={() => this.props.declineSubmission(this.props.match.params.course, {user_id: sub.student.id})} style={{cursor: "pointer"}} className="label label-danger">
                                Decline
                              </span>
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
  submissions: state.submissions.allSubmissions
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSubmissions, acceptSubmission, declineSubmission }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Submissions);
