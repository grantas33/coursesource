import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import courses from './courses'
import assignments from './assignments'
import lectures from './lectures'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  courses,
  assignments,
  lectures,
  user
})