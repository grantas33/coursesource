import axios from "axios";
import { push } from "react-router-redux";

export const LOGIN_STARTED = "user/LOGIN_STARTED";
export const LOGIN_ERROR = "user/LOGIN_ERROR";
export const LOGIN_RECEIVED = "user/LOGIN_RECEIVED";

export const REGISTER_STARTED = "user/REGISTER_STARTED";
export const REGISTER_ERROR = "user/REGISTER_ERROR";
export const REGISTER_RECEIVED = "user/REGISTER_RECEIVED";

export const FETCH_COURSEROLE_STARTED = "courses/FETCH_COURSEROLE_STARTED";
export const FETCH_COURSEROLE_ERROR = "courses/FETCH_COURSEROLE_ERROR";
export const FETCH_COURSEROLE_RECEIVED = "courses/FETCH_COURSEROLE_RECEIVED";

export const CURRENT_USER_RECEIVED = "user/CURRENT_USER_RECEIVED";
export const LOGOUT_RECEIVED = "user/LOGOUT_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  login: {
    token: null,
    loading: true,
    error: null
  },
  courseRole: {
    item: null,
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
          error: action.payload,
          response: null
        }
      };
    case LOGIN_RECEIVED:
      return {
        ...state,
        login: {
          token: action.payload,
          loading: false,
          error: null
        }
      };

    case REGISTER_STARTED:
      return {
        ...state,
        register: {
          loading: true,
          error: null
        }
      };
    case REGISTER_ERROR:
      return {
        ...state,
        register: {
          loading: false,
          error: action.payload,
          response: null
        }
      };
    case REGISTER_RECEIVED:
      return {
        ...state,
        register: {
          response: action.payload,
          loading: false,
          error: null
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

    case FETCH_COURSEROLE_STARTED:
      return {
        ...state,
        courseRole: {
          loading: true,
          error: null
        }
      };
    case FETCH_COURSEROLE_ERROR:
      return {
        ...state,
        courseRole: {
          item: false,
          error: action.payload,
          response: null
        }
      };
    case FETCH_COURSEROLE_RECEIVED:
      return {
        ...state,
        courseRole: {
          item: action.payload,
          loading: false,
          error: null
        }
      };

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
      dispatch(push("/main/dashboard"));
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response.data.error_message
      });
    });
};

export const register = object => dispatch => {
  dispatch({
    type: REGISTER_STARTED
  });
  axios
    .post("api/register", object)
    .then(res => {
      dispatch({
        type: REGISTER_RECEIVED,
        payload: res.data.token
      });
      dispatch(push("/login"));
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response.data.error_message
      });
    });
};

export const getCurrent = () => dispatch => {
  axios
    .get("api/user/current", {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: CURRENT_USER_RECEIVED,
        payload: res.data
      });
    });
};

export const fetchCourseRole = courseId => dispatch => {
  dispatch({
    type: FETCH_COURSEROLE_STARTED
  });
  axios
    .get(`api/courses/${courseId}/current`, {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_COURSEROLE_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: FETCH_COURSEROLE_ERROR
      });
    });
};

export const signout = object => dispatch => {
  dispatch({
    type: LOGOUT_RECEIVED
  });
  window.localStorage.removeItem("userToken");
  dispatch(push("/"));
};
