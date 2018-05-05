import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/Course/Home/Home'
import Notifications from './Components/Course/Notifications/Notifications'
import Schedule from './Components/Course/Schedule/Schedule'
import Lectures from './Components/Course/Lectures/Lectures'
import Assignments from './Components/Course/Assignments/Assignments'
import Login from './Components/Main/LoginRegister/Login'
import Register from './Components/Main/LoginRegister/Register'
import MyCourses from './Components/Main/MyCourses/MyCourses'
import BrowseCourses from './Components/Main/BrowseCourses/BrowseCourses'
import CreateNewCourse from './Components/Main/CreateNewCourse/CreateNewCourse'
import MainTopNavigation from './Components/common/MainTopNavigation'
import CourseSidebar from './Components/common/CourseSidebar'
import CreateNewAssignment from './Components/Course/Assignments/CreateNewAssignment'
import CreateNewLecture from './Components/Course/Lectures/CreateNewLecture'
import PrivateRoute from './Components/common/PrivateRoute';
import LandingPage from './Components/common/LandingPage';
import CourseInfo from './Components/Main/CourseInfo/CourseInfo';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/course/:course" component={CourseSidebar} />
          <PrivateRoute path="/" component={MainTopNavigation} />
        </Switch>
        
        <div className="content-wrapper">
          <Switch>
            <PrivateRoute exact path="/main/my-courses" component={MyCourses} />
            <PrivateRoute exact path="/main/browse-courses" component={BrowseCourses} />
            <PrivateRoute exact path="/main/create-new-course" component={CreateNewCourse} />
            <PrivateRoute exact path="/main/course/:course" component={CourseInfo} />            

            <PrivateRoute exact path="/course/:course" component={Home} />
            <PrivateRoute path="/course/:course/notifications" component={Notifications} />
            <PrivateRoute path="/course/:course/schedule" component={Schedule} />
            <PrivateRoute path="/course/:course/lectures" component={Lectures} />
            <PrivateRoute path="/course/:course/create-new-lecture" component={CreateNewLecture} />
            <PrivateRoute path="/course/:course/assignments" component={Assignments} />
            <PrivateRoute path="/course/:course/create-new-assignment" component={CreateNewAssignment} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
