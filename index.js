require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var csurf = require('csurf');

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoutes = require('./routes/cart.route');
var transferRoutes = require('./routes/transfer.route');

var authMiddleware = require("./middlewares/auth.middleware");
var sessionMiddleware = require("./middlewares/session.middleware");

const port = 3000;
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csurf({ cookie: true }));

app.get("/", function (req, res) {
  res.render("index", {
    name: "Alia",
  });
});

app.use('/users',authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/transfer', authMiddleware.requireAuth, transferRoutes);

app.listen(port, function () {
  console.log("Server listing on port", port);
});


