import express from "express";
import Todo from "../models/todos";
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("HEllO TO YOU ON THIS TODO API!");
});

Router.post("/todo", (req, res) => {
    console.log("post", req.body);
    const newTodo = new Todo({ txt: req.body.txt });
    newTodo.save((err) => {
        if (err) { res.json({ err: err }); }
        else {
            res.json({ status: true });
        }
    });
});

Router.get("/allTodos", (req, res) => {
    Todo.find((err, data) => {
        if (err) {
            res.json({ err });
        } else {
            res.json({ status: true, data: data });
        }
    });
});

Router.put("/todo/:id", (req, res) => {
    const todoId = { _id: req.params.id };
    const updatedTodo = { txt: req.body.txt };
    Todo.update(todoId, updatedTodo, (errors) => {
        if (errors) return res.json({ status: flase, errors: errors });
        else res.json({ status: true });
    });
});

Router.delete("/removeTodo/:id", (req, res) => {
    const todoId = { _id: req.params.id };
    Todo.remove(todoId, (errors) => {
        if (errors) return res.json({ status: false, errors });
        else res.json({ status: true });
    });
});

module.exports = Router;