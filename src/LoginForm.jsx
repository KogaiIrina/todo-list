import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit() {
        this.props.onLogged();
    }

    render() {
        return (
            <form className="LoginForm" onSubmit={this.handleSubmit}>
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

