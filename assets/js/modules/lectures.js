import axios from "axios";

export const FETCH_LECTURES_STARTED = "lectures/FETCH_LECTURES_STARTED";
export const FETCH_LECTURES_ERROR = "lectures/FETCH_LECTURES_ERROR";
export const FETCH_LECTURES_RECEIVED = "lectures/FETCH_LECTURES_RECEIVED";

export const CREATE_LECTURE_STARTED = "lectures/CREATE_LECTURE_STARTED";
export const CREATE_LECTURE_ERROR = "lectures/CREATE_LECTURE_ERROR";
export const CREATE_LECTURE_RECEIVED = "lectures/CREATE_LECTURE_RECEIVED";

axios.defaults.baseURL = "/";

const initialState = {
  items: [],
  loading: true,
  error: false,
  newloading: false,
  newerror: false,
  newresponse: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LECTURES_STARTED:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_LECTURES_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_LECTURES_RECEIVED:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: false
      };
    case CREATE_LECTURE_STARTED:
      return {
        ...state,
        newloading: true
      };
    case CREATE_LECTURE_ERROR:
      return {
        ...state,
        newloading: false,
        newresponse: action.payload,
        newerror: true
      };
    case CREATE_LECTURE_RECEIVED:
      return {
        ...state,
        newloading: false,
        newresponse: action.payload,
        newerror: false
      };
    default:
      return state;
  }
};

export const fetchLectures = (courseId, teacherId) => dispatch => {
  dispatch({
    type: FETCH_LECTURES_STARTED
  });
  axios
    .get(
      "api/lectures?course=" +
        courseId +
        (teacherId ? "&teacher=" + teacherId : ""),
      {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("userToken")
        }
      }
    )
    .then(res => {
      dispatch({
        type: FETCH_LECTURES_RECEIVED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_LECTURES_ERROR
      });
    });
};

export const createLecture = newLecture => {
  return dispatch => {
    dispatch({
      type: CREATE_LECTURE_STARTED
    });
    axios
      .post("api/lectures", newLecture, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("userToken")
        }
      })
      .then(res => {
        dispatch({
          type: CREATE_LECTURE_RECEIVED,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: CREATE_LECTURE_ERROR,
          payload: err.data
        });
      });
  };
};
