import express from "express";
import db from "./config/database.js";

const app = express();
const port = 3000;

app.use(express.json());

const data = await db.query("SELECT * FROM user");
console.log(data);

// app.get("/", async (req, res) => {
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
