require('dotenv').config();
console.log(process.env.SESSION_SECRET);
const express = require("express");
const bodyParser = require("body-parser");
var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var cookieParser = require('cookie-parser');

var authMiddleware = require("./middiewares/auth.middieware");

const port = 3000;
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.get("/", function (req, res) {
  res.render("index", {
    name: "Alia",
  });
});

app.use('/users',authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);

app.listen(port, function () {
  console.log("Server listing on port", port);
});


