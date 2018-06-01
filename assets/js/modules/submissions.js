import axios from "axios";
import tokenObject from "../tokenObject";

export const FETCH_SUBMISSIONS_STARTED = "user/FETCH_SUBMISSIONS_STARTED";
export const FETCH_SUBMISSIONS_RECEIVED = "user/FETCH_SUBMISSIONS_RECEIVED";
export const FETCH_SUBMISSIONS_ERROR = "user/FETCH_SUBMISSIONS_ERROR";

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