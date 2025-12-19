import CssBaseline from "@mui/material/CssBaseline";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import List from "@mui/material/List";
import TodoItem from "./TodoItem.jsx";

function getTodosFromStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    return storedTodos;
  } else {
    return [];
  }
}

function TodoList() {
  const [todos, setTodos] = useState(getTodosFromStorage);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleClick() {
    setTodoInput("");
    setTodos((previousTodos) => [
      ...previousTodos,
      { id: uuid(), text: todoInput, completed: false },
    ]);
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <TextField
        id="outlined-basic"
        label="New Todo"
        variant="outlined"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
      {todos.length > 0 && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </List>
      )}
    </>
  );
}

export default TodoList;
