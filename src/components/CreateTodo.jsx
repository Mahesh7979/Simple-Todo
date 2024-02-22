import { useEffect, useState, useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import App from "../App";
import "./CreateTodo.css";
// require('dotenv').config();
// const apiUrl = process.env.REACT_APP_HIT_ME;
export function CreateTodo({ updateGetTodos }) {
  const titleRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  const addTodo = () => {
    if (title == "") titleRef.current.focus();
    else {
      axios
        .post(`https://simple-todo-server-8exm.onrender.com/todo`, {
          title: title,
          description: description,
        })
        .then(() => {
          axios.get(`https://simple-todo-server-8exm.onrender.com/todos`).then((res) => {
            updateGetTodos(res.data.todos);
            setTitle("");
            setDescription("");
            titleRef.current.value("");
          });
        });
    }
  };
  return (
    <div>
      <div className="Ccontainer">
        <input
          type="text"
          id="title"
          placeholder="Add Task like 'go to gym'"
          value={title}
          ref={titleRef}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <br />
        {/* <input type="text"  id="description" placeholder="description" value={description} onChange={(e)=>{
            setDescription(e.target.value);
        }} onKeyDown={handleKeyDown}
        
        /><br/> */}

        <IoIosAddCircle id="add" onClick={addTodo} />
      </div>
    </div>
  );
}
