import React from "react";
import PageHeader from "../../common/PageHeader";
import Datetime from "react-datetime";
import { isLength, isBefore } from "validator";
import { connect } from "react-redux";
import { createCourse } from "../../../modules/courses";
import { bindActionCreators } from "redux";
import moment from "moment";
import FileBase64 from "react-file-base64";

class CreateNewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCourse: {
        title: "",
        description: "",
        slogan: "",
        avatar: "",
        is_submittable: false,
        location: "",
        start_date: "",
        schedule_overview: "",
        entry_task_submission: "",
        entry_task_deadline: ""
      },
      editted: {}
    };

    this.state.validations = { ...this.getValidationsObject() };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.courses.newCourse.response &&
      !nextProps.courses.newCourse.error
    ) {
      return {
        newCourse: {
          title: "",
          description: "",
          slogan: "",
          course: nextProps.match.params.course
        },
        validations: {},
        editted: {
          title: false
        }
      };
    } else {
      return prevState;
    }
  }

  handleUpdateField = (name, value) => {
    this.setState(
      {
        ...this.state,
        newCourse: {
          ...this.state.newCourse,
          [name]: value
        },
        editted: {
          ...this.state.editted,
          [name]: true
        }
      },
      this.validateInput
    );
  };

  getValidationsObject = () => {
    let validations = {};
    if (!isLength(this.state.newCourse.title, { min: 3 })) {
      validations.title = "The title should be at least 3 characters long";
    }
    if (!isLength(this.state.newCourse.title, { min: undefined, max: 25 })) {
      validations.title = "The title cannot be longer than 25 characters";
    }
    if (
      !isLength(this.state.newCourse.description, { min: undefined, max: 2000 })
    ) {
      validations.description =
        "The description cannot be longer than 2000 characters";
    }
    if (
      !isLength(this.state.newCourse.slogan, {
        min: undefined,
        max: 150
      })
    ) {
      validations.slogan = "The slogan cannot be longer than 150 characters";
    }
    if (
        !isLength(this.state.newCourse.location, {
            min: undefined,
            max: 80
        })
    ) {
        validations.location = "The location cannot be longer than 80 characters";
    }
    if (
        !isLength(this.state.newCourse.schedule_overview, {
            min: undefined,
            max: 200
        })
    ) {
        validations.location = "The schedule overview cannot be longer than 200 characters";
    }

    return validations;
  };

  validateInput = () => {
    this.setState({
      ...this.state,
      validations: {
        ...this.getValidationsObject()
      }
    });
  };

  render() {
    return (
      <div>
        <PageHeader
          title={"Create a new course"}
          links={[
            {
              name: "Main",
              url: `/`
            },
            {
              name: "My courses",
              url: `/main/my-courses`
            }
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
                  onClick={() =>
                    this.setState({ ...this.state, submitted: false })
                  }
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
                  onClick={() =>
                    this.setState({ ...this.state, submitted: false })
                  }
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
            <div className="box-body">
              <form role="form">
                <div
                  className={
                    "form-group" +
                    (this.state.editted.title && this.state.validations.title
                      ? " has-error"
                      : "")
                  }
                >
                  <label>Title</label>
                  <input
                    value={this.state.newCourse.title}
                    onChange={event =>
                      this.handleUpdateField("title", event.target.value)
                    }
                    className={"form-control"}
                    placeholder="Enter ..."
                  />
                  {this.state.editted.title &&
                    this.state.validations.title && (
                      <span className="help-block">
                        {this.state.validations.title}
                      </span>
                    )}
                </div>

                <div
                  className={
                    "form-group" +
                    (this.state.validations.description ? " has-error" : "")
                  }
                >
                  <label>Description</label>
                  <textarea
                    value={this.state.newCourse.description}
                    onChange={event =>
                      this.handleUpdateField("description", event.target.value)
                    }
                    className={"form-control"}
                    rows={3}
                    placeholder="Enter ..."
                  />
                  {this.state.editted.description &&
                    this.state.validations.description && (
                      <span className="help-block">
                        {this.state.validations.description}
                      </span>
                    )}
                </div>

                <div
                  className={
                    "form-group" +
                    (this.state.validations.slogan ? " has-error" : "")
                  }
                >
                  <label>Slogan</label>
                  <textarea
                    value={this.state.newCourse.slogan}
                    onChange={event =>
                      this.handleUpdateField("slogan", event.target.value)
                    }
                    className={"form-control"}
                    rows={1}
                    placeholder="Enter ..."
                  />
                  {this.state.editted.slogan &&
                    this.state.validations.slogan && (
                      <span className="help-block">
                        {this.state.validations.slogan}
                      </span>
                    )}
                </div>
                <div
                  className={
                    "form-group" +
                    (this.state.validations.avatar ? " has-error" : "")
                  }
                >
                  <label>Image</label>
                  {this.state.newCourse.avatar !== "" && (
                    <img
                      style={{ display: "block" }}
                      width="100 px"
                      src={this.state.newCourse.avatar}
                    />
                  )}
                  <FileBase64
                    multiple={false}
                    onDone={file => {
                      if (file.type === "image/png" || file.type === "image/jpeg") {
                        this.handleUpdateField("avatar", file.base64);
                      } else {
                        this.handleUpdateField("avatar", "");
                        this.setState({
                          ...this.state,
                          validations: {
                            ...this.state.validations,
                            avatar: "Please upload valid photo under 5MB"
                          }
                        });
                      }
                    }}
                  />
                    {this.state.editted.avatar &&
                    this.state.validations.avatar && (
                        <span className="help-block">
                        {this.state.validations.avatar}
                      </span>
                    )}
                </div>

                <div
                    className={
                        "form-group" +
                        (this.state.validations.location ? " has-error" : "")
                    }
                >
                    <label>Location</label>
                    <textarea
                        value={this.state.newCourse.location}
                        onChange={event =>
                            this.handleUpdateField("location", event.target.value)
                        }
                        className={"form-control"}
                        rows={1}
                        placeholder="Enter ..."
                    />
                    {this.state.editted.location &&
                    this.state.validations.location && (
                        <span className="help-block">
                      {this.state.validations.location}
                    </span>
                    )}
                </div>

                <div
                    className={
                        "form-group" +
                        (this.state.editted.start_date &&
                        this.state.validations.start_date
                            ? " has-error"
                            : "")
                    }
                >
                    <label>Start date</label>
                    <Datetime
                        value={this.state.newCourse.start_date}
                        onChange={momentdate => {
                            if (momentdate._isValid) {
                                this.handleUpdateField(
                                    "start_date",
                                    new Date(momentdate._d)
                                );
                            } else {
                                this.handleUpdateField("start_date", "");
                            }
                        }}
                        timeFormat={"HH:mm"}
                        dateFormat={"YYYY-MM-DD"}
                    />
                    {this.state.editted.start_date &&
                    this.state.validations.start_date && (
                        <span className="help-block">
                        {this.state.validations.start_date}
                      </span>
                    )}
                </div>

                <div
                    className={
                        "form-group" +
                        (this.state.validations.schedule_overview ? " has-error" : "")
                    }
                >
                    <label>Schedule overview</label>
                    <textarea
                        value={this.state.newCourse.schedule_overview}
                        onChange={event =>
                            this.handleUpdateField("schedule_overview", event.target.value)
                        }
                        className={"form-control"}
                        rows={2}
                        placeholder="Enter ..."
                    />
                    {this.state.editted.schedule_overview &&
                    this.state.validations.schedule_overview && (
                        <span className="help-block">
                    {this.state.validations.schedule_overview}
                  </span>
                    )}
                </div>

                <button
                  className="btn btn-primary"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({
                      ...this.state,
                      newCourse: {
                        ...this.state.newCourse,
                        is_submittable: !this.state.newCourse.is_submittable
                      }
                    });
                  }}
                >
                  {this.state.newCourse.is_submittable === true
                    ? "Remove"
                    : "Add"}{" "}
                  application task
                </button>

                {this.state.newCourse.is_submittable && (
                  <div
                    className={
                      "form-group" +
                      (this.state.validations.entry_task_submission
                        ? " has-error"
                        : "")
                    }
                  >
                    <label>Application task description</label>
                    <textarea
                      value={this.state.newCourse.entry_task_submission}
                      onChange={event =>
                        this.handleUpdateField(
                          "entry_task_submission",
                          event.target.value
                        )
                      }
                      className={"form-control"}
                      rows={3}
                      placeholder="Enter ..."
                    />
                    {this.state.editted.entry_task_submission &&
                      this.state.validations.entry_task_submission && (
                        <span className="help-block">
                          {this.state.validations.entry_task_submission}
                        </span>
                      )}
                  </div>
                )}

                {this.state.newCourse.is_submittable && (
                  <div
                    className={
                      "form-group" +
                      (this.state.editted.entry_task_deadline &&
                      this.state.validations.entry_task_deadline
                        ? " has-error"
                        : "")
                    }
                  >
                    <label>Application deadline</label>
                    <Datetime
                      value={this.state.newCourse.entry_task_deadline}
                      onChange={momentdate => {
                        if (momentdate._isValid) {
                          this.handleUpdateField(
                            "entry_task_deadline",
                            new Date(momentdate._d)
                          );
                        } else {
                          this.handleUpdateField("entry_task_deadline", "");
                        }
                      }}
                      timeFormat={"HH:mm"}
                      dateFormat={"YYYY-MM-DD"}
                    />
                    {this.state.editted.entry_task_deadline &&
                      this.state.validations.entry_task_deadline && (
                        <span className="help-block">
                          {this.state.validations.entry_task_deadline}
                        </span>
                      )}
                  </div>
                )}

                {this.state.editted.avatar &&
                  this.state.validations.avatar && (
                    <span className="help-block">
                      {this.state.validations.avatar}
                    </span>
                  )}
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
                      slogan: true
                    }
                  });
                  if (
                    Object.keys(this.state.validations).filter(
                      x => this.state.validations[x] !== null
                    ).length === 0
                  ) {
                    this.props.createCourse(
                      this.state.newCourse.is_submittable===true
                        ? {
                            title: this.state.newCourse.title,
                            description: this.state.newCourse.description,
                            slogan: this.state.newCourse.slogan,
                            is_submittable: this.state.newCourse.is_submittable,
                            avatar: this.state.newCourse.avatar,
                            location: this.state.newCourse.location,
                            start_date: this.state.newCourse.start_date,
                            schedule_overview: this.state.newCourse.schedule_overview,
                            entry_task: {
                              description: this.state.newCourse
                                .entry_task_submission,
                              deadlineDate: this.state.newCourse
                                .entry_task_deadline
                            }
                          }
                        : {
                            title: this.state.newCourse.title,
                            description: this.state.newCourse.description,
                            slogan: this.state.newCourse.slogan,
                            is_submittable: this.state.newCourse.is_submittable,
                            avatar: this.state.newCourse.avatar,
                            location: this.state.newCourse.location,
                            start_date: this.state.newCourse.start_date,
                            schedule_overview: this.state.newCourse.schedule_overview
                          }
                    );
                    this.setState({
                      ...this.state,
                      submitted: true
                    });
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
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createCourse
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewCourse);
