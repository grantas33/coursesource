import axios from "axios";

export const FETCH_USERS_STARTED = "user/FETCH_USERS_STARTED";
export const FETCH_USERS_RECEIVED = "user/FETCH_USERS_RECEIVED";
export const FETCH_USERS_ERROR = "user/FETCH_USERS_ERROR";

axios.defaults.baseURL = "/";

const initialState = {
  users: {
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
        login: {
          loading: true,
          error: null
        }
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        login: {
          loading: false,
          error: action.payload
        }
      };
    case FETCH_USERS_RECEIVED:
      return {
        ...state,
        login: {
          items: action.payload,
          loading: false,
          error: null
        }
      };
    default:
      return state;
  }
};

export const fetchUsers = course => dispatch => {
  dispatch({
    type: FETCH_USERS_STARTED
  });
  axios
    .get("api/users?course=" + courseId, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_USERS_RECEIVED,
        payload: res.data.token
      });
      dispatch(push("/main/my-courses"));
    })
    .catch(err => {
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: err.response.data.error_message
      });
    });
};