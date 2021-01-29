import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
   
    render() {
        return (
            <form className="LoginForm">
                <h1>Log In</h1>
                <div className="input">
                    <label>email</label>
                    <input type="text" required /> 
                </div>
                <div className="input">
                    <label>password</label>
                    <input type="password" required />
                </div>
                <button type="submit">log in</button>
            </form> 
        );
    }
}

