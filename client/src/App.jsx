import React from 'react';
import LoginForm from './LoginForm';
import TodoForm from './TodoForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (<LoginForm onLoggedIn={() => this.setState({ isLoggedIn: true })} />);
    } else {
      return (<TodoForm />);
    }
  }
}
