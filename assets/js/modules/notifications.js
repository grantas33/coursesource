import axios from "axios";
import tokenObject from "../tokenObject";

export const FETCH_NOTIFICATIONS_STARTED = "notifications/FETCH_NOTIFICATIONS_STARTED";
export const FETCH_NOTIFICATIONS_ERROR = "notifications/FETCH_NOTIFICATIONS_ERROR";
export const FETCH_NOTIFICATIONS_RECEIVED = "notifications/FETCH_NOTIFICATIONS_RECEIVED";
export const READ_ALL_RECEIVED = "notifications/READ_ALL_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  items: [],
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_NOTIFICATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_NOTIFICATIONS_RECEIVED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: false
      };
    default:
      return state;
  }
};

export const fetchNotifications = () => dispatch => {
  dispatch({
    type: FETCH_NOTIFICATIONS_STARTED
  });
  axios
    .get("api/notifications", tokenObject())
    .then(res => {
      dispatch({
        type: FETCH_NOTIFICATIONS_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
      dispatch({
        type: FETCH_NOTIFICATIONS_ERROR
      });
    });
};

export const readAllNotifications = () => dispatch => {
  axios
    .put("api/notifications/readAll",{}, tokenObject())
    .then(res => {
      dispatch({
        type: READ_ALL_RECEIVED,
      });
      dispatch(fetchNotifications())
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        dispatch(push("/login"));
        window.localStorage.removeItem("userToken");
      }
    });
};
