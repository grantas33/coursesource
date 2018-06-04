import axios from "axios";
import tokenObject from "../tokenObject";

export const FETCH_SUBMISSIONS_STARTED = "submissions/FETCH_SUBMISSIONS_STARTED";
export const FETCH_SUBMISSIONS_RECEIVED = "submissions/FETCH_SUBMISSIONS_RECEIVED";
export const FETCH_SUBMISSIONS_ERROR = "submissions/FETCH_SUBMISSIONS_ERROR";

export const ACCEPT_SUBMISSION_RECEIVED = "submissions/ACCEPT_SUBMISSION_RECEIVED";
export const DECLINE_SUBMISSION_RECEIVED = "submissions/DECLINE_SUBMISSION_RECEIVED";
export const SET_SCORE_RECEIVED = "submissions/SET_SCORE_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  allSubmissions: {
    items: [],
    loading: true,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBMISSIONS_STARTED:
      return {
        ...state,
        allSubmissions: {
          ...state.allUsers,
          loading: true,
          error: null
        }
      };
    case FETCH_SUBMISSIONS_ERROR:
      return {
        ...state,
        allSubmissions: {
          ...state.allUsers,
          loading: false,
          error: action.payload
        }
      };
    case FETCH_SUBMISSIONS_RECEIVED:
      return {
        ...state,
        allSubmissions: {
          items: action.payload,
          loading: false,
          error: null
        }
      };
    default:
      return state;
  }
};

export const fetchSubmissions = courseId => dispatch => {
  dispatch({
    type: FETCH_SUBMISSIONS_STARTED
  });
  axios
    .get("api/entrytasks/submission/getall/" + courseId, tokenObject())
    .then(res => {
      dispatch({
        type: FETCH_SUBMISSIONS_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_SUBMISSIONS_ERROR,
        payload: err.response.data.error_message
      });
    });
};

export const acceptSubmission = (courseId, object) => dispatch => {
  axios
    .put(`api/courses/${courseId}/acceptsubmission`,object, tokenObject())
    .then(res => {
      dispatch({
        type: ACCEPT_SUBMISSION_RECEIVED
      });
      dispatch(fetchSubmissions(courseId));      
    })
    .catch(err => {
      console.log(err);
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_SUBMISSIONS_ERROR,
        payload: err.response.data.error_message
      });
    });
};

export const declineSubmission = (courseId, object) => dispatch => {
  axios
    .delete(`api/courses/${courseId}/declineSubmission`,object, tokenObject())
    .then(res => {
      dispatch({
        type: DECLINE_SUBMISSION_RECEIVED
      });
      dispatch(fetchSubmissions(courseId));
    })
    .catch(err => {
      console.log(err);
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_SUBMISSIONS_ERROR,
        payload: err.response.data.error_message
      });
    });
};

export const setSubmissionScore = (submissionId, object) => dispatch => {
  axios
    .put(`api/entrytasks/grade/${submissionId}`,object, tokenObject())
    .then(res => {
      dispatch({
        type: SET_SCORE_RECEIVED
      });
      dispatch(fetchSubmissions(courseId));
    })
    .catch(err => {
      console.log(err);
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_SUBMISSIONS_ERROR,
        payload: err.response.data.error_message
      });
    });
};