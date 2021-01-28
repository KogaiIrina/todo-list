import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div className="LoginForm">
                <h1>Log In</h1>
                <div className="input">
                    <h4>email</h4>
                    <input type="text" required /> 
                </div>
                <div className="input">
                    <h4>password</h4>
                    <input type="text" required />
                </div>
                <button>log in</button>
            </div> 
        );
    }
}

