export const FETCH_COURSES_STARTED = 'courses/FETCH_COURSES_STARTED'
export const FETCH_COURSES_ERROR = 'courses/FETCH_COURSES_ERROR'
export const FETCH_COURSES_RECEIVED = 'courses/FETCH_COURSES_RECEIVED'

const initialState = {
  courses: [],
  loading: true,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSES_STARTED:
      return {
        loading: true
      }
    case FETCH_COURSES_ERROR:
      return {
        loading: false,
        error: true
      }
    case FETCH_COURSES_RECEIVED:
      return {
        loading: false,
        error: false,
        courses: action.payload
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
  axios.get('api/courses')
  .then((res) => {
    dispatch({
      type: FETCH_COURSES_RECEIVED,
      payload: res.data
    });
  });
}