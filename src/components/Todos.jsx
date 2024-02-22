import axios from "axios";
import "./Todos.css";
import App from "../App";

// const apiUrl = process.env.REACT_APP_HIT_ME;
export function Todos({ todos, updateGetTodos }) {
  const handleTodoDeletion = async (tId) => {
    try {
      await axios
        .put(`https://simple-todo-server-8exm.onrender.com/delete`, {
          id: tId,
        })
        .then(() => {
          axios.get(`https://simple-todo-server-8exm.onrender.com/todos`).then((res) => {
            updateGetTodos(res.data.todos);
          });
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return todos.map((t) => (
    <div id="todo" key={t._id}>
      <input
        type="checkbox"
        id="checkbox"
        onChange={() => {
          handleTodoDeletion(t._id);
        }}
      />
      <div id="titleT">
        {t.title}
        <div className="dropdown">
          <div id="descriptionT">{t.description}</div>
        </div>
      </div>
    </div>
  ));
}
