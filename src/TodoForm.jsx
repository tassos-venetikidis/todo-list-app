import ListItem from "@mui/material/ListItem";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Create } from "@mui/icons-material";
import { v4 as uuid } from "uuid";

function TodoForm({ addToTodosFn }) {
  const [todoInput, setTodoInput] = useState("");

  const handleChange = (e) => setTodoInput(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    addNewTodo();
  }

  function addNewTodo() {
    setTodoInput("");
    addToTodosFn((previousTodos) => [
      ...previousTodos,
      { id: uuid(), text: todoInput, completed: false },
    ]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <ListItem>
        <TextField
          id="outlined-basic"
          label="New Todo"
          variant="outlined"
          value={todoInput}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="create todo"
                  edge="end"
                  onClick={addNewTodo}
                >
                  <Create />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ListItem>
    </form>
  );
}

export default TodoForm;
