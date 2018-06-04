import React from "react";
import BrowseCourseItem from "./BrowseCourseItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBrowseCourses } from "../../../modules/courses";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import debounce from "debounce";
import InfiniteScroll from "react-infinite-scroller";

class BrowseCourses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: "creationDate",
      searchQuery: "",
      page: 1
    };
    this.fetchBrowseCourses = debounce(
      () =>
        this.props.fetchBrowseCourses(
          this.state.sortBy,
          this.state.searchQuery,
          0,
          10
        ),
      500
    );
  }
  componentWillMount() {
    this.props.fetchBrowseCourses("creationDate",null,0,10);
  }

  render() {
    let content;
    if (
      this.props.courses.loading === false &&
      this.props.courses.error === true
    ) {
      content = <h3>Error</h3>;
    } else {
      content = this.props.courses.items.map(course => (
        <div className="col-md-6" key={course.id}>
          <BrowseCourseItem course={course} />
        </div>
      ));
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
                  { ...this.state, sortBy: e.target.value, page: 1 },
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
              <option value="teacherCount">Teacher count</option>
              <option value="assignmentCount">Assignment count</option>
              <option value="lectureCount">Lecture count</option>
            </select>
            <div className="pull-right">
              <div className="has-feedback">
                <input
                  onChange={e =>
                    this.setState(
                      { ...this.state, searchQuery: e.target.value, page: 1 },
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
            <InfiniteScroll
              pageStart={1}
              loadMore={() => {
                let page = this.state.page+1;
                this.setState({...this.state, page})
                this.props.fetchBrowseCourses(this.state.sortBy, this.state.searchQuery, page*5, 5)}}
              hasMore={this.props.courses.hasMore}
              threshold={100}
              initialLoad={false}
              loader={
                ""
              }
            >
              {content}
            </InfiniteScroll>
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
