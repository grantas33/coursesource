import React from "react";
import PageHeader from "../../common/PageHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers, inviteUser } from "../../../modules/users";
import Select from "react-select";
import axios from "axios";
import "react-select/dist/react-select.css";
import fetch from "isomorphic-fetch";
import tokenObject from "../../../tokenObject";
import swal from "sweetalert2";
import './UsersManagement.css'

class UsersManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "STUDENT"
    };
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
                <div className="box-body table-responsive no-padding">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <th />
                        <th>User name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                      </tr>
                      {this.props.users.items.map(user => {
                        return (
                          <tr key={user.user.id}>
                            <td className='td-user-image'>
                              <img className='user-image' src={user.user.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"} alt="User Image" />
                            </td>
                            <td>
                              <Link
                                to={`/course/${
                                  this.props.match.params.course
                                }/users-management/${user.id}`}
                              >
                                {user.user.name + " " + user.user.surname}
                              </Link>
                            </td>
                            <td>{user.user.email}</td>
                            <td>
                              <span className="label label-success">
                                {user.role}
                              </span>
                            </td>
                            <td>
                              <span className="label label-success">
                                {user.status}
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
          <div className="row select-bar-padding">
            <div className="col-sm-4 no-padding">
              <Select.Async
                value={this.state.value}
                valueKey="id"
                loadOptions={(input, callback) => {
                  if (!input) {
                    return Promise.resolve({ options: [] });
                  }

                  return fetch(
                    `/api/user/get/all?query=${input}`,
                    tokenObject()
                  )
                    .then(response => response.json())
                    .then(json => {
                      return {
                        options: json.map(item => ({
                          label: item.name + " " + item.surname,
                          id: item.id
                        }))
                      };
                    });
                }}
                filterOptions={(options, filter, currentValues) => {
                  return options;
                }}
                onChange={value => this.setState({ ...this.state, value })}
              />
            </div>

            <div className="col-sm-2 no-padding">
              <select
                className="form-control select-bar"
                onClick={e =>
                  this.setState({ ...this.state, role: e.target.value })
                }
              >
                <option value={"STUDENT"}>Student</option>
                <option value={"TEACHER"}>Teacher</option>
                <option value={"ADMIN"}>Admin</option>
              </select>
            </div>

            <div className="col-sm-3 no-padding">
              <button
                onClick={() => {
                  this.props.inviteUser(this.props.match.params.course, {
                    user_id: this.state.value.id,
                    role: this.state.role
                  });
                }}
                className="btn btn-primary select-bar"
              >
                Invite new user
              </button>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchUsers, inviteUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
