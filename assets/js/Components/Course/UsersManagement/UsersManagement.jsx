import React from "react";
import PageHeader from "../../common/PageHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../../../modules/users";

class UsersManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.props.fetchUsers(this.props.match.params.course);
  };

  render() {
    if (this.props.users.loading === true) {
      return <h3>Loading...</h3>;
    } else if (
      this.props.users.loading === false &&
      this.props.users.error === true
    ) {
      return <h3>Error</h3>;
    }
    return (
      <div>
        <PageHeader
          title={"Users management"}
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
                  <h3 className="box-title">Users list</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th />
                        <th>User name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th />
                        <th />
                      </tr>
                      {this.props.users.items.map(user => {
                        return (
                          <tr key={user.user.id}>
                            <td>{user.user.avatar}</td>
                            <td>{user.user.name + " " + user.user.surname}</td>
                            <td>{user.user.email}</td>
                            <td>
                              <span className="label label-success">Admin</span>
                            </td>
                            <td>
                              <button className="btn-danger">
                                <span className="fa fas fa-minus" />
                              </button>
                              <button
                                onClick={() =>
                                  this.props.history.push(
                                    `/course/${
                                      this.props.match.params.course
                                    }/users-management/${user.user.id}`
                                  )
                                }
                                className="btn-info"
                              >
                                <span className="fa fas fa-info" />
                              </button>
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
          <button className="btn btn-primary"> Invite new user </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.allUsers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
