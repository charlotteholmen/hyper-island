const TodoModel = (todo) => {

  todo = todo || {};
  
  return {
    id: todo.id || '',
    title: todo.title || ''
  }
}

export default TodoModel;