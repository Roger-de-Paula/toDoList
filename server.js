const express = require('express')
const app = express()

const mySqlConnection = require('./dbService');
const dbService = require('./dbService');

var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var dotenv = require('dotenv');
dotenv.config();





app.set("view engine", "ejs")


app.listen(8000, () => {
    console.log("Application started and listening on port 8000")
})

app.get("/login", (req, res) => {
    res.render('login');
    }
)

app.get("/register", (req, res) => {
    res.render('register')
    var name = req.query.name;
    var email = req.query.email;
    var password = req.query.password;
    //console.log(name);
    //console.log(email);
    //console.log(password);

})

app.post('/register', (req, res, next) => {
    var name = req.query.name;
    var email = req.query.email;
    var password = req.query.password;
    console.log(name);
    var sql = `INSERT INTO authentification (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    mySqlConnection.query(sql, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        //req.flash('success', 'Data added successfully!');
        res.redirect('/login');
      });
});






