import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDashboard } from "../../../modules/dashboard";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.fetchDashboard();
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
            <div className="col-md-6 col-xs-12">
              <ul className="timeline">
                <li className="time-label">
                  <span className="bg-red">10 Feb. 2014</span>
                </li>
                <li>
                  <i className="fa fa-envelope bg-blue" />
                  <div className="timeline-item">
                    <span className="time">
                      <i className="fa fa-clock-o" /> 12:05
                    </span>
                    <h3 className="timeline-header">
                      <a href="#">Support Team</a> sent you an email
                    </h3>
                    <div className="timeline-body">
                      Etsy doostang zoodles disqus groupon greplin oooj voxy
                      zoodles, weebly ning heekya handango imeem plugg dopplr
                      jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                      Babblely odeo kaboodle quora plaxo ideeli hulu weebly
                      balihoo...
                    </div>
                    <div className="timeline-footer">
                      <a className="btn btn-primary btn-xs">Read more</a>
                      <a className="btn btn-danger btn-xs">Delete</a>
                    </div>
                  </div>
                </li>
                <li>
                  <i className="fa fa-user bg-aqua" />
                  <div className="timeline-item">
                    <span className="time">
                      <i className="fa fa-clock-o" /> 5 mins ago
                    </span>
                    <h3 className="timeline-header no-border">
                      <a href="#">Sarah Young</a> accepted your friend request
                    </h3>
                  </div>
                </li>
                <li>
                  <i className="fa fa-comments bg-yellow" />
                  <div className="timeline-item">
                    <span className="time">
                      <i className="fa fa-clock-o" /> 27 mins ago
                    </span>
                    <h3 className="timeline-header">
                      <a href="#">Jay White</a> commented on your post
                    </h3>
                    <div className="timeline-body">
                      Take me to your leader! Switzerland is small and neutral!
                      We are more like Germany, ambitious and misunderstood!
                    </div>
                    <div className="timeline-footer">
                      <a className="btn btn-warning btn-flat btn-xs">
                        View comment
                      </a>
                    </div>
                  </div>
                </li>
                <li className="time-label">
                  <span className="bg-green">3 Jan. 2014</span>
                </li>
                <li>
                  <i className="fa fa-camera bg-purple" />
                  <div className="timeline-item">
                    <span className="time">
                      <i className="fa fa-clock-o" /> 2 days ago
                    </span>
                    <h3 className="timeline-header">
                      <a href="#">Mina Lee</a> uploaded new photos
                    </h3>
                    <div className="timeline-body" />
                  </div>
                </li>

                <li>
                  <i className="fa fa-video-camera bg-maroon" />
                  <div className="timeline-item">
                    <span className="time">
                      <i className="fa fa-clock-o" /> 5 days ago
                    </span>
                    <h3 className="timeline-header">
                      <a href="#">Mr. Doe</a> shared a video
                    </h3>
                    <div className="timeline-body">
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                          className="embed-responsive-item"
                          src="https://www.youtube.com/embed/tMWkeBIohBs"
                          frameBorder={0}
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="timeline-footer">
                      <a href="#" className="btn btn-xs bg-maroon">
                        See comments
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <i className="fa fa-clock-o bg-gray" />
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-xs-12">
              <h4>Notifications</h4>
              <div className="box box-warning">
                <div className="box-header with-border">
                  <h3 className="box-title">Collapsable</h3>
                </div>
                <div className="box-body" style={{}}>
                  The body of the box
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDashboard
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
