import React from 'react';
import './CreateNewCourse.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createCourse, clearState } from '../../../modules/courses';
import { withRouter } from "react-router-dom";

class CreateNewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCourse: {
        title: '',
        description: ''
      },
      submitted: false,
      editted: false
    }
  }

  updateInputData = (event) => {
    this.setState({
      ...this.state,
      newCourse: {
        ...this.state.newCourse,
        [event.target.name]: event.target.value
      },
      editted: true,
      submitted: false
    })
  }

  handleButton = () => {
    this.props.createCourse(this.state.newCourse);
    this.setState({
      ...this.state,
      submitted: true
    })
  }

  componentWillUnmount = () => {
    this.props.clearState();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.submitted && !nextProps.newCourse.error && !nextProps.newCourse.loading) {
      this.props.history.push("/course/" + 1);
    }
  }

  render() {
    console.log(this.props.newCourse);
    if (this.props.newCourse.loading === true) {
      return <h3>Loading...</h3>
    }
    return (
      <div className="landing-page-container">
        <h1 className="">Create a new course</h1>
        <input className="form-input" name="title" placeholder="Title" value={this.state.newCourse.title} onChange={this.updateInputData}/>
        {this.state.editted && this.state.newCourse.title.length < 3 ? <span className="validaton-error">The title should be at least 3 characters long</span> : <span />}
        {this.state.editted && this.state.newCourse.title.length > 25 ? <span className="validaton-error">The title cannot be longer than 25 characters</span> : <span />}
        <br />

        <input className="form-input" name="description" placeholder="Description" value={this.state.newCourse.description} onChange={this.updateInputData}/>
        {this.state.editted && this.state.newCourse.description.length > 2000 ? <span className="validaton-error">The title cannot be longer than 2000 characters</span> : <span />}
        <br />
        
        <input className="login-register-button" type="button" value="Create" onClick={this.handleButton}/>
        {(this.state.submitted && this.props.newCourse.loading === false && this.props.newCourse.error === true) ?
          <h3 className="validaton-error">Error: {this.props.newCourse.response}</h3> : <span />}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  newCourse: state.courses.newCourse
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createCourse,
  clearState
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewCourse))
