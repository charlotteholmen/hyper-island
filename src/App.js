import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';
import TodoForm from './components/todo-form';
import TodoModel from './models/todo';

// For styling I have added Bootstrap CSS framework in /public/index.html
// Styling the modal
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
  // Set two parameters in your state 
  // todos is the todo list
  // chosenTodo is the todo you are editing "right now" in your form
  const [ todos, setTodos ] = useState(null);
  const [ chosenTodo, setChosenTodo ] = useState(null);

  // use effect will update everytime you change your state
  useEffect(() => {

    // prevent looping useState when you are fetching new todos
    if (todos) {
      return;
    }

    // Create async function and get todos
    async function fetchData() {
      let response = await fetch('https://jsonplaceholder.typicode.com/todos')
                                .then(response => response.json())

      // Slice the array from 200 so it only shows 5
      let todos = response.slice(0, 5);

      // Set your todos in state
      setTodos(todos)
    }

    // Call fetch data function
    fetchData();
  });

  const deleteTodo = (todoId) => {
    // Set your todos to all todos except the one you are passing in
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

  const startEditing = (todo) => {
    // Set chosen todo - if you are editing - set your todo
    // If you are adding a new Todo, just add an empty TodoModel
    setChosenTodo(todo || TodoModel())
  }

  const saveTodo = (todo) => {

    // If your todo has an ID you are editing a existing todo
    if (todo.id) {
      // set new todos - map through todos and exchange old todo to new todo
      const newTodos = todos.map(t => (t.id === todo.id) ? todo : t);
      setTodos(newTodos);
    } else {

      // If it is a new todo - give the todo an ID and push to todos
      todo.id = todos.length + 1;
      
      setTodos([
        ...todos,
        todo
      ])
    }

    setChosenTodo(null);
  }

  // Close the popup when you set the chosen Todo to null
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
