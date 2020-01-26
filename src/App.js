import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';
import TodoForm from './components/todo-form';
import TodoModel from './models/todo';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


function App() {

  const [ todos, setChosenTodos ] = useState(null);
  const [ chosenTodo, setChosenTodo ] = useState(null);

  useEffect(() => {
    if (todos) {
      return;
    }

    // Create async function
    async function fetchData() {
      let response = await fetch('https://jsonplaceholder.typicode.com/todos')
                                .then(response => response.json())

      let todos = response.slice(0, 5);

      setChosenTodos(todos)
    }

    // Call fetch data function
    fetchData();
  });

  const deleteTodo = (todoId) => {
    setChosenTodos(todos.filter(todo => todo.id !== todoId));
  }

  const startEditing = (todo) => {
    setChosenTodo(todo || TodoModel())
  }

  const saveTodo = (todo) => {

    // If has an id - update todo
    if (todo.id) {
      setChosenTodos(todos.map(t => (t.id === todo.id) ? todo : t));
    } else {

      // If it is a new todo - give an ID and push to todos
      todo.id = todos.length + 1;
      
      setChosenTodos([
        ...todos,
        todo
      ])
    }

    setChosenTodo(null);
  }

  const closeModal = () => {
    setChosenTodo(null);
  }

  return (
    <div id="yourAppElement" className="App mt-5">
      <div className="container">

        <h1>My todo list</h1>
              
        <div className="list-group">
          {todos && todos.map((todo) => (

            <div className="list-group-item" key={todo.id}>

              <div className="float-left mt-2">{todo.title}</div>

              <button 
                className="btn btn-light float-right" 
                onClick={() => { deleteTodo(todo.id) }}>
                  Delete
              </button>

              <button 
                className="btn btn-light mr-1 float-right" 
                onClick={() => { startEditing(todo) }}>
                  Edit
              </button>

            </div>
          ))}
        </div>


        <div className="mt-3">
          <button className="btn btn-primary mb-3" onClick={() => { startEditing() }}>+ Add new todo</button>
        </div>
      </div>

      <Modal
          isOpen={chosenTodo !== null}
          style={customStyles}
          ariaHideApp={false}
          onRequestClose={closeModal}
        >
          <div className="modal-container">
            <TodoForm todo={chosenTodo} saveTodo={saveTodo} closeModal={closeModal} />
          </div>
          
        </Modal>

    </div>
  );
}

export default App;
