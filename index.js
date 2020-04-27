const express = require("express");
const bodyParser = require("body-parser");
var userRoutes = require('./routes/user.route');
const port = 3000;
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.render("index", {
    name: "Alia",
  });
});

app.use('/users',userRoutes);

app.listen(port, function () {
  console.log("Server listing on port", port);
});


