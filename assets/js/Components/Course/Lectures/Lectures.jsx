import React from "react";
import PageHeader from "../../common/PageHeader";
import LectureItem from "./LectureItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLectures } from "../../../modules/lectures";
import { bindActionCreators } from "redux";
import { ROLES } from '../../../consts/userRoles';

class Lectures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        showOnlyOwn: false,
        showPrevious: true
      }
    };
  }

  componentWillMount = () => {
    this.props.fetchLectures(this.props.match.params.course, false, false);
  };

  render() {
    return (
      <div>
        <PageHeader
          title={"Lectures"}
          subtitle={
            !this.props.user.courseRole.loading && (this.props.user.courseRole.item.role === ROLES.ADMIN ||
              this.props.user.courseRole.item.role === ROLES.LECTOR) && (
              <Link
                to={`/course/${
                  this.props.match.params.course
                }/create-new-lecture`}
              >
                {" "}
                Create a new lecture
              </Link>
            )
          }
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            }
          ]}
        />
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-default collapsed-box">
                <div className="box-header with-border ">
                  <h3 className="box-title">Filter</h3>
                  <div className="box-tools pull-right">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
                <div className="box-body" style={{ display: "none" }}>
                  <div className="form-group">
                    <label>
                      <div
                        className={
                          "icheckbox_flat-green" +
                          (this.state.filter.showPrevious ? " checked" : "")
                        }
                        style={{ position: "relative" }}
                      >
                        <input
                          type="checkbox"
                          className="flat-red"
                          style={{ position: "absolute", opacity: 0 }}
                          onClick= {evt => {
                            if (!this.state.filter.showPrevious) {
                                this.props.fetchLectures(
                                    this.props.match.params.course,
                                    this.state.filter.showOnlyOwn
                                );
                            } else {
                                this.props.fetchLectures(
                                    this.props.match.params.course,
                                    this.state.filter.showOnlyOwn,
                                    true
                                );
                            }
                            this.setState({
                                filter: {
                                    ...this.state.filter,
                                    showPrevious: !this.state.filter.showPrevious
                                }
                            });
                        }}
                        />

                        <ins
                          className="iCheck-helper"
                          style={{
                            position: "absolute",
                            top: "0%",
                            left: "0%",
                            display: "block",
                            width: "100%",
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            background: "rgb(255, 255, 255)",
                            border: 0,
                            opacity: 0
                          }}
                        />
                      </div>
                      Show previous lectures
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <div
                        className={
                          "icheckbox_flat-green" +
                          (this.state.filter.showOnlyOwn ? " checked" : "")
                        }
                        style={{ position: "relative" }}
                      >
                        <input
                          type="checkbox"
                          className="flat-red"
                          style={{ position: "absolute", opacity: 0 }}
                          onClick={evt => {
                            if (!this.state.filter.showOnlyOwn) {
                              this.props.fetchLectures(
                                this.props.match.params.course,
                                1,
                                !this.state.filter.showPrevious
                              );
                            } else {
                              this.props.fetchLectures(
                                this.props.match.params.course,
                                0,
                                !this.state.filter.showPrevious
                              );
                            }
                            this.setState({
                              filter: {
                                ...this.state.filter,
                                showOnlyOwn: !this.state.filter.showOnlyOwn
                              }
                            });
                          }}
                        />

                        <ins
                          className="iCheck-helper"
                          style={{
                            position: "absolute",
                            top: "0%",
                            left: "0%",
                            display: "block",
                            width: "100%",
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            background: "rgb(255, 255, 255)",
                            border: 0,
                            opacity: 0
                          }}
                        />
                      </div>
                      Show only own lectures
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.props.lectures.items.map(lecture => (
            <LectureItem key={lecture.id} lecture={lecture} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lectures: state.lectures,
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchLectures
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
