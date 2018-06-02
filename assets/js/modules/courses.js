import axios from "axios";
import history from "../store";
import tokenObject from "../tokenObject";

export const FETCH_MYCOURSES_STARTED = "courses/FETCH_MYCOURSES_STARTED";
export const FETCH_MYCOURSES_ERROR = "courses/FETCH_MYCOURSES_ERROR";
export const FETCH_MYCOURSES_RECEIVED = "courses/FETCH_MYCOURSES_RECEIVED";

export const FETCH_COURSEENTRYTASK_RECEIVED =
  "courses/FETCH_COURSEENTRYTASK_RECEIVED";
export const FETCH_COURSEENTRYTASK_ERROR =
  "courses/FETCH_COURSEENTRYTASK_ERROR";

export const FETCH_USERENTRYTASK_RECEIVED =
  "courses/FETCH_USERENTRYTASK_RECEIVED";
export const FETCH_USERENTRYTASK_ERROR = "courses/FETCH_USERENTRYTASK_ERROR";

export const FETCH_BROWSECOURSES_STARTED =
  "courses/FETCH_BROWSECOURSES_STARTED";
export const FETCH_BROWSECOURSES_ERROR = "courses/FETCH_BROWSECOURSES_ERROR";
export const FETCH_BROWSECOURSES_RECEIVED =
  "courses/FETCH_BROWSECOURSES_RECEIVED";

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

export const ACCEPT_RECEIVED = "courses/ACCEPT_RECEIVED";
export const DECLINE_RECEIVED = "courses/DECLINE_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  course: {
    item: {},
    courseLoading: true,
    error: false,
    entryTaskLoading: true,
    userSubmittedLoading: true,
    userSubmitted: false
  },
  allMyCourses: {
    items: [],
    loading: true,
    error: false
  },
  allBrowseCourses: {
    items: [],
    loading: true,
    error: false,
    hasMore: true
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
          loading: true,
          items: []
        }
      };
    case FETCH_MYCOURSES_ERROR:
      return {
        ...state,
        allMyCourses: {
          ...state.allMyCourses,
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
          ...state.allBrowseCourses,
          loading: true,
          hasMore: false
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
    {
      console.log(state.allBrowseCourses.items.length + action.payload.length) 
      return {
        ...state,
        allBrowseCourses: {
          loading: false,
          error: false,
          items: action.delete
            ? action.payload
            : [...state.allBrowseCourses.items, ...action.payload],
          hasMore: action.payload.length > 0
        }
      };
    }
    case FETCH_COURSE_STARTED:
      return {
        ...state,
        course: {
          ...state.course,
          courseLoading: true,
          entryTaskLoading: true,
          userSubmittedLoading: true,
          userSubmitted: false
        }
      };
    case FETCH_COURSE_ERROR:
      return {
        ...state,
        course: {
          ...state.course,
          courseLoading: false,
          error: true,
          entryTaskLoading: false,
          userSubmittedLoading: false
        }
      };
    case FETCH_COURSE_RECEIVED:
      return {
        ...state,
        course: {
          ...state.course,
          courseLoading: false,
          error: false,
          item: {
            ...state.course.item,
            ...action.payload
          }
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
        course: {
          ...state.course,
          entryTaskLoading: false,
          item: {
            ...state.course.item,
            entryTask: action.payload
          }
        }
      };
    }
    case FETCH_COURSEENTRYTASK_ERROR: {
      return {
        ...state,
        course: {
          ...state.course,
          entryTaskLoading: false
        }
      };
    }
    case FETCH_USERENTRYTASK_RECEIVED: {
      return {
        ...state,
        course: {
          ...state.course,
          userSubmittedLoading: false,
          userSubmitted: true
        }
      };
    }
    case FETCH_USERENTRYTASK_ERROR: {
      return {
        ...state,
        course: {
          ...state.course,
          userSubmittedLoading: false
        }
      };
    }
    default:
      return state;
  }
};

export const fetchMyCourses = () => dispatch => {
  dispatch({
    type: FETCH_MYCOURSES_STARTED
  });
  axios
    .get(`api/courses/my`, tokenObject())
    .then(res => {
      dispatch({
        type: FETCH_MYCOURSES_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_MYCOURSES_ERROR
      });
    });
};

export const fetchCourse = courseId => dispatch => {
  dispatch({
    type: FETCH_COURSE_STARTED
  });
  axios
    .get(
      `api/courses/public/get/${courseId}`,
      window.localStorage.getItem("userToken") ? tokenObject : {}
    )
    .then(res => {
      dispatch({
        type: FETCH_COURSE_RECEIVED,
        payload: res.data[0]
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_COURSE_ERROR
      });
    });
  axios
    .get(`api/entrytasks/${courseId}`, tokenObject())
    .then(res => {
      dispatch({
        type: FETCH_COURSEENTRYTASK_RECEIVED,
        payload: res.data.error_message ? null : res.data
      });
    })
    .catch(() => {
      dispatch({
        type: FETCH_COURSEENTRYTASK_ERROR
      });
    });
  axios
    .get(`api/entrytasks/submission/user/${courseId}`, tokenObject())
    .then(res => {
      dispatch({
        type: FETCH_USERENTRYTASK_RECEIVED,
        payload: res.data.error_message ? null : res.data
      });
    })
    .catch(() => {
      dispatch({
        type: FETCH_USERENTRYTASK_ERROR
      });
    });
};

export const applyToCourse = (courseId, object) => dispatch => {
  dispatch({
    type: APPLY_TO_COURSE_STARTED
  });
  axios
    .post(`api/courses/${courseId}/apply`, object, tokenObject())
    .then(res => {
      dispatch({
        type: APPLY_TO_COURSE_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: APPLY_TO_COURSE_ERROR,
        payload: res.data
      });
    });
};

export const acceptInvitation = courseId => dispatch => {
  axios
    .put(`api/courses/${courseId}/acceptinvitation`, {}, tokenObject())
    .then(res => {
      dispatch({
        type: ACCEPT_RECEIVED,
        payload: res.data
      });
      dispatch(fetchMyCourses());
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
    });
};

export const declineInvitation = courseId => dispatch => {
  axios
    .delete(`api/courses/${courseId}/declineinvitation`, tokenObject())
    .then(res => {
      dispatch({
        type: DECLINE_RECEIVED,
        payload: res.data
      });
      dispatch(fetchMyCourses());
    })
    .catch(err => {
      console.dir(err);
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
    });
};

export const fetchBrowseCourses = (
  sortBy,
  searchQuery,
  offset,
  limit
) => dispatch => {
  dispatch({
    type: FETCH_BROWSECOURSES_STARTED
  });
  let loggedIn = window.localStorage.getItem("userToken");
  axios
    .get(
      "api/courses/" +
        (loggedIn ? "browse" : "public") +
        `?sortBy=${sortBy}` +
        (searchQuery && searchQuery !== "" ? `&query=${searchQuery}` : "") +
        (offset && offset !== "" ? `&offset=${offset}` : "") +
        (limit && limit !== "" ? `&limit=${limit}` : ""),
      loggedIn ? tokenObject() : {}
    )
    .then(res => {
      dispatch({
        type: FETCH_BROWSECOURSES_RECEIVED,
        payload: res.data,
        delete: offset === 0
      });
    })
    .catch(err => {
      if (err.response && err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
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
    .post("api/courses", newCourse, tokenObject())
    .then(res => {
      dispatch({
        type: CREATE_COURSE_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response && err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: CREATE_COURSE_ERROR,
        payload: err.response
          ? err.response.data.error_message[
              Object.keys(err.response.data.error_message)[0]
            ]
          : "Unknown error"
      });
    });
};

export const clearState = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_COURSE
  });
};
