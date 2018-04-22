import React from 'react'
import PageHeader from '../../common/PageHeader'
import Datetime from 'react-datetime'
import './Datetime.css'
import { isLength, isBefore } from 'validator'
import { connect } from 'react-redux'
import { createLecture } from '../../../modules/lectures'
import { bindActionCreators } from 'redux'
import moment from 'moment'

class CreateNewLecture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newLecture: {
        title: '',
        description: '',
        teacher: '1',
        start_date: '',
        duration: '',
        course: this.props.match.params.course,
      },
      validations: {},
      editted: {
        title: false,
        start_date: false,
      },
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.lectures.newresponse && !nextProps.lectures.newerror) {
      return {
        newLecture: {
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
        newLecture: {
          ...this.state.newLecture,
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

  validateInput = () => {
    let validations = {}
    if (!isLength(this.state.newLecture.title, { min: 3 })) {
      validations.title = 'The title should be at least 3 characters long'
    }
    if (!isLength(this.state.newLecture.title, { min: undefined, max: 25 })) {
      validations.title = 'The title cannot be longer than 25 characters'
    }
    if (!isLength(this.state.newLecture.description, { min: undefined, max: 2000 })) {
      validations.description = 'The description cannot be longer than 2000 characters'
    }
    if (this.state.newLecture.start_date === '') {
      validations.start_date = 'The start date is not valid'
    } else if (isBefore(this.state.newLecture.start_date.toString())) {
      validations.start_date = 'The start date should be in the future'
    }
    this.setState({
      ...this.state,
      validations: {
        ...validations,
      },
    })
  }

  render() {
    return (
      <div>
        <PageHeader
          title={'Create a new lecture'}
          links={[
            {
              name: 'Home',
              url: `/course/${this.props.match.params.course}`,
            },
            {
              name: 'Lectures',
              url: `/course/${this.props.match.params.course}/lectures`,
            },
          ]}
        />
        <div className="content">
          {!this.props.lectures.newloading &&
            !this.props.lectures.newerror &&
            this.props.lectures.newresponse &&
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
                {this.props.lectures.newresponse.success_message}
              </div>
            )}
          {!this.props.lectures.newloading &&
            this.props.lectures.newerror &&
            this.props.lectures.newresponse &&
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
                {this.props.lectures.newresponse.error_message}
              </div>
            )}
          <div className="box box-warning">
            <div className="box-header with-border">
              <h3 className="box-title">New lecture</h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <form role="form">
                <div
                  className={
                    'form-group' + (this.state.editted.title && this.state.validations.title ? ' has-error' : '')
                  }
                >
                  <label>Name</label>
                  <input
                    value={this.state.newLecture.title}
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
                    value={this.state.newLecture.description}
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

                <div className="form-group">
                  <label>Teacher</label>
                  <select className="form-control" disabled>
                    <option>Lector 1</option>
                  </select>
                </div>

                <div
                  className={
                    'form-group' +
                    (this.state.editted.start_date && this.state.validations.start_date ? ' has-error' : '')
                  }
                >
                  <label>Start Date</label>
                  <Datetime
                    value={this.state.newLecture.start_date}
                    onChange={momentdate => {
                      if (momentdate._isValid) {
                        this.handleUpdateField('start_date', new Date(momentdate._d))
                      } else {
                        this.handleUpdateField('start_date', '')
                      }
                    }}
                    timeFormat={'HH:mm'}
                    dateFormat={'YYYY-MM-DD'}
                  />
                  {this.state.editted.start_date &&
                    this.state.validations.start_date && (
                      <span className="help-block">{this.state.validations.start_date}</span>
                    )}
                </div>

                <div className={'form-group'}>
                  <label>Duration</label>
                  <Datetime
                    value={this.state.newLecture.duration}
                    onChange={momentdate => {
                      if (momentdate._isValid) {
                        this.handleUpdateField('duration', new Date(momentdate._d))
                      }
                    }}
                    timeFormat={'HH:mm'}
                    dateFormat={false}
                  />
                  {this.state.editted.start_date &&
                    this.state.validations.start_date && (
                      <span className="help-block">{this.state.validations.start_date}</span>
                    )}
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
                      start_date: true,
                    },
                  })
                  if (
                    Object.keys(this.state.validations).filter(x => this.state.validations[x] !== null).length === 0
                  ) {
                    let lectureObject = {
                      ...this.state.newLecture,
                      end_date: moment(this.state.newLecture.start_date)
                        .add(moment(this.state.newLecture.duration).hours(), 'hours')
                        .add(moment(this.state.newLecture.duration).minutes(), 'minutes'),
                    }
                    delete lectureObject.duration
                    this.props.createLecture(lectureObject)
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
            {this.props.lectures.newloading && (
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
  lectures: state.lectures,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createLecture,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewLecture)
