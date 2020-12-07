const express = require('express');
const { server_port } = require('./config/env_vars');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: "GET, HEAD, PUT, POST, DELETE",
      credentials: true,
    })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.listen((server_port), () => {
    console.log(`server running on ${server_port}`);
})

app.use(require('./routes'));