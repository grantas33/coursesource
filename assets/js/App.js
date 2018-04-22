import React from 'react'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'

import Home from './Components/Course/Home/Home'
import Notifications from './Components/Course/Notifications/Notifications'
import Schedule from './Components/Course/Schedule/Schedule'
import Lectures from './Components/Course/Lectures/Lectures'
import Assignments from './Components/Course/Assignments/Assignments'
import LandingPage from './Components/Main/LandingPage/LandingPage'
import Login from './Components/Main/LoginRegister/Login'
import Register from './Components/Main/LoginRegister/Register'
import Main from './Components/Main/Main/Main'
import CreateNewCourse from './Components/Main/CreateNewCourse/CreateNewCourse'
import MainTopNavigation from './Components/common/MainTopNavigation'
import CourseSidebar from './Components/common/CourseSidebar'
import CreateNewAssignment from './Components/Course/Assignments/CreateNewAssignment'
import CreateNewLecture from './Components/Course/Lectures/CreateNewLecture'

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/course/:course" component={CourseSidebar} />
          <Route path="/" component={MainTopNavigation} />
        </Switch>
        <div className="content-wrapper">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/main/create-new-course" component={CreateNewCourse} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/course/:course" component={Home} />
            <Route path="/course/:course/notifications" component={Notifications} />
            <Route path="/course/:course/schedule" component={Schedule} />
            <Route path="/course/:course/lectures" component={Lectures} />
            <Route path="/course/:course/create-new-lecture" component={CreateNewLecture} />
            <Route path="/course/:course/assignments" component={Assignments} />
            <Route path="/course/:course/create-new-assignment" component={CreateNewAssignment} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
