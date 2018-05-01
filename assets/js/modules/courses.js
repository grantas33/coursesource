import axios from 'axios';

export const FETCH_COURSES_STARTED = 'courses/FETCH_COURSES_STARTED'
export const FETCH_COURSES_ERROR = 'courses/FETCH_COURSES_ERROR'
export const FETCH_COURSES_RECEIVED = 'courses/FETCH_COURSES_RECEIVED'

export const CREATE_COURSE_STARTED = 'courses/CREATE_COURSE_STARTED'
export const CREATE_COURSE_ERROR = 'courses/CREATE_COURSE_ERROR'
export const CREATE_COURSE_RECEIVED = 'courses/CREATE_COURSE_RECEIVED'
export const CLEAR_CREATE_COURSE = 'courses/CLEAR_CREATE_COURSE'

axios.defaults.baseURL = '/';

let config = {
  headers: {
    'Authorization': 'Bearer ' + "eyJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6ImNhbXNlbEBnbWFpbC5jb20iLCJleHAiOiIxNTI1MTg3NzE3IiwiaWF0IjoxNTI1MTg0MTE3fQ.bBLV2FK0rN4iLD-p4pRfZMFzQUVReAMmk7WSPbhEF7TFA10lmRgoUFrCQj4NigRkLh_N_ZRzGbdc49TjehS8jevfp8JsmghD7Y9ASzTdEBY3bM1U4K16Lejc7n68encj-F6OdK0rmPLXkPM794bseGGsI_FTmzysXRCxoRfHtnvOeGQDY2g66y1XGiLp77Zf2ww-AzU2rNdhj5mvafkKj3unM8i0oxPhYm_T4pJex889ky9_imYaBivEU0M4K6o6Memzz_PsOMtOJkvHlgl2aHUYG7t2m2N4aAbRE_5P1N95tM7BjZro0_Ac7Rn9T-j6KP4yBgek7F62Pg6LSFo-rLU2PDEHjPXQHE-2glZmXmZpF8xS59-YkQ4MAVCUr2Zf6g_esnWCL1P8vCdaGi2HtpAyXcwevPTjEXyBV79twnBLRtolD_nF_ZpkWbHK_xPmPfJcCGYDx1ilmB-oTTAdSJA7bJS_8usISFYBj3qvT_7p0GQM564iVNLqc5eqn2dxLophmGNiijtrBwQl1kAoatOzNyXX4zFxCpb-T3bvIZOvPZAd6Xkq7m9mhxS38yaQxgwr8vtv9aHBE4tXMHoB4P9TddNRExHJYC6RXGmI_qa6iQ3GKGyudCBI248yM2F4_4NrSTCgor24glXK57y6epkskM0b_QGLGI324lho4co"
  }
}

const initialState = {
  allCourses: {
    courses: [],
    loading: true,
    error: false
  },
  newCourse: {
    response: '',
    loading: false,
    error: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES_STARTED:
      return {
        ...state,
        allCourses: {
            loading: true,
        }
      }
    case FETCH_COURSES_ERROR:
    return {
      ...state,
      allCourses: {
          loading: false,
          error: true
      }
    }
    case FETCH_COURSES_RECEIVED:
    return {
      ...state,
      allCourses: {
          loading: false,
          error: false,
          items: action.payload
      }
    }
    case CREATE_COURSE_STARTED:
    return {
      ...state,
      newCourse: {
          loading: true,
      }
    }
    case CREATE_COURSE_ERROR:
    return {
      ...state,
      newCourse: {
          loading: false,
          error: true,
          response: action.payload
      }
    }
    case CREATE_COURSE_RECEIVED:
    return {
      ...state,
      newCourse: {
          loading: false,
          error: false,
          response: action.payload
      }
    }
    case CLEAR_CREATE_COURSE: {
      return {
        ...state,
        newCourse: {
          ...initialState.newCourse
        } 
      }
    }
    default:
      return state
  }
}

export const fetchCourses = () => 
dispatch => {
  dispatch({
    type: FETCH_COURSES_STARTED
  })
  axios.get('api/courses',config)
  .then((res) => {
    dispatch({
      type: FETCH_COURSES_RECEIVED,
      payload: res.data
    });
  })
  .catch((err) => {
    dispatch({
      type: FETCH_COURSES_ERROR
    })
  })
}

export const createCourse = (newCourse) => 
dispatch => {
  dispatch({
    type: CREATE_COURSE_STARTED
  })
  axios.post('api/courses', newCourse,config)
  .then((res) => {
    dispatch({
      type: CREATE_COURSE_RECEIVED,
      payload: res.data
    });
  })
  .catch((err) => {
    dispatch({
      type: CREATE_COURSE_ERROR,
      payload: err.response.data.error_message.title
    })
  })
}

export const clearState = () => 
dispatch => {
  dispatch({
    type: CLEAR_CREATE_COURSE
  })
}