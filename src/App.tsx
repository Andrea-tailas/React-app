import { useState, useReducer } from "react";
import "./App.scss";
// import Header from "./components/header";
import todoReducer from "./reducer";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
export const initialState = {
  todos: [],
  editingTodo: null,
};

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleEditTodo = (todo: Todo) => {
    dispatch({ type: "EDIT_TODO", payload: todo });
  };

  const handleUpdateTodo = () => {
    dispatch({ type: "UPDATE_TODO", payload: newTodo });
    setNewTodo("");
  };

  const handleNewTodoChange = (e: any) => {
    setNewTodo(e.target.value);
  };

  return (
    <>
      <div className="wrapper">
        <div className="todo-list">
          <div className="head">
            <input
              type="text"
              value={newTodo}
              onChange={handleNewTodoChange}
              placeholder="Add a new todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
          </div>
       <div className="list">
          {state.todos.map((todo) => (
            <p
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input type="checkbox"
              title="Mark as completed"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}>

                </input>
              {state.editingTodo?.id === todo.id ? (
                <input    type="text"
                value={newTodo}
                onChange={handleNewTodoChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateTodo();
                  }
                }}></input>
              ) : (
                todo.text
              )}
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </p>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
