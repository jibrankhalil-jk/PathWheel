import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "jibran",
  // database:"pathwheel",
  password: "pakistan123",
});

if (db) {
  console.log("connected");
} else {
  console.log("failed");
}

 
var s = await  db.execute(
    "show databases",
  );
 

  console.log(s);