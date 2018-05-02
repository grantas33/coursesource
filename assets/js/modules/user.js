import axios from "axios";
import { push } from "react-router-redux";

export const LOGIN_STARTED = "user/LOGIN_STARTED";
export const LOGIN_ERROR = "user/LOGIN_ERROR";
export const LOGIN_RECEIVED = "user/LOGIN_RECEIVED";
export const CURRENT_USER_RECEIVED = "user/CURRENT_USER_RECEIVED";
export const LOGOUT_RECEIVED = "user/LOGOUT_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  login: {
    token: null,
    loading: true,
    error: null
  },
  current: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        login: {
          loading: true,
          error: null
        }
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          loading: false,
          error: action.payload
        }
      };
    case LOGIN_RECEIVED:
      return {
        ...state,
        login: {
          token: action.payload,
          loading: false,
          error: false
        }
      };
    case CURRENT_USER_RECEIVED:
      return {
        ...state,
        current: {
          ...action.payload
        }
      };
    case LOGOUT_RECEIVED:
      return initialState;
    default:
      return state;
  }
};

export const login = object => dispatch => {
  dispatch({
    type: LOGIN_STARTED
  });
  axios
    .post("api/login", object)
    .then(res => {
      window.localStorage.setItem("userToken", res.data.token);
      dispatch({
        type: LOGIN_RECEIVED,
        payload: res.data.token
      });
      console.log(window.localStorage.getItem("userToken"));
      dispatch(push("/"));
    })
    .catch(err => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data.error_message
      });
    });
};

export const getCurrent = () => dispatch => {
  axios.get("api/user/current", 
  {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("userToken")
    }
  }
).then(res => {
    dispatch({
      type: CURRENT_USER_RECEIVED,
      payload: res.data
    });
  });
};

export const signout = object => dispatch => {
  dispatch({
    type: LOGOUT_RECEIVED
  });
  window.localStorage.removeItem("userToken");
  dispatch(push("/login"));
};
