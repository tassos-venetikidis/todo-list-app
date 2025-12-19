import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import TodoItem from "./TodoItem.jsx";
import TodoForm from "./TodoForm.jsx";

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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
          Todos
        </Typography>
        <TodoForm addToTodosFn={setTodos} />
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
      </Box>
    </>
  );
}

export default TodoList;
