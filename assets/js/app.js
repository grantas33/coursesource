import React from 'react';
import ReactDOM from 'react-dom';
import Button from "./Components/Button";
import Calendar from "./Components/Calendar/Calendar";
import { slide as Menu } from 'react-burger-menu'
import SideMenu from './Components/SideMenu/SideMenu';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Notifications from './Components/Notifications/Notifications';
import Schedule from './Components/Schedule/Schedule';
import Lectures from './Components/Lectures/Lectures';
import Homework from './Components/Homework/Homework';

class App extends React.Component {
    render(){
        return (
        <div>
            <SideMenu />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/notifications' component={Notifications}/>
                <Route path='/schedule' component={Schedule}/>
                <Route path='/lectures' component={Lectures}/>
                <Route path='/homework' component={Homework}/>
            </Switch>  
        </div>               
        )
    }
}

ReactDOM.render((<BrowserRouter>
                    <App />
                </BrowserRouter>
), document.getElementById('root'));