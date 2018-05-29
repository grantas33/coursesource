import axios from "axios";

export const FETCH_DASHBOARD_ASSIGNMENTS_RECEIVED = "DASHBOARD/FETCH_DASHBOARD_ASSIGNMENTS_RECEIVED";
export const FETCH_DASHBOARD_LECTURES_RECEIVED = "DASHBOARD/FETCH_DASHBOARD_LECTURES_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  items: [],
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_ASSIGNMENTS_RECEIVED:
      return {
        ...state,
        loading: false,
        assignments: action.payload,
      };
    default:
      return state;
  }
};

export const fetchDashboard = () => dispatch => {
  axios
    .get("api/assignments/get/last", {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_DASHBOARD_ASSIGNMENTS_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
    });
  axios
    .get("api/lectures/get/last", {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("userToken")
      }
    })
    .then(res => {
      dispatch({
        type: FETCH_DASHBOARD_LECTURES_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response.data.message === "Invalid Token") {
        window.localStorage.removeItem("userToken");
        dispatch(push("/login"));
      }
    });
};