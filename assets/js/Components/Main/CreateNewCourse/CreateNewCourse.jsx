import React from 'react';
import './CreateNewCourse.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createCourse } from '../../../modules/courses';
import { withRouter } from "react-router-dom";

class CreateNewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCourse: {
        title: '',
        description: ''
      },
      submitted: false
    }
  }

  updateInputData = (event) => {
    this.setState({
      newCourse: {
        ...this.state.newCourse,
        [event.target.name]: event.target.value
      }
    })
  }

  handleButton = () => {
    this.props.createCourse(this.state.newCourse);
    this.setState({
      ...this.state,
      submitted: true
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.submitted && !nextProps.newCourse.error && !nextProps.newCourse.loading) {
      this.props.history.push("/courses/" + 1);
    }
  }

  render() {
    if (this.props.newCourse.loading === true) {
      return <h3>Loading...</h3>
    } else if (this.props.newCourse.loading === false && this.props.newCourse.error === true) {
      return <h3>Error: {this.props.newCourse.reponse}</h3>
    }
    return (
      <div className="landing-page-container">
        <h1 className="">Create a new course</h1>
        <input className="form-input" name="title" placeholder="Title" value={this.state.newCourse.title} onChange={this.updateInputData}/>
        <input className="form-input" name="description" placeholder="Description" value={this.state.newCourse.description} onChange={this.updateInputData}/>
        <input className="login-register-button" type="button" value="Create" onClick={this.handleButton}/>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  newCourse: state.courses.newCourse
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createCourse
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewCourse))
