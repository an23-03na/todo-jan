import Router from "express";
import * as todo from "../controllers/todo";

const app = Router();

app.get("/", todo.todoGet);
app.post("/", todo.todoCreate);
app.patch("/:id", todo.todoUpdate);
app.delete("/:id", todo.todoDelete);

export default app;
