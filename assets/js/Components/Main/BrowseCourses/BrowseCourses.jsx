import React from 'react'
import BrowseCourseItem from './BrowseCourseItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCourses } from '../../../modules/courses'
import { Link } from 'react-router-dom'
import PageHeader from '../../common/PageHeader';


class BrowseCourses extends React.Component {
  componentWillMount() {
    this.props.fetchCourses()
  }

  render() {
    if (this.props.courses.loading === true) {
      return <h3>Loading...</h3>
    } else if (this.props.courses.loading === false && this.props.courses.error === true) {
      return <h3>Error</h3>
    }
    return (
      <div>
        <PageHeader
          title={'Browse courses'}
          links={[
            {
              name: 'Home',
              url: `/`,
            },
          ]}
        />
        <div className="content">
          <div className="row">
              {this.props.courses.items.map((course, i) => (
                <div className="col-md-12" key={i}>
                <BrowseCourseItem key={course.id} course={course} />
              </div>
              ))}
          </div>
        </div>
        <h3> Are you a mentor? </h3>
        <div className="row col-sm-3">
        <Link to="/main/create-new-course">
          <button type="button" className="btn btn-block btn-primary">Create new course</button>
        </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courses: state.courses.allCourses,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCourses,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCourses)
