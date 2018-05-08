import React from "react";
import PageHeader from "../../common/PageHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers } from '../../../modules/users';

class UsersManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.props.fetchUsers(this.props.match.params.course)
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
                      </tr>
                      {this.props.users.items.map(user => {
                        return (
                          <tr
                            key={user.id}
                            onClick={() =>
                              this.props.history.push(
                                `/course/${
                                  this.props.match.params.course
                                }/users-management/${user.id}`
                              )
                            }
                          >
                            <td>{user.avatar}</td>
                            <td>{user.name + " " + user.surname}</td>
                            <td>{user.email}</td>
                            <td>
                              <span className="label label-success">Admin</span>
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
  users: state.users.allUsers
});

const mapDispatchToProps = dispatch => bindActionCreators({fetchUsers}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
