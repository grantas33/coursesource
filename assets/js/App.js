import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

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
import AssignmentsGrading from './Components/Course/AssignmentsGrading/AssignmentsGrading';
import AssignmentGrading from './Components/Course/AssignmentsGrading/AssignmentGrading';
import UsersManagement from './Components/Course/UsersManagement/UsersManagement';
import UserInfo from './Components/Course/UsersManagement/UserInfo';
import CourseSettings from './Components/Course/CourseSettings/CourseSettings';
import Dashboard from './Components/Main/Dashboard/Dashboard';
import Submissions from './Components/Course/Submissions/Submissions';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/course/:course" component={CourseSidebar} />
          <Route path="/" component={MainTopNavigation} />
        </Switch>
        
        <div className="content-wrapper">
          <Switch>
            <PrivateRoute exact path="/main/my-courses" component={MyCourses} />
            <PrivateRoute exact path="/main/dashboard" component={Dashboard} />
            <Route exact path="/main/browse-courses" component={BrowseCourses} />
            <PrivateRoute exact path="/main/create-new-course" component={CreateNewCourse} />
            <Route exact path="/main/course/:course" component={CourseInfo} />            

            <PrivateRoute exact path="/course/:course" component={Schedule} />
            <PrivateRoute exact path="/course/:course/assignments-grading" component={AssignmentsGrading} />
            <PrivateRoute path="/course/:course/assignments-grading/:assignment" component={AssignmentGrading} />
            <PrivateRoute exact path="/course/:course/users-management" component={UsersManagement} />
            <PrivateRoute path="/course/:course/users-management/:user" component={UserInfo} />
            <PrivateRoute path="/course/:course/submissions" component={Submissions} />
            <PrivateRoute path="/course/:course/schedule" component={Schedule} />
            <PrivateRoute path="/course/:course/lectures" component={Lectures} />
            <PrivateRoute path="/course/:course/create-new-lecture" component={CreateNewLecture} />
            <PrivateRoute path="/course/:course/assignments" component={Assignments} />
            <PrivateRoute path="/course/:course/create-new-assignment" component={CreateNewAssignment} />
            <PrivateRoute path="/course/:course/course-settings" component={CourseSettings} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
