import axios from "axios";

export const FETCH_DASHBOARD_STARTED = "DASHBOARD/FETCH_DASHBOARD_STARTED";
export const FETCH_DASHBOARD_ERROR = "DASHBOARD/FETCH_DASHBOARD_ERROR";
export const FETCH_DASHBOARD_RECEIVED = "DASHBOARD/FETCH_DASHBOARD_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  items: [],
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_DASHBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_DASHBOARD_RECEIVED:
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

export const fetchDashboard = () => dispatch => {
  dispatch({
    type: FETCH_DASHBOARD_STARTED
  });
  axios
    .get("api/DASHBOARD", {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_DASHBOARD_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
      dispatch({
        type: FETCH_DASHBOARD_ERROR
      });
    });
};