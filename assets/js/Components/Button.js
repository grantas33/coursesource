import React from 'react';
import ReactDOM from 'react-dom';

class Button extends React.Component {
    constructor(){
        super();
        this.state = {
            buttonText: "Empty"
        }
    };

    componentDidMount(){
        console.log('mounted');
        fetch('/api/data')
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({buttonText: response.title});
            });
    }

    render(){
        return <button>{this.state.buttonText}</button>
    }
}

export default Button;