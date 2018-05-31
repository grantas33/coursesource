import axios from "axios";
import tokenObject from "../tokenObject";

export const FETCH_USERS_STARTED = "user/FETCH_USERS_STARTED";
export const FETCH_USERS_RECEIVED = "user/FETCH_USERS_RECEIVED";
export const FETCH_USERS_ERROR = "user/FETCH_USERS_ERROR";

export const INVITE_USER_STARTED = "user/INVITE_USER_STARTED";
export const INVITE_USER_RECEIVED = "user/INVITE_USER_RECEIVED";
export const INVITE_USER_ERROR = "user/INVITE_USER_ERROR";

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

export const fetchUsers = courseId => dispatch => {
  dispatch({
    type: FETCH_USERS_STARTED
  });
  axios
    .get("api/user/course/" + courseId, tokenObject())
    .then(res => {
      dispatch({
        type: FETCH_USERS_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: err.response.data.error_message
      });
    });
};

export const inviteUser = (courseId, object) => dispatch => {
  dispatch({
    type: INVITE_USER_STARTED
  });
  axios.post(`api/courses/${courseId}/invite`, object, tokenObject()).then(res => {
    dispatch({
      type: INVITE_USER_RECEIVED,
      payload: res.data
    });
    dispatch(fetchUsers(courseId))
  });
};
