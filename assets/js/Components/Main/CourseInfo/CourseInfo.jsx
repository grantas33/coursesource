import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import { fetchCourse, applyToCourse } from "../../../modules/courses";
import user2img from "../../../../Resources/img/user2-160x160.jpg";
import swal from "sweetalert2";
import { addRedirect } from '../../../modules/user';
import './modal.css'

class CourseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      submitted: false,
      joined: false,
      activeTab: 1,
      submission: ""
    };
  }

  componentWillMount() {
      this.props.fetchCourse(this.props.match.params.course);
  }

  render() {
    if (this.props.course.courseLoading === true || this.props.course.entryTaskLoading === true ||
        this.props.course.userSubmittedLoading === true) {
      return <h3>Loading...</h3>;
    } else if (
      this.props.course.courseLoading === false &&
      this.props.course.error === true
    ) {
      return <h3>Error</h3>;
    }
    return (
        <div>
            <PageHeader
                title={'Course information'}
                links={[
                    {
                        name: "Home",
                        url: `/`
                    },
                    {
                        name: "Browse courses",
                        url: `/main/browse-courses`
                    }
                ]}
            />
            <div className="content">
                <div className="row">
                    <div className="col-md-3">
                        <div className="box box-primary">
                            <div className="box-body box-profile">
                                <h2 className="profile-username text-center">
                                    {this.props.course.item.title}
                                </h2>
                                <div >
                                  <span className='description'>
                                        {this.props.course.item.slogan}
                                  </span>
                                </div>
                                <p className="text-muted text-center"/>
                                <ul className="list-group list-group-unbordered">
                                    <li className="list-group-item">
                                        <b>Created on</b> <a
                                        className="pull-right">{this.props.course.item.creation_date}</a>
                                    </li>
                                    {this.props.course.item.start_date && (
                                        <li className="list-group-item">
                                            <b>Start date</b> <a
                                            className="pull-right">{this.props.course.item.start_date}</a>
                                        </li>)}
                                    {this.props.course.item.schedule_overview && (
                                        <li className="list-group-item">
                                            <b>Schedule overview</b><br/> <a
                                            className="pull-left">{this.props.course.item.schedule_overview}</a>
                                        </li>)}

                                </ul>
                            </div>
                        </div>

                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Actions</h3>
                            </div>
                            <div className="box-body">
                                {!this.props.course.item.is_submittable ? (
                                    !this.state.joined ? (<div className="text-center">
                                        <button
                                            className="btn btn-primary btn-lg btn-block"
                                            onClick={() => {
                                                if (!window.localStorage.getItem("userToken")) {
                                                    this.props.addRedirect(this.props.match.params.course);
                                                    this.props.history.push(`/register`);
                                                } else {
                                                    swal({
                                                        title: "Are you sure? You won't be able to revert this!",
                                                        type: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: "#3085d6",
                                                        cancelButtonColor: "#d33",
                                                        confirmButtonText: "Yes, apply!"
                                                    }).then(result => {
                                                        if (result.value) {
                                                            this.setState({
                                                                ...this.state,
                                                                joined: true,
                                                            });
                                                            this.props.applyToCourse(
                                                                this.props.course.item.id
                                                            );
                                                            swal(
                                                                "Applied!",
                                                                "You have applied to this course.",
                                                                "success"
                                                            );
                                                        }
                                                    });
                                                }
                                            }}
                                        >
                                            Join course
                                        </button>
                                    </div> ) : (<h3> You have joined the course </h3> )
                                ) : (
                                    <div>
                                        <span className="description">
                                            In order to join this course you have to submit a
                                            solution for the entry task
                                        </span>
                                        {(!this.state.submitted && !this.props.course.userSubmitted) ? (
                                            <div className="text-center">
                                                <button
                                                    className="btn btn-primary btn-lg btn-block button-margin"
                                                    onClick={() => {
                                                        console.log(this.props.course.item);
                                                        if (!window.localStorage.getItem("userToken")) {
                                                            this.props.addRedirect(this.props.match.params.course)
                                                            this.props.history.push(`/register`);
                                                        } else {
                                                            swal({
                                                                title: "Entry task",
                                                                input: "textarea",
                                                                inputAttributes: {
                                                                    autocapitalize: "off"
                                                                },
                                                                html: '<p>' + this.props.course.item.entryTask.description + '</p>'+
                                                                '<b>Submit your solution:</b>',
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#3085d6",
                                                                cancelButtonColor: "#d33",
                                                                confirmButtonText: "Submit!"
                                                            }).then(result => {
                                                                if (result.value) {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        submission: result.value
                                                                    });
                                                                    swal({
                                                                        title: "Are you sure? You won't be able to revert this!",
                                                                        type: 'warning',
                                                                        showCancelButton: true,
                                                                        confirmButtonColor: "#3085d6",
                                                                        cancelButtonColor: "#d33",
                                                                        confirmButtonText: "Submit!"
                                                                    }).then(result => {
                                                                        if (result.value) {
                                                                            this.setState({
                                                                                ...this.state,
                                                                                submitted: true,
                                                                            });
                                                                            this.props.applyToCourse(
                                                                                this.props.course.item.id,
                                                                                {
                                                                                    submission: this.state.submission
                                                                                }
                                                                            );
                                                                            swal(
                                                                                "Applied!",
                                                                                "You have applied to this course.",
                                                                                "success"
                                                                            );
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }}
                                                >
                                                    Submit a solution
                                                </button>
                                            </div>
                                        ) : (
                                            <h3>You have already submitted a solution</h3>
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* /.box-body */}
                        </div>
                        {/* /.box */}
                    </div>

                    <div className="col-md-9">
                        <div className="nav-tabs-custom">
                            <ul className="nav nav-tabs">
                                <li className='active'>
                                    <a href="#overview" data-toggle="tab">Overview</a>
                                </li>
                                <li>
                                    <a href="#teachers" data-toggle="tab">Teachers</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active" id="overview">
                                            <div className='row margin-bottom'>
                                                {this.props.course.item.avatar && (
                                                    <div className="col-sm-6 col-xs-12">
                                                        <img
                                                            className="img-responsive"
                                                            src={this.props.course.item.avatar}
                                                            alt="Course avatar picture"
                                                        />
                                                    </div>
                                                )}
                                                <div className="col-md-3 col-sm-6 col-xs-12">
                                                    <div className="info-box">
                                                <span className="info-box-icon bg-green">
                                                  <i className="ion-ios-information-outline"/>
                                                </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Assignments</span>
                                                            <span className="info-box-number">
                                                    {this.props.course.item.assignmentCount}
                                                    </span>
                                                        </div>
                                                        {/* /.info-box-content */}
                                                    </div>
                                                    <div className="info-box">
                                                <span className="info-box-icon bg-green">
                                                  <i className="ion ion-ios-book-outline"/>
                                                </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Lectures</span>
                                                            <span className="info-box-number">
                                                      {this.props.course.item.lectureCount}
                                                    </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3 col-sm-6 col-xs-12">
                                                    <div className="info-box">
                                                <span className="info-box-icon bg-green">
                                                  <i className="ion ion-ios-person-outline"/>
                                                </span>
                                                        <div className="info-box-content">
                                                            <span className="info-box-text">Teachers</span>
                                                            <span className="info-box-number">
                                                      {this.props.course.item.teacherCount}
                                                    </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='post'>
                                                <span className='description'>
                                                    {this.props.course.item.description}
                                                </span>
                                            </div>
                                </div>
                                <div className="tab-pane" id="teachers">
                                    <div className="post">
                                        <h3>Our teachers</h3>
                                        <div className="row">
                                            {!this.props.course.loading &&
                                            this.props.course.item.teachers.map(teacher => (
                                                <div className="col-sm-3" key={teacher.id}>
                                                    <div className="box box-primary">
                                                        <div className="box-body box-profile">
                                                            <img
                                                                className="profile-user-img img-responsive img-circle"
                                                                src={teacher.avatar ? teacher.avatar : user2img}
                                                                alt="User profile picture"
                                                            />
                                                            <h3 className="profile-username text-center">
                                                                {teacher.name + " " + teacher.surname}
                                                            </h3>
                                                            <p className="text-muted text-center">
                                                                {teacher.tag}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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
  course: state.courses.course,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      applyToCourse,
      fetchCourse,
      addRedirect
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo);
