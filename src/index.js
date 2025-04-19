import express from "express";
import db from "./config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { nanoid } from "nanoid";

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "No access token" });
  }

  jwt.verify(token, process.env.SECRET_ACESS_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Access token is invalid." });
    }

    req.user = user.id;
    next();
  });
};

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

const generateUserName = async (email) => {
  let username = email.split("@")[0];

  // Check if username exists in database
  const result = await db.query(
    "SELECT COUNT(*) FROM users WHERE username = $1",
    [username]
  );
  const isUserNameUnique = result.rows[0].count > 0;

  isUserNameUnique ? (username += nanoid().substring(0, 5)) : "";

  return username;
};

// ---------------- -------- - -- - - - - -- - -- - --
// make all routes here

// example 1

server.get("/user-info", async (req, res) => {
  let { username, email } = req.body;
  // let email = "";
  // let username = "jibran";
  try {
    let query;
    if (username != "") {
      query = `SELECT * FROM user WHERE user.name = "${username}" LIMIT  1 ;`;
    } else if (email) {
      query = `SELECT * FROM user WHERE email = "${email}" LIMIT 1 ;`;
    }

    let user_info = await db.query(query);

    if (user_info[0].length > 0) {
      return res.status(200).json({ users: user_info[0] });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  return res.status(500).json({ user: "" });
});

// server.get for those routes which do not requred input from user,
// server.post for those routes which requred input from user, like to sign in need email and password from user

// also suggest a valid route name , like get-user-info
// follow this structure
// server.get("/user-info", async (req, res) => {
//  let { } = req.body; // if it is as post
//try {
// let query = ``; // query here
// let output = await db.query(query); // to execute the query
// return res.status(200).json({ users: user_info[0] }); //
// } catch (err) {
// return res.status(500).json({ error: "error occured" });
// }
// return res.status(200).json({ user: "" });
// });

// 200 for everyhthing ok
// 500 server error

// login with email password
// change password
// change user info
// get user info  // done
// get saved location
// add new location
// add medial record for a user
// get home location
// get all wheel charirs , limit 10
// get all orders for a user
// get all orders for a wheel chair
// get all orders details

// insert a new wheel chair data
// inset a new order

// ----------------

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
