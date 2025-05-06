import mysql from "mysql2/promise";
import env from "dotenv";

env.config();

let db;

try {
  
  db = await mysql
    .createConnection({
      host: process.env.HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err);
    });
} catch (e) {}

console.log("connected to the database");

export default db;
