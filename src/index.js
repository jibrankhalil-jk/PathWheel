import express from "express";
import db from "./config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { nanoid } from "nanoid";
import { MongoClient, ServerApiVersion } from "mongodb";

const server = express();
const port = 3333;

server.use(express.json());
server.use(cors());

const client = new MongoClient(
  "mongodb+srv://apricodex:QHINkM9SNAbTjDCv@pathwheel.6eusqhp.mongodb.net/?retryWrites=true&w=majority&appName=pathwheel",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

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

export let profile_imgs_name_list = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
export let profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

// ------------------------------------------------------------------------------------------------
// make all routes here
// ------------------------------------------------------------------------------------------------

// const connectDb = async () => {
//   await client.connect();
//   console.log("Connected successfully to server");
// };

server.get("/", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

// connectDb();

server.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;

  // validating data
  if (fullname.length < 3) {
    return res.status(403).json({ error: "Full name must be 3 leters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter email" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password shoud be 6 to 20 characters long with a numeric, 1 upper and lower and uppercase letters.",
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    try {
      let profile_img = `https://api.dicebear.com/6.x/${
        profile_imgs_collections_list[
          Math.floor(Math.random() * profile_imgs_collections_list.length)
        ]
      }/svg?seed=${
        profile_imgs_name_list[
          Math.floor(Math.random() * profile_imgs_name_list.length)
        ]
      }`;

      

      let query = `INSERT INTO users (name, email, password,profile_img) VALUES ("${fullname}", "${email}", "${hashed_password}" , "${profile_img}")`;

      console.log(query);
      let user_info = await db.query(query);

      let access_token = jwt.sign(
        { email: email },
        process.env.SECRET_ACESS_KEY
      );

      return res.status(200).json({
        access_token,
        profile_img,
        fullname,
        email,
      });
    } catch (err) {
      console.log("error signup");
      if (err.code == "ER_DUP_ENTRY") {
        return res.status(500).json({ error: "Email Arready used" });
      }
      return res.status(500).json({ error: err.message });
    }
  });
});

server.post("/signin", async (req, res) => {
  let { email, password } = req.body;

  let query = `SELECT * FROM users WHERE email = "${email}" LIMIT 1 ;`;

  let user_info = await db.query(query);

  let access_token = await jwt.sign(
    { email: email },
    process.env.SECRET_ACESS_KEY
  );

  if (user_info[0].length > 0) {
    let { name, email, profile_img, password: userPassword } = user_info[0][0];

    bcrypt.compare(password, userPassword, (err, result) => {
      console.log("result", result);
      console.log("err", err);
      console.log("password", password);
      console.log("userPassword", userPassword);

      if (err) {
        return res.status(403).json({ error: "Error occured while login" });
      }
      if (!result) {
        return res.status(403).json({ error: "Incorrect Password" });
      } else {
        return res.status(200).json({
          access_token,
          profile_img,
          fullname: name,
          email,
        });
      }
    });
  } else {
    return res.status(403).json({ error: "User not found" });
  }
});

server.post("/change-password", verifyJWT, (req, res) => {
  let { currentPassword, newPassword } = req.body;

  if (
    !passwordRegex.test(currentPassword) ||
    !passwordRegex.test(newPassword)
  ) {
    return res.status(403).json({
      error:
        "Password must be 6 to 20 characters long and contain at least one numeric digit, one uppercase and one lowercase letter",
    });
  }

  User.findOne({ _id: req.user })
    .then((user) => {
      if (user.google_auth) {
        return res.status(403).json({
          error:
            "This account was created using google. You cannot change the password",
        });
      }

      bcrypt.compare(
        currentPassword,
        user.personal_info.password,
        (err, result) => {
          if (err) {
            return res.status(500).json({
              error:
                "Error occured while changing the password , try again later.",
            });
          }

          if (!result) {
            return res
              .status(403)
              .json({ error: "Incorrect Current Password" });
          }

          bcrypt.hash(newPassword, 10, (err, hashed_password) => {
            User.findOneAndUpdate(
              { _id: req.user },
              { "personal_info.password": hashed_password }
            )
              .then((u) => {
                return res.status(200).json({ status: "Password Changed" });
              })
              .catch((err) => {
                return res.status(500).json({
                  error:
                    "Some error occured while changing password, try again later.",
                });
              });
          });
        }
      );
    })
    .catch((err) => {
      return res.status(500).json({ error: "User not found" });
    });
});

server.post("/user-info", async (req, res) => {
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

server.post("/get-wheelchairs", (req, res) => {
  let { limit } = req.body;

  if (!limit) {
    limit = 10;
  }

  let query = `SELECT * FROM wheelchairs ORDER BY created_at LIMIT ${limit};`;

  db.query(query)
    .then((wheelchairs) => {
      return res.status(200).json({ wheelchairs: wheelchairs[0] });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

server.post("/checkout", async (req, res) => {
  let { email, items, total_amount } = req.body;
  console.log("items", items);
  console.log("total_amount", total_amount);
  console.log("email", email);

  if (
    !email ||
    !items ||
    !total_amount ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(403).json({ error: "Invalid order data provided" });
  }

  try {
    // Begin transaction
    await db.query("START TRANSACTION");

    // Get the uid from user table using email
    const userQuery = `SELECT uid FROM users WHERE email = "${email}" LIMIT 1`;
    const userResult = await db.query(userQuery);

    console.log("uid", userResult);

    if (!userResult[0].length) {
      await db.query("ROLLBACK");
      return res.status(404).json({ error: "User not found" });
    }

    const uid = userResult[0][0].uid;

    // Create the order record
    const orderQuery = `INSERT INTO orders (uid, total_amount) VALUES ("${uid}", ${total_amount})`;
    const orderResult = await db.query(orderQuery);

    const orderId = orderResult[0].insertId;

    // Insert order details for each wheelchair item
    for (const item of items) {
      const { wid, quantity, price } = item;
      if (!wid || !quantity || !price) {
        await db.query("ROLLBACK");
        return res.status(403).json({ error: "Invalid item data" });
      }

      const detailsQuery = `INSERT INTO order_details (oid, wid, quantity, price) VALUES (${orderId}, ${wid}, ${quantity}, ${price})`;
      await db.query(detailsQuery);
    }

    // Commit transaction
    await db.query("COMMIT");

    return res.status(200).json({
      status: "Order created successfully",
      order_id: orderId,
    });
  } catch (err) {
    // Rollback transaction in case of error
    await db.query("ROLLBACK");
    console.log("Error during checkout:", err);
    return res.status(500).json({ error: err.message });
  }
});

server.post("/get-orders", async (req, res) => {
  let { email } = req.body;

  console.log("email", email);

  if (!email) {
    return res.status(403).json({ error: "Email is required" });
  }

  try {
    // Get the uid from user table using email

    const userQuery = `SELECT uid FROM users WHERE email = "${email}" LIMIT 1`;
    const userResult = await db.query(userQuery);

    if (!userResult[0].length) {
      return res.status(404).json({ error: "User not found" });
    }

    const uid = userResult[0][0].uid;

    // Get orders for the user
    const ordersQuery = `SELECT * FROM orders WHERE uid = "${uid}" ORDER BY created_at DESC`;
    const ordersResult = await db.query(ordersQuery);

    console.log("ordersResult", ordersResult);

    return res.status(200).json({ orders: ordersResult[0] });
  } catch (err) {
    console.log("Error fetching orders:", err);
    return res.status(500).json({ error: err.message });
  }
});


server.post("/get-order-details", async (req, res) => {
  let { order_id } = req.body;

  if (!order_id) {
    return res.status(403).json({ error: "Order ID is required" });
  }

  try {
    // Get order details for the given order ID
    const detailsQuery = `SELECT * FROM order_details WHERE oid = ${order_id}`;
    const detailsResult = await db.query(detailsQuery);

    return res.status(200).json({ order_details: detailsResult[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------------------------------------------

server.post("/save-location", async (req, res) => {
  try {
    await client.connect();

    let {
      uid,
      timeOfFlight,
      hc,
      latitude,
      longitude,
      bearning,
      direction,
      datetime,
    } = req.body;

    const db = client.db("pathwheel");
    const collection = db.collection(uid);

    await collection.insertOne({
      timeOfFlight,
      hc,
      latitude,
      longitude,
      bearning,
      direction,
      datetime,
    });
    return res.status(200).json({ status: "Location saved" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------------------------------------------

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
