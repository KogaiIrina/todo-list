import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todos: []};
        this.inputRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/todos')
            .then(response => response.json())
            .then(todos => this.setState({todos}));
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:3001/todo', {
            method: 'POST',
            body: this.inputRef.current.value,
            headers: {
                'Content-Type': 'text/plain'
            }
        })
            .then(response => response.json())
            .then(todo => {
                this.setState({todos: [...this.state.todos, todo]});
                this.inputRef.current.value = '';
            });
    }
  
    render() {
        const renderedTodos = this.state.todos.map((todo, i) => (
            <div key={i}>{todo.summary}</div>
        ));
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Todo:
                        <input type="text" ref={this.inputRef} required/>
                    </label>
                    <button type="submit">Add</button>
                </form>
                <div>{renderedTodos}</div>
            </div>
        );
    }

  }



  ReactDOM.render(
    <TodoForm />,
    document.getElementById('root')
  );