const bcrypt = require("bcrypt");
const fs = require("fs");
const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');


const app = express();
const input = process.argv[2];

app.set("view engine", "ejs")
app.set("views", "views");

// app.use('/', indexRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', usersRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.listen(3000, () => {
    console.log('now listening to port 3000');
})