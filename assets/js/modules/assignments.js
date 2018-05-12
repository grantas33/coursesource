import axios from "axios";

export const FETCH_ASSIGNMENTS_STARTED =
  "assignments/FETCH_ASSIGNMENTS_STARTED";
export const FETCH_ASSIGNMENTS_ERROR = "assignments/FETCH_ASSIGNMENTS_ERROR";
export const FETCH_ASSIGNMENTS_RECEIVED =
  "assignments/FETCH_ASSIGNMENTS_RECEIVED";

export const CREATE_ASSIGNMENT_STARTED =
  "assignments/CREATE_ASSIGNMENT_STARTED";
export const CREATE_ASSIGNMENT_ERROR = "assignments/CREATE_ASSIGNMENT_ERROR";
export const CREATE_ASSIGNMENT_RECEIVED =
  "assignments/CREATE_ASSIGNMENT_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  items: [],
  loading: true,
  error: false,
  newloading: false,
  newerror: false,
  newresponse: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSIGNMENTS_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_ASSIGNMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_ASSIGNMENTS_RECEIVED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: false
      };
    case CREATE_ASSIGNMENT_STARTED:
      return {
        ...state,
        newloading: true
      };
    case CREATE_ASSIGNMENT_ERROR:
      return {
        ...state,
        newloading: false,
        newresponse: action.payload,
        newerror: true
      };
    case CREATE_ASSIGNMENT_RECEIVED:
      return {
        ...state,
        newloading: false,
        newresponse: action.payload,
        newerror: false
      };
    default:
      return state;
  }
};

export const fetchAssignments = courseId => dispatch => {
  dispatch({
    type: FETCH_ASSIGNMENTS_STARTED
  });
  axios
    .get("api/assignments?course=" + courseId, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_ASSIGNMENTS_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.error_message === "Invalid Token!") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: FETCH_ASSIGNMENTS_ERROR
      });
    });
};

export const createAssignment = newAssignment => dispatch => {
  dispatch({
    type: CREATE_ASSIGNMENT_STARTED
  });
  axios
    .post("api/assignments", newAssignment, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: CREATE_ASSIGNMENT_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.error_message === "Invalid Token!") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: CREATE_ASSIGNMENT_ERROR,
        payload: err.data
      });
    });
};
