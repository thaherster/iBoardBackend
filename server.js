const experss = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const todos = require("./routes/api/todos");

const app = experss();

//DB Config
const db = require("./config/keys").mongoURI;
//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected!"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello!ssss"));

//Use routes
app.use("/api/users", users);
app.use("/api/todos", todos);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running .... on  port " + port);
});
