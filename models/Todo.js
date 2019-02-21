const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TodoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  done: { type: Boolean, required: true, default: false },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("todos", TodoSchema);
