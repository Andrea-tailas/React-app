import React, { useState } from 'react';
import { Todo } from '../App';

interface TodoItemProps {
  todo: Todo;
  handleToggleTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (id: number,newText:string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, handleToggleTodo, handleDeleteTodo, handleEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
        handleEditTodo(todo.id,newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
         title="Edit todo text"
          placeholder="Enter todo text"
        onChange={() => handleToggleTodo(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          title="Edit todo text"
          placeholder="Enter todo text"
        />
      ) : (
        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      )}
      <button className='editbtn' onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      <button className='deletebtn'  onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;