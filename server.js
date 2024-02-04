//const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

// const server = http.createServer(() => {
//   console.log("I hear you...");
// });
const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "banana",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "332",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  // bcrypt.compare(
  //   "banana",
  //   "$2a$10$u1nFk6dBNwWicZkadHuf4OgD8ycXXOiBqOUG4D.IjtwXGUQ5rXREO",
  //   function (err, res) {
  //     console.log("first choice", res);
  //   }
  // );
  // bcrypt.compare(
  //   "mina",
  //   "$2a$10$u1nFk6dBNwWicZkadHuf4OgD8ycXXOiBqOUG4D.IjtwXGUQ5rXREO",
  //   function (err, res) {
  //     console.log("second choice", res);
  //   }
  // );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error login in");
  }
});

app.post("/register", (req, res) => {
  const { name, password, email } = req.body;
  // bcrypt.hash(password, null, null, function (err, hash) {
  //   console.log(hash);
  // });

  database.users.push({
    id: "125",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("rrrrrrrr");
  }
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
