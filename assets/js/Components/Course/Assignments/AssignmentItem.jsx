import React from 'react'
import hourglassImg from '../../../../Resources/img/Hourglass-128.png'
import checkImg from '../../../../Resources/img/check.png'
import moment from 'moment'
import Timestamp from 'react-timestamp'
import user3img from '../../../../Resources/img/user3-128x128.jpg'
import swal from "sweetalert2";
import {createAssignmentSubmission, fetchAssignmentSubmission} from "../../../modules/assignmentSubmissions";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux'
import {ROLES} from "../../../consts/userRoles";


class AssignmentItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            submission: '',
        }
    }

    componentWillMount = () => {
        if (!this.props.user.courseRole.loading && (this.props.user.courseRole.item.role === ROLES.STUDENT)) {
            this.props.fetchAssignmentSubmission(this.props.assignment.id)
        }
    }

    render(){

      return (
          <div className="row">
              <div className="col-md-12">
                  <div className="box box-widget">
                      <div className="box-header with-border">
                          <div className="user-block">
                              <img className="img-circle" src={this.props.assignment.teacher.avatar || "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"}
                                   alt="Teacher image" />
                              <span className="username">{this.props.assignment.teacher.name} {this.props.assignment.teacher.surname}</span>
                              <span className="description">{moment(this.props.assignment.creation_date).format('YYYY-MM-DD HH:mm')}</span>
                          </div>
                          {/* /.user-block */}
                          <div className="box-tools">
                              <button type="button" className="btn btn-box-tool" data-toggle="tooltip" data-original-title="Mark as read">
                                  <i className="fa fa-circle-o" />
                              </button>
                              <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                  <i className="fa fa-minus" />
                              </button>
                              <button type="button" className="btn btn-box-tool" data-widget="remove">
                                  <i className="fa fa-times" />
                              </button>
                          </div>
                          {/* /.box-tools */}
                      </div>
                      {/* /.box-header */}
                      <div className="box-body">
                          {/* post text */}
                          {moment().isBefore(this.props.assignment.deadline_date) ? (
                              <div className="callout callout-warning">
                                  <h4>{this.props.assignment.title}</h4>
                                  <h4>
                                      Deadline: <Timestamp time={new Date()} until={new Date(this.props.assignment.deadline_date)}/>
                                  </h4>
                                  <p>
                                      This assignment should be completed due to{' '}
                                      {moment(this.props.assignment.deadline_date).format('YYYY-MM-DD HH:mm:ss')}
                                  </p>
                                  {!this.props.user.courseRole.loading && (this.props.user.courseRole.item.role === ROLES.STUDENT)
                                  &&
                                  <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                          {
                                              swal({
                                                  title: this.props.assignment.title,
                                                  input: "textarea",
                                                  inputValue: this.state.submitted ? this.state.submission :
                                                      (this.props.assignmentSubmissions.item.submission ||
                                                  this.state.submission),
                                                  inputAttributes: {
                                                      autocapitalize: "off"
                                                  },
                                                  html: '<p>' + this.props.assignment.description + '</p>'+
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
                                                          title: "Are you sure? You will be able to change your submission later",
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
                                                              this.props.createAssignmentSubmission(
                                                                  this.props.assignment.id,
                                                                  {
                                                                      submission: this.state.submission
                                                                  }
                                                              );
                                                              swal(
                                                                  "Submitted!",
                                                                  '',
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
                                  </button>}
                              </div>
                          ) : (
                              <div className="callout callout-danger">
                                  <h4>{this.props.assignment.title}</h4>
                                  {this.props.assignment.is_submittable ? (
                                          <div>
                                              <h4>The deadline date for this assignment was{' '}
                                                  {moment(this.props.assignment.deadline_date).format('YYYY-MM-DD HH:mm:ss')}
                                              </h4>
                                              {!this.props.assignmentSubmissions.item.submission &&
                                              <p>You haven't submitted this assignment</p>}
                                          </div>) :
                                      (
                                          <h4>The deadline date for this assignment was{' '}
                                              {moment(this.props.assignment.deadline_date).format('YYYY-MM-DD HH:mm:ss')}
                                          </h4>
                                      )}
                              </div>
                          )}
                          <p>{this.props.assignment.description}</p>
                      </div>
                  </div>
              </div>
          </div>
      )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    assignmentSubmissions: state.assignmentSubmissions
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          createAssignmentSubmission,
          fetchAssignmentSubmission
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentItem)
