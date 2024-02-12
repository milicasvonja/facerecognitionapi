//const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    //port: 5432,
    user: "milicasvonja",
    password: "",
    database: "smart-brain",
  },
});

// const server = http.createServer(() => {
//   console.log("I hear you...");
// });
const app = express();
app.use(bodyParser.json());
app.use(cors());

// const database = {
//   users: [],
// };

app.get("/", (req, res) => {
  db.select("*").from("users");
  //res.send(database.users);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/* route
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
