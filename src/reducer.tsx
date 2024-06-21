import {Todo} from './App'

export interface states{
    todos: Todo[];
    editingTodo: Todo | null;
  }
  type ActionType =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'EDIT_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: string };


function todoReducer(state:states, action:ActionType) {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
        };
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          ),
        };
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case 'EDIT_TODO':
        return {
          ...state,
          editingTodo: action.payload,
        };
      case 'UPDATE_TODO':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === (state.editingTodo?.id ?? null)
              ? { ...todo, text: action.payload }
              : todo
          ),
          editingTodo: null,
        };
      default:
        return state;
    }
  }
   export default todoReducer