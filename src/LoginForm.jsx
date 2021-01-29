import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
   
    render() {
        return (
            <form className="LoginForm">
                <h2>Log In</h2>
                <div>
                    <label>email
                        <input type="text" required />    
                    </label> 
                </div>
                <div>
                    <label>password
                        <input type="password" required />
                    </label>
                </div>
                <button type="submit">log in</button>
            </form> 
        );
    }
}

