import { useEffect, useState, useMemo, Memo, useCallback } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";
import axios from "axios";
// const apiUrl = process.env.REACT_APP_HITME;
function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    get();
  }, []);
  const updateGetTodos = (uGtodos) => {
    setTodos(uGtodos);
  };

  const get = useCallback(() => {
    axios.get(`https://simple-todo-server-8exm.onrender.com/todos`).then((res) => {
      setTodos(res.data.todos);
    });
  }, []);
  return (
    <div>
      <div className="navBar"></div>
      <div id="heading">Simple todo </div>
      <CreateTodo updateGetTodos={updateGetTodos}></CreateTodo>
      <div className="parentContainer">
        <div className="container">
          <Todos updateGetTodos={updateGetTodos} todos={todos}></Todos>
        </div>
      </div>
    </div>
  );
}

export default App;
