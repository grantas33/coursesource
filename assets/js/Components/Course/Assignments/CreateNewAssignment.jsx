import React from 'react';
import PageHeader from '../../common/PageHeader';
import Datetime from 'react-datetime';
import './Datetime.css';
import {isLength, isBefore} from 'validator';
import { connect } from 'react-redux';
import { createAssignment } from '../../../modules/assignments';
import { bindActionCreators } from 'redux';

class CreateNewAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAssignment: {
        title: "",
        description: "",
        teacher: "1",
        deadline_date: "",
        is_gradeable: true,
        is_submittable: true,
        course: this.props.match.params.course
      },
      validations: {},
      editted: {
        title: false,
        deadline_date: false,
        description: false
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.assignments.newresponse && !nextProps.assignments.newerror) {
      return {
        newAssignment: {
          title: "",
          description: "",
          teacher: "1",
          deadline_date: "",
          is_gradeable: true,
          is_submittable: true,
          course: nextProps.match.params.course
        },
        validations: {},
        editted: {
          title: false,
          deadline_date: false,
          description: false
        }
      }
    } else {
      return prevState;
    }
  }

  handleUpdateField = (name, value) => {
    this.setState({
      ...this.state,
      newAssignment: {
        ...this.state.newAssignment,
        [name]: value
      },
      editted: {
        ...this.state.editted,
        [name]: true
      }
    }, this.validateInput)
  }

  validateInput = () => {
    let validations = {};
    if (!isLength(this.state.newAssignment.title, {min: 3})) {
      validations.title = "The title should be at least 3 characters long";
    }
    else if (!isLength(this.state.newAssignment.title, {min: undefined, max: 25})) {
      validations.title = "The title cannot be longer than 25 characters";
    } else {
      validations.title = null;
    }
    if (!isLength(this.state.newAssignment.description, {min: undefined, max: 2000})) {
      validations.description = "The description cannot be longer than 2000 characters";
    } else {
      validations.description = null;
    }
    if (this.state.newAssignment.deadline_date === "") {
      validations.deadline_date = "The deadline date is not valid";
    } else if (isBefore(this.state.newAssignment.deadline_date.toString())) {
      validations.deadline_date = "The deadline date should be in the future"
    } else {
      validations.deadline_date = null;
    }
    this.setState({
      ...this.state,
      validations: {
        ...this.state.validations,
        ...validations
      }
    })
  }

  render () {
    return (
      <div>
        <PageHeader 
          title={"Create a new assignment"}
          links={[
            {
              name: "Home",
              url: `/course/${this.props.match.params.course}`
            },
            {
              name: "Assignments",
              url: `/course/${this.props.match.params.course}/assignments`              
            }
          ]}
        />
        <div className="content">
          {
            !this.props.assignments.newloading && 
            !this.props.assignments.newerror && 
            this.props.assignments.newresponse && 
            this.state.submitted &&
            <div className="alert alert-success alert-dismissible">
              <button type="button" className="close" onClick={() => this.setState({...this.state, submitted: false})}>×</button>
              <h4><i className="icon fa fa-check" /> Success!</h4>
              {this.props.assignments.newresponse.success_message}
            </div>
          }
          {
            !this.props.assignments.newloading && 
            this.props.assignments.newerror && 
            this.props.assignments.newresponse && 
            this.state.submitted &&
            <div className="alert alert-danger alert-dismissible">
              <button type="button" className="close" onClick={() => this.setState({...this.state, submitted: false})}>×</button>
              <h4><i className="icon fa fa-ban" /> Error!</h4>
              {this.props.assignments.newresponse.error_message}
            </div>

          }
          <div className="box box-warning">
            <div className="box-header with-border">
              <h3 className="box-title">New assignment</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <form role="form">

                <div className={"form-group" + (this.state.editted.title && this.state.validations.title ? " has-error" : "")}>
                  <label>Name</label>
                  <input value={this.state.newAssignment.title} onChange={(event) => this.handleUpdateField("title",event.target.value)} className={"form-control"} placeholder="Enter ..." />
                  {this.state.editted.title && this.state.validations.title && <span className="help-block">{this.state.validations.title}</span>}
                </div>

                <div className={"form-group" + (this.state.validations.description ? " has-error" : "")}>
                  <label>Description</label>
                  <textarea value={this.state.newAssignment.description} onChange={(event) => this.handleUpdateField("description",event.target.value)} className={"form-control"} rows={3} placeholder="Enter ..." />
                  {this.state.editted.description && this.state.validations.description && <span className="help-block">{this.state.validations.description}</span>}                
                </div>

                
                <div className="form-group">
                  <label>Teacher</label>
                  <select className="form-control" disabled>
                    <option>Lector 1</option>
                  </select>
                </div>

                <div className="form-group">
                  <div className="checkbox">
                    <label>
                      <input value={!this.state.newAssignment.is_gradeable} onClick={() => this.handleUpdateField("is_gradeable",!this.state.newAssignment.is_gradeable)} type="checkbox" />
                        Gradeable
                    </label>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input value={!this.state.newAssignment.is_submittable} onClick={() => this.handleUpdateField("is_submittable",!this.state.newAssignment.is_submittable)} type="checkbox" />                      
                        Submittable
                    </label>
                  </div>
                </div>


                <div className={"form-group" + (this.state.editted.deadline_date && this.state.validations.deadline_date ? " has-error" : "")}>
                  <label>Deadline</label>
                  <Datetime
                    value={this.state.newAssignment.deadline_date}
                    onChange={(momentdate) => {
                      if (momentdate._isValid) {
                        this.handleUpdateField("deadline_date",new Date(momentdate._d))
                      } else {
                        this.handleUpdateField("deadline_date","")
                      }
                    }}
                    timeFormat={"HH:mm"} 
                    dateFormat={"YYYY-MM-DD"} />
                  {this.state.editted.deadline_date && this.state.validations.deadline_date && <span className="help-block">{this.state.validations.deadline_date}</span>}                
                </div>
                
                <div className="form-group">
                  <label>Choose students</label>
                  <select multiple defaultValue={['1']} className="form-control" size={"10"}>
                    <option value="1">Student 1</option>
                    <option value="1">Student 2</option>
                    <option value="1">Student 3</option>
                    <option value="1">Student 4</option>
                    <option value="1">Student 5</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="box-footer">
              <button 
                onClick={() => {
                  this.setState({
                    ...this.state,
                    editted: {
                      title: true,
                      description: true,
                      deadline_date: true
                    }
                  });
                  if (Object.keys(this.state.validations).filter(x => this.state.validations[x] !== null).length === 0) {
                    this.props.createAssignment(this.state.newAssignment)
                    this.setState({
                      ...this.state,
                      submitted: true
                    })
                  }
                }}
                type="submit" 
                className="btn btn-info pull-right">Create</button>
            </div>
            {this.props.assignments.newloading &&
              <div className="overlay">
                <i className="fa fa-refresh fa-spin" />
              </div>
            }
          </div>
        </div>
      </div>
   )
  }
};

const mapStateToProps = state => ({
  assignments: state.assignments
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createAssignment
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewAssignment)
