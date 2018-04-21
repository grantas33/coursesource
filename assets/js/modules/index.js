import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import courses from './courses'
import assignments from './assignments'

export default combineReducers({
  routing: routerReducer,
  courses,
  assignments
})