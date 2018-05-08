import axios from "axios";

export const FETCH_COURSES_STARTED = "courses/FETCH_COURSES_STARTED";
export const FETCH_COURSES_ERROR = "courses/FETCH_COURSES_ERROR";
export const FETCH_COURSES_RECEIVED = "courses/FETCH_COURSES_RECEIVED";

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
  allCourses: {
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
    case FETCH_COURSES_STARTED:
      return {
        ...state,
        allCourses: {
          loading: true
        }
      };
    case FETCH_COURSES_ERROR:
      return {
        ...state,
        allCourses: {
          loading: false,
          error: true
        }
      };
    case FETCH_COURSES_RECEIVED:
      return {
        ...state,
        allCourses: {
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
    default:
      return state;
  }
};

export const fetchCourse = (courseId) => dispatch => {
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
      dispatch({
        type: FETCH_COURSE_ERROR
      });
    });
};

export const fetchCourses = (param) => dispatch => {
  dispatch({
    type: FETCH_COURSES_STARTED
  });
  axios
    .get(`api/courses/${param}`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_COURSES_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_COURSES_ERROR
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
    })
    .catch(err => {
      dispatch({
        type: CREATE_COURSE_ERROR,
        payload: err.response.data.error_message.title
      });
    });
};

export const clearState = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_COURSE
  });
};
