import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import compression from "compression";
import classesRouter from "./public/classes/classes.js"
import auth from "./public/auth/auth.js";
const authRouter = auth.router;

const app = express();
const port = 3000;

//gzip/deflate outgoing responses
app.use(compression());

//setup bodyparser 
app.use(bodyParser.json());
app.use(express.urlencoded({extended : false}));

//setup session 
const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0219JK0114WK!@",
  database: "sessiondb",
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
      secret: "user key",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
  })
);

//setup passport
app.use(passport.initialize());
app.use(passport.session());

//set up view engine and file dir
app.set("view engine", "pug");
app.set("views", __dirname + "/public/views/pug");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login"));
app.use("/", authRouter);
app.use("/classes", classesRouter);

app.listen(port, () => {
    console.log(`start ${port}`);
});


// app.use(passport.authenticate('session'));
