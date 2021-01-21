
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todoInEditModeId: undefined
        };
        this.inputRef = React.createRef();
        this.editInputRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        //вызываем метод fetch
        fetch('http://localhost:3001/todos')
        //устанавливаем передачу ответа в формате JSON
            .then(response => response.json())
            //присваиваем todos.Setstate объект todos
            .then(todos => this.setState({ todos }));
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:3001/todo', {
            method: 'POST',
            body: this.inputRef.current.value,
            headers: { 'Content-Type': 'text/plain' }
        })
            .then(response => response.json())
            .then(todo => {
                this.setState({ todos: [...this.state.todos, todo] });
                this.inputRef.current.value = '';
            });
    }

    handleDelete(id) {
        fetch(`http://localhost:3001/todo/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    const index = this.state.todos.findIndex(todo => todo._id === id);
                    const newTodos = [...this.state.todos];
                    newTodos.splice(index, 1);
                    this.setState({ todos: newTodos });
                } else {
                    alert('Error removing item');
                }
            });
        }

    sendPatch(obj) {

    }

    handleEdit(event, id) {
        event.preventDefault();
        fetch(`http://localhost:3001/todo/${id}`, { 
            method: 'PATCH',
            body: JSON.stringify({ summary: this.editInputRef.current.value }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    const index = this.state.todos.findIndex(todo => todo._id  === id);

                    const newTodos = [...this.state.todos]; 
                    newTodos[index] = {
                        ...newTodos[index],
                        summary: this.editInputRef.current.value
                    }

                    this.setState({
                        todos: newTodos,
                        todoInEditModeId: undefined
                    });
                } else {
                    alert('updateOne fail');
                }
            });
    }

    handeleCheck(event, id) {
        fetch(`http://localhost:3001/todo/${id}`, { 
            method: 'PATCH',
            body: JSON.stringify({ checked: event.target.checked }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    const index = this.state.todos.findIndex(todo => todo._id  === id);

                    const newTodos = [...this.state.todos]; 
                    newTodos[index] = {
                        ...newTodos[index],
                        checked: event.target.checked
                    }

                    this.setState({
                        todos: newTodos,
                    });
                } else {
                    alert('updateOne fail');
                }
            });
    }

    render() {
        const renderedTodos = this.state.todos.map(todo => {
            if (todo._id === this.state.todoInEditModeId) {
                return (
                    <div key={todo._id}>
                        <form onSubmit={this.handleEdit}>
                            <input type="text" className="inputEdit" defaultValue={todo.summary} ref={this.editInputRef} required/>
                            <button onClick={(event) => this.handleEdit(event, todo._id)} type="submit" className="button">
                                <i className="bi-check-square"></i>
                            </button>
                        </form>
                    </div>);
            } else {
                return (<div key={todo._id} className="renderedTodo">
                    <input type="checkbox" onChange={(event) => this.handeleCheck(event, todo._id)} defaultChecked={todo.checked}/>
                    {todo.summary}
                    <span>
                        <button className="button" onClick={() => this.setState({ ...this.state, todoInEditModeId: todo._id })}>
                            <i className="bi-pencil-fill"></i>
                        </button>
                        <button className="button" onClick={() => this.handleDelete(todo._id)}>
                            <i className="bi-trash"></i>
                        </button>
                    </span>
                </div>);
            }
        });
        return (
            <div className="main">
                <form className="addNewForm" onSubmit={this.handleSubmit}>
                    <h1 id="heading">What do you want to do?</h1>
                    <label>
                        Todo:
                        <input className="mainInput" type="text" ref={this.inputRef} required />
                    </label>
                    <button type="submit" className="button">
                        <i className="bi-check-square"></i>
                    </button>
                </form>
                {renderedTodos}
            </div>
        );
    }
}


ReactDOM.render(
    <TodoForm />,
    document.getElementById('root')
);