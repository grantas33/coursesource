import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDashboard } from "../../../modules/dashboard";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import Calendar from "../../Course/Schedule/Calendar/Calendar";
import { fetchMyCourses } from "../../../modules/courses";

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchDashboard();
    this.props.fetchMyCourses();
  }

  render() {
    if (this.props.dashboard.loading === true) {
      return <h3>Loading...</h3>;
    } else if (
      this.props.dashboard.loading === false &&
      this.props.dashboard.error === true
    ) {
      return <h3>Error</h3>;
    }
    return (
      <div>
        <PageHeader
          title={"Dashboard"}
          links={[
            {
              name: "Home",
              url: `/`
            }
          ]}
        />
        <section className="content">
          <div className="row">
            <div className="col-sm-9">
              <h3>Upcoming events</h3>
              <Calendar
                events={[]}
                view={"week"}
                views={["month", "week", "day", "agenda"]}
                toolbar={false}
                eventStyleGetter={this.eventStyleGetter}
              />
            </div>
            <div className="col-sm-3">
              <h3>Other info</h3>
              <div className="small-box bg-red">
                <div className="inner">
                  <h3>{this.props.courses.items.filter(c => c.status === "PENDING").length}</h3>
                  <p>Pending invites</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <Link to="/main/my-courses" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
              <div className="small-box bg-green">
                <div className="inner">
                  <h3>{this.props.courses.items.filter(c => c.status === "ACTIVE").length}</h3>
                  <p>Active courses</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <Link to="/main/my-courses" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
              <div className="small-box bg-blue">
                <div className="inner">
                  <h3>{this.props.courses.items.filter(c => c.status === "FINISHED").length}</h3>
                  <p>Finished courses</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <Link to="/main/my-courses" className="small-box-footer">
                  More info <i className="fa fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  courses: state.courses.allMyCourses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDashboard,
      fetchMyCourses
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
