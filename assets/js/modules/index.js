import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import courses from './courses'
import assignments from './assignments'
import lectures from './lectures'
import user from './user'
import users from './users'
import dashboard from './dashboard'
import notifications from './notifications'


export default combineReducers({
  routing: routerReducer,
  courses,
  assignments,
  lectures,
  user,
  users,
  dashboard,
  notifications
})