import React from 'react';
import TodoItem from './todoadd';
import { Todo } from '../App';
import "../App.scss";

interface TodoListProps {
  todos:  Todo [];
  handleToggleTodo: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  handleEditTodo: (id: number, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, handleToggleTodo, handleDeleteTodo, handleEditTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;