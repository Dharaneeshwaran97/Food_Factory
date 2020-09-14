const express = require("express");
const mongoose = require("mongoose");
const keys = require('./config/keys');
var session = require('express-session');
const app = express();


mongoose.connect(keys.mongoURI);
const db = mongoose.connection;
db.on('error', console.log.bind("Not connection "));
db.once("open", function () {
    console.log("connection successed");
})

app.use(session({
    secret: 'ssshhhhh', resave: true,
    saveUninitialized: true
}));
app.get('/', (req, res) => {
    res.send("Food Factory app");
});

app.listen(5000, () => {
    console.log("App listening on port 5000");

})