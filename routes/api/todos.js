const express = require("express");
const router = express.Router();
const mongoos = express("mongoose");
const passport = require("passport");

//TODO model
const Todo = require("../../models/Todo");

//Validation
const validateTodoInput = require("../../validation/todos");

//@route GET api/todos/test
//@desc Test todos route
//@access Public
router.get("/test", (req, res) => res.json({ message: "TODOS Works" }));

//@route GET api/todos
//@desc GET list of todos
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.find({ user: req.user.id })
      .then(todos => {
        res.json(todos);
      })
      .catch(err => res.status(404).json({ error: "No todos found" }));
  }
);

//@route GET api/todos/:id
//@desc GET todo
//@access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findById(req.params.id)
      .then(todo => {
        res.json(todo);
      })
      .catch(err => res.status(404).json({ error: "No todo found" }));
  }
);

//@route POST api/todos
//@desc Create todo
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newTodo = new Todo({
      user: req.user.id,
      text: req.body.text
    });

    newTodo.save().then(todo => {
      res.json(todo);
    });
  }
);

//@route DELETE api/todos/:id
//@desc Delete todo
//@access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findById(req.params.id)
      .then(todo => {
        if (todo.user.toString() !== req.user.id) {
          return res.status(401).json({ error: "User not authorized" });
        }
        //Delte
        todo
          .remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err => res.status(404).json({ error: "Post not found" }));
      })
      .catch(err => res.status(404).json({ error: "No todos found" }));
  }
);

module.exports = router;
