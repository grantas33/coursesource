import axios from "axios";
import history from "../store";

export const FETCH_MYCOURSES_STARTED = "courses/FETCH_MYCOURSES_STARTED";
export const FETCH_MYCOURSES_ERROR = "courses/FETCH_MYCOURSES_ERROR";
export const FETCH_MYCOURSES_RECEIVED = "courses/FETCH_MYCOURSES_RECEIVED";

export const FETCH_COURSEENTRYTASK_RECEIVED = "courses/FETCH_COURSEENTRYTASK_RECEIVED";

export const FETCH_BROWSECOURSES_STARTED = "courses/FETCH_BROWSECOURSES_STARTED";
export const FETCH_BROWSECOURSES_ERROR = "courses/FETCH_BROWSECOURSES_ERROR";
export const FETCH_BROWSECOURSES_RECEIVED = "courses/FETCH_BROWSECOURSES_RECEIVED";

export const APPLY_TO_COURSE_STARTED = "courses/APPLY_TO_COURSE_STARTED";
export const APPLY_TO_COURSE_ERROR = "courses/APPLY_TO_COURSE_ERROR";
export const APPLY_TO_COURSE_RECEIVED = "courses/APPLY_TO_COURSE_RECEIVED";

export const FETCH_COURSE_STARTED = "courses/FETCH_COURSE_STARTED";
export const FETCH_COURSE_ERROR = "courses/FETCH_COURSE_ERROR";
export const FETCH_COURSE_RECEIVED = "courses/FETCH_COURSE_RECEIVED";

export const CREATE_COURSE_STARTED = "courses/CREATE_COURSE_STARTED";
export const CREATE_COURSE_ERROR = "courses/CREATE_COURSE_ERROR";
export const CREATE_COURSE_RECEIVED = "courses/CREATE_COURSE_RECEIVED";
export const CLEAR_CREATE_COURSE = "courses/CLEAR_CREATE_COURSE";

axios.defaults.baseURL = "/";

const initialState = {
  course: {
    item: {},
    loading: true,
    error: false
  },
  allMyCourses: {
    courses: [],
    loading: true,
    error: false
  },
  allBrowseCourses: {
    courses: [],
    loading: true,
    error: false
  },
  newCourse: {
    response: "",
    loading: false,
    error: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MYCOURSES_STARTED:
      return {
        ...state,
        allMyCourses: {
          loading: true
        }
      };
    case FETCH_MYCOURSES_ERROR:
      return {
        ...state,
        allMyCourses: {
          loading: false,
          error: true
        }
      };
    case FETCH_MYCOURSES_RECEIVED:
      return {
        ...state,
        allMyCourses: {
          loading: false,
          error: false,
          items: action.payload
        }
      };

    case FETCH_BROWSECOURSES_STARTED:
      return {
        ...state,
        allBrowseCourses: {
          loading: true
        }
      };
    case FETCH_BROWSECOURSES_ERROR:
      return {
        ...state,
        allBrowseCourses: {
          loading: false,
          error: true
        }
      };
    case FETCH_BROWSECOURSES_RECEIVED:
      return {
        ...state,
        allBrowseCourses: {
          loading: false,
          error: false,
          items: action.payload
        }
      };

    case FETCH_COURSE_STARTED:
      return {
        ...state,
        course: {
          loading: true
        }
      };
    case FETCH_COURSE_ERROR:
      return {
        ...state,
        course: {
          loading: false,
          error: true
        }
      };
    case FETCH_COURSE_RECEIVED:
      return {
        ...state,
        course: {
          loading: false,
          error: false,
          item: action.payload
        }
      };
    case CREATE_COURSE_STARTED:
      return {
        ...state,
        newCourse: {
          loading: true
        }
      };
    case CREATE_COURSE_ERROR:
      return {
        ...state,
        newCourse: {
          loading: false,
          error: true,
          response: action.payload
        }
      };
    case CREATE_COURSE_RECEIVED:
      return {
        ...state,
        newCourse: {
          loading: false,
          error: false,
          response: action.payload
        }
      };
    case CLEAR_CREATE_COURSE: {
      return {
        ...state,
        newCourse: {
          ...initialState.newCourse
        }
      };
    }
    case FETCH_COURSEENTRYTASK_RECEIVED: {
      return {
        ...state,
        newCourse: {
          ...this.state.newCourse,
          ...action.payload
        }
      };
    }
    default:
      return state;
  }
};

export const fetchCourse = courseId => dispatch => {
  dispatch({
    type: FETCH_COURSE_STARTED
  });
  axios
    .get(`api/courses/get/${courseId}`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_COURSE_RECEIVED,
        payload: res.data[0]
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: FETCH_COURSE_ERROR
      });
    });
  axios
    .get(`api/entrytasks/${courseId}`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      if (
        res.data.error_message === "This course does not have an entry task"
      ) {
        dispatch({
          type: FETCH_COURSEENTRYTASK_RECEIVED,
          payload: null
        });
      } else {
        dispatch({
          type: FETCH_COURSEENTRYTASK_RECEIVED,
          payload: res.data
        });
      }
    });
};

export const applyToCourse = (courseId, object) => dispatch => {
  dispatch({
    type: APPLY_TO_COURSE_STARTED
  });
  axios
    .post(`api/courses/${courseId}/apply`, object, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: APPLY_TO_COURSE_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: APPLY_TO_COURSE_ERROR,
        payload: res.data
      });
    });
};

export const fetchMyCourses = () => dispatch => {
  dispatch({
    type: FETCH_MYCOURSES_STARTED
  });
  axios
    .get(`api/courses/my`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_MYCOURSES_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: FETCH_MYCOURSES_ERROR
      });
    });
};

export const fetchBrowseCourses = () => dispatch => {
  dispatch({
    type: FETCH_BROWSECOURSES_STARTED
  });
  let loggedIn = window.localStorage.getItem("userToken");
  axios
    .get(
      "api/courses/" + (loggedIn ? "browse" : "public"),
      loggedIn
        ? {
            headers: {
              Authorization:
                "Bearer " + window.localStorage.getItem("userToken")
            }
          }
        : {}
    )
    .then(res => {
      dispatch({
        type: FETCH_BROWSECOURSES_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: FETCH_BROWSECOURSES_ERROR
      });
    });
};

export const createCourse = newCourse => dispatch => {
  dispatch({
    type: CREATE_COURSE_STARTED
  });
  axios
    .post("api/courses", newCourse, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: CREATE_COURSE_RECEIVED,
        payload: res.data
      });
      dispatch(push("/course/3"));
    })
    .catch(err => {
      if (err.response && err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: CREATE_COURSE_ERROR,
        payload: err.response
          ? err.response.data.error_message.title
          : "Unknown error"
      });
    });
};

export const clearState = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_COURSE
  });
};
