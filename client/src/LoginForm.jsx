import React from 'react';
import './LoginForm.css';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
    this.nicknameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: false });
    fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify({
        nickname: this.nicknameInputRef.current.value,
        password: this.passwordInputRef.current.value
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status === 200) {
          this.props.onLoggedIn();
        } else {
          this.setState({ error: true });
        }
      });
  }

  render() {
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <h2>Log In</h2>
        <div>
          <label>nickname
            <input type="text" ref={this.nicknameInputRef} required />
          </label>
        </div>
        <div>
          <label>password
            <input type="password" ref={this.passwordInputRef} required />
          </label>
        </div>
        <button type="submit">log in</button>
        {this.state.error && <div>Nickname or password incorrect!</div>}
      </form>
    );
  }
}

