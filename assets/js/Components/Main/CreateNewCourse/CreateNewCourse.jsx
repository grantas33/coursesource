import React from 'react'
import PageHeader from '../../common/PageHeader'
import Datetime from 'react-datetime'
import { isLength, isBefore } from 'validator'
import { connect } from 'react-redux'
import { createCourse } from '../../../modules/courses'
import { bindActionCreators } from 'redux'
import moment from 'moment'

class CreateNewCourse extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newCourse: {
        title: '',
        description: '',
        is_public: true
      },
      editted: {
      },
    }

    this.state.validations ={...this.getValidationsObject()};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.courses.newCourse.response && !nextProps.courses.newCourse.error) {
      return {
        newCourse: {
          title: '',
          description: '',
          teacher: '1',
          start_date: '',
          duration: '',
          course: nextProps.match.params.course,
        },
        validations: {},
        editted: {
          title: false,
          start_date: false,
        },
      }
    } else {
      return prevState
    }
  }

  handleUpdateField = (name, value) => {
    this.setState(
      {
        ...this.state,
        newCourse: {
          ...this.state.newCourse,
          [name]: value,
        },
        editted: {
          ...this.state.editted,
          [name]: true,
        },
      },
      this.validateInput
    )
  }

  getValidationsObject = () => {
    let validations = {}
    if (!isLength(this.state.newCourse.title, { min: 3 })) {
      validations.title = 'The title should be at least 3 characters long'
    }
    if (!isLength(this.state.newCourse.title, { min: undefined, max: 25 })) {
      validations.title = 'The title cannot be longer than 25 characters'
    }
    if (!isLength(this.state.newCourse.description, { min: undefined, max: 2000 })) {
      validations.description = 'The description cannot be longer than 2000 characters'
    }
    return validations;
  }

  validateInput = () => {
    this.setState({
      ...this.state,
      validations: {
        ...this.getValidationsObject(),
      },
    })
  }

  render() {
    return (
      <div>
        <PageHeader
          title={'Create a new course'}
          links={[
            {
              name: 'Main',
              url: `/`,
            },
            {
              name: 'Your courses',
              url: `/main/`,
            },
          ]}
        />
        <div className="content">
          {!this.props.courses.newCourse.loading &&
            !this.props.courses.newCourse.error &&
            this.props.courses.newCourse.response &&
            this.state.submitted && (
              <div className="alert alert-success alert-dismissible">
                <button
                  type="button"
                  className="close"
                  onClick={() => this.setState({ ...this.state, submitted: false })}
                >
                  ×
                </button>
                <h4>
                  <i className="icon fa fa-check" /> Success!
                </h4>
                {this.props.courses.newCourse.response.success_message}
              </div>
            )}
          {!this.props.courses.newCourse.loading &&
            this.props.courses.newCourse.error &&
            this.props.courses.newCourse.response &&
            this.state.submitted && (
              <div className="alert alert-danger alert-dismissible">
                <button
                  type="button"
                  className="close"
                  onClick={() => this.setState({ ...this.state, submitted: false })}
                >
                  ×
                </button>
                <h4>
                  <i className="icon fa fa-ban" /> Error!
                </h4>
                {this.props.courses.newCourse.response}
              </div>
            )}
          <div className="box box-warning">
            <div className="box-header with-border">
              <h3 className="box-title">New Course</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <form role="form">
                <div
                  className={
                    'form-group' + (this.state.editted.title && this.state.validations.title ? ' has-error' : '')
                  }
                >
                  <label>Title</label>
                  <input
                    value={this.state.newCourse.title}
                    onChange={event => this.handleUpdateField('title', event.target.value)}
                    className={'form-control'}
                    placeholder="Enter ..."
                  />
                  {this.state.editted.title &&
                    this.state.validations.title && <span className="help-block">{this.state.validations.title}</span>}
                </div>

                <div className={'form-group' + (this.state.validations.description ? ' has-error' : '')}>
                  <label>Description</label>
                  <textarea
                    value={this.state.newCourse.description}
                    onChange={event => this.handleUpdateField('description', event.target.value)}
                    className={'form-control'}
                    rows={3}
                    placeholder="Enter ..."
                  />
                  {this.state.editted.description &&
                    this.state.validations.description && (
                      <span className="help-block">{this.state.validations.description}</span>
                    )}
                </div>
              </form>
            </div>

            <div className="form-group">
              <div className="radio">
                <label>
                  Visibility
                  <input type="radio" name="optionsRadios" defaultChecked={this.state.newCourse.is_public} onChange={() => 
                                                                                          this.setState({
                                                                                            ...this.state,
                                                                                            newCourse: {
                                                                                              ...this.state.newCourse,
                                                                                              is_public: true
                                                                                            }
                                                                                          })}
                  />
                    Public course
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="optionsRadios" defaultChecked={!this.state.newCourse.is_public} onChange={() => 
                                                                                          this.setState({
                                                                                            ...this.state,
                                                                                            newCourse: {
                                                                                              ...this.state.newCourse,
                                                                                              is_public: false
                                                                                            }
                                                                                          })}/>
                    Private course
                </label>
              </div>
            </div>


            <div className="box-footer">
              <button
                onClick={() => {
                  this.setState({
                    ...this.state,
                    editted: {
                      title: true,
                      description: true
                    },
                  })
                  if (
                    Object.keys(this.state.validations).filter(x => this.state.validations[x] !== null).length === 0
                  ) {
                      this.props.createCourse(this.state.newCourse)
                      this.setState({
                        ...this.state,
                        submitted: true,
                      })
                  }
                }}
                type="submit"
                className="btn btn-info pull-right"
              >
                Create
              </button>
            </div>
            {this.props.courses.newCourse.loading && (
              <div className="overlay">
                <i className="fa fa-refresh fa-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createCourse,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewCourse)
