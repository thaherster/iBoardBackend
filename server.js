const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
const todos = require("./routes/api/todos");

const app = express();
app.use(cors());

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDb Connected!"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/todos", todos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server running on port : " + port));
//npm run server to run in dev mode
