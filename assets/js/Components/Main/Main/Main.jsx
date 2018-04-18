import React from 'react';
import CourseItem from './CourseItem';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCourses } from '../../../modules/courses';
import { Link } from 'react-router-dom';

class Main extends React.Component {
  componentWillMount() {
    this.props.fetchCourses();
  }

  render() {
    if (this.props.courses.loading === true) {
      return <h3>Loading...</h3>
    } else if (this.props.courses.loading === false && this.props.courses.error === true) {
      return <h3>Error</h3>
    }
    return(
      <div className="landing-page-container">
        <h1 className="">Get back to learning!</h1>
        <h3>Your Coursesource courses:</h3>
        <div className="landing-page-container">
          {this.props.courses.items.map(course => <CourseItem key={course.id}
                                                      id={course.id}
                                                      title={course.title}
                                                      description={course.description}
                                                    />
          )}
        </div>
        <h3> Are you a mentor? </h3>
        <Link to="/main/create-new-course"><input className="login-register-button" type="button" value="Create new course"/></Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courses: state.courses.allCourses,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCourses
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)