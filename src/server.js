import express from "express";
import mysql from "mysql";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views/pug");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

app.listen(port, () => {
    console.log(`start ${port}`);
})

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0219JK0114WK!@',
  database : 'users'
});
 
connection.connect();
 
connection.query('SELECT * FROM students', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});
 
connection.end();