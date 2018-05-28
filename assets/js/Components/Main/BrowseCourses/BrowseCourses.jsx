import React from "react";
import BrowseCourseItem from "./BrowseCourseItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBrowseCourses } from "../../../modules/courses";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import debounce from "debounce";

class BrowseCourses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: "creationDate",
      searchQuery: ""
    };
    this.fetchBrowseCourses = debounce(() => this.props.fetchBrowseCourses(this.state.sortBy, this.state.searchQuery), 500);
  }
  componentWillMount() {
    this.props.fetchBrowseCourses("creationDate");
  }

  render() {
    let content;
    if (this.props.courses.loading === true) {
      content = <h3>Loading...</h3>;
    } else if (
      this.props.courses.loading === false &&
      this.props.courses.error === true
    ) {
      content = <h3>Error</h3>;
    } else {
      content = this.props.courses.items.map((course, i) => (
        <div className="col-md-6" key={i}>
          <BrowseCourseItem key={course.id} course={course} />
        </div>
      ))
    }
    return (
      <div>
        <PageHeader
          title={"Browse courses"}
          links={[
            {
              name: "Home",
              url: `/`
            }
          ]}
        />
        <div className="content">
          <div className="box-header with-border">
            <select
              onClick={e =>
                this.setState(
                  { ...this.state, sortBy: e.target.value },
                  this.fetchBrowseCourses
                )
              }
              defaultValue="0"
              className="input-sm"
            >
              <option value="0" disabled>
                Sort by
              </option>
              <option value="creationDate">Creation date</option>
              <option value="teacherCount">Mentors count</option>
              <option value="assignmentCount">Assignments count</option>
              <option value="lecturesCount">Lectures count</option>
            </select>
            <div className="pull-right">
              <div className="has-feedback">
                <input
                  onChange={e =>
                    this.setState(
                      { ...this.state, searchQuery: e.target.value },
                      this.fetchBrowseCourses
                    )
                  }
                  type="text"
                  className="form-control input-sm"
                  placeholder="Search Courses"
                />
                <span className="glyphicon glyphicon-search form-control-feedback" />
              </div>
            </div>
          </div>

          <div className="row">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses.allBrowseCourses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBrowseCourses
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCourses);
