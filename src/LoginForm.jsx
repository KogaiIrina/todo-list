import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
   
    render() {
        return (
            <form className="LoginForm">
                <h1>Log In</h1>
                <div className="input">
                    <label>email
                        <input type="text" required />    
                    </label> 
                </div>
                <div className="input">
                    <label>password
                        <input type="password" required />
                    </label>
                </div>
                <button type="submit">log in</button>
            </form> 
        );
    }
}

