import React, { useState } from 'react';

const TodoForm = (props) => {

	const [todo, setTodo] = useState(props.todo);

	const saveTodo = () => {
		props.saveTodo(todo);
	}

	const onChangeTodo = (event) => {

		if (!event) {
			return;

		}
		const { value } = event.target;

		setTodo({
			...todo,
			title: value
		})
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