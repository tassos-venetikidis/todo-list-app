import CssBaseline from "@mui/material/CssBaseline";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function getTodosFromStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    return storedTodos;
  } else {
    return [];
  }
}

function App() {
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

  function handleToggle(id) {
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
          {todos.map((todo) => {
            const labelId = `checkbox-list-label-${todo.id}`;
            return (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={"button"}
                  onClick={() => handleToggle(todo.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={todo.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}

export default App;
