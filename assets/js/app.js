import React from 'react';
import ReactDOM from 'react-dom';
import Button from "./Components/Button";
import Calendar from "./Components/Calendar/Calendar";

class App extends React.Component {
    render(){
        return (
        <div>
            <Button />
            <Calendar />
        </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));