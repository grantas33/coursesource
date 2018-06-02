import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import { fetchUsers } from "../../../modules/users";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      submitted: false
    };
  }

  componentWillMount() {
    this.props.fetchUsers(this.props.match.params.course);
  }

  render() {
    let user = this.props.users.items.find(
      u => u.id == this.props.match.params.user
    );
    if (!user) {
      return "Loading";
    }
    return (
      <div>
        <PageHeader
          title={user.user.name + " " + user.user.surname}
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
                    src={user.user.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"}
                    alt="User profile picture"
                  />
                  <h3 className="profile-username text-center">
                    {user.user.name + " " + user.user.surname}
                  </h3>
                  <p className="text-muted text-center">{user.course.tag}</p>
                  <p className="text-muted text-center">{user.user.resume}</p>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsers
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
