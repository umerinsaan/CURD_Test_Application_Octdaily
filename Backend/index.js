const databaseName = 'your_database_name';
const databasePassword = 'your_database_password';


const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:4200"
}));

let n = 0;

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: databasePassword,
  database: databaseName
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

app.get("/questions", (req, res) => {
  n++;
  console.log("Requested from backend: ", n);
  connection.query("SELECT * FROM questions", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

app.put("/update-question", (req, res) => {
  const data = req.body;
  connection.query(`
      update questions
      set title = '${data.title}' , acceptance = ${data.acceptance} , difficulty = '${data.difficulty}'
      where id = ${data.id};
  `);
});

app.put("/delete-question", (req, res) => {
  const data = req.body;
  connection.query(`
      delete from questions
      where id = ${data.id};
  `);
  console.log("Deleted: ", data);
});

app.post("/add-question", (req, res) => {
  const data = req.body;
  console.log("Data: ", data);
  connection.query(`
    insert into questions (id,title,acceptance,difficulty)
    values (${data.id},'${data.title}',${data.acceptance},'${data.difficulty}');
  `);

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});