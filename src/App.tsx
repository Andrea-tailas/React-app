import { useReducer, useEffect } from "react";
import "./App.scss";
// import Header from "./components/header";
import todoReducer from "./reducer";
import TodoList from "./components/todos";
import Createtodo from "./components/createtodo";
import Header from "./components/header";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const initialTodoState: Todo[] = JSON.parse(
  localStorage.getItem("todos") || "[]"
);

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodoState);
  // const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (text: string) => {
    dispatch({ type: "ADD_TODO", payload: text });
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleEditTodo = (id: number, newText: string) => {
    dispatch({
      type: "EDIT_TODO",
      payload: { id, text: newText, completed: false },
    });
  };

  // const handleUpdateTodo = () => {
  //   dispatch({ type: "UPDATE_TODO", payload: newTodo });
  //   setNewTodo("");
  // };

  // const handleNewTodoChange = (e: any) => {
  //   setNewTodo(e.target.value);
  // };
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const uncompletedTodos = totalTodos - completedTodos;
  
  return (
    <>
    <div className="out">
      <div className="wrapper">
        <div className="mytodo">
          <Header />
           <Createtodo onAddTodo={handleAddTodo} />
        </div>
        <div className="app">
         
          <TodoList
            todos={todos}
            handleToggleTodo={handleToggleTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
          />
          <div className="counters">
            <p> {totalTodos} Items left</p>
            <p>Completed {completedTodos}</p>
            <p>Uncompleted {uncompletedTodos}</p>
          </div>
        </div>
            
      </div></div>
    </>
  );
}

export default App;
