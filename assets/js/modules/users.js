import axios from "axios";

export const FETCH_USERS_STARTED = "user/FETCH_USERS_STARTED";
export const FETCH_USERS_RECEIVED = "user/FETCH_USERS_RECEIVED";
export const FETCH_USERS_ERROR = "user/FETCH_USERS_ERROR";

axios.defaults.baseURL = "/";

const initialState = {
  allUsers: {
    items: [],
    loading: true,
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_STARTED:
      return {
        ...state,
        allUsers: {
          loading: true,
          error: null
        }
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        allUsers: {
          loading: false,
          error: action.payload
        }
      };
    case FETCH_USERS_RECEIVED:
      return {
        ...state,
        allUsers: {
          items: action.payload,
          loading: false,
          error: null
        }
      };
    default:
      return state;
  }
};

export const fetchUsers = (courseId) => dispatch => {
  dispatch({
    type: FETCH_USERS_STARTED
  });
  axios
    .get("api/user?course=" + courseId, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_USERS_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: err.response.data.error_message
      });
    });
};