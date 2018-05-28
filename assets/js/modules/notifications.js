import axios from "axios";

export const FETCH_NOTIFICATIONS_STARTED = "notifications/FETCH_NOTIFICATIONS_STARTED";
export const FETCH_NOTIFICATIONS_ERROR = "notifications/FETCH_NOTIFICATIONS_ERROR";
export const FETCH_NOTIFICATIONS_RECEIVED = "notifications/FETCH_NOTIFICATIONS_RECEIVED";

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
    .get("api/notifications", {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_NOTIFICATIONS_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: FETCH_NOTIFICATIONS_ERROR
      });
    });
};