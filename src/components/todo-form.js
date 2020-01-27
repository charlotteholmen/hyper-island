import React, { useState } from 'react';

const TodoForm = (props) => {

	const [todo, setTodo] = useState(props.todo);

	// Change todo.title when you are typing in the input text field
	const onChangeTodo = (event) => {
		// Event is passed in by onChange in input field (this is built in)
		if (!event) {
			return;

		}
		const { value } = event.target;

		// Set everything in your old todo
		// ... and set a new title
		setTodo({
			...todo,
			title: value
		})
	}

	// Save todo
	// You have passed in your saveTodo function from the parent function
	// You recive it in your props
	const saveTodo = () => {
		props.saveTodo(todo);
	}

	return (
		<div>
			<h3 className="">Add todo</h3>
			<hr />
		
			<input 
				type="text"
				className="form-control mb-3" 
				placeholder="Title"
				onChange={onChangeTodo}
				value={todo.title || ''} />
					  
            <button 
            	className="btn btn-light mr-1" 
        		onClick={props.closeModal}>
        		Cancel
    		</button>

            <button 
            	className="btn btn-primary" 
            	onClick={saveTodo}>
            	Save
        	</button>
  		</div>
  	)
}

export default TodoForm;