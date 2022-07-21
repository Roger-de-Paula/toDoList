const express = require('express')
const app = express()

//Cyber Security
const bcrypt = require('bcrypt');

//Database importations
var db = require('./dbService');
const dbService = require('./dbService');

//input and form readears importations
const multer = require('multer');
const upload = multer();

var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var dotenv = require('dotenv');

dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/views'));
app.set("view engine", "ejs");


app.listen(8000, () => {
    console.log("Application started and listening on port 8000")
})



//Register Page

app.get("/register", (req, res) => {
    res.render('register')
})

app.post('/register', upload.none(), async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    var sql = `INSERT INTO authentification (name, email, password) VALUES ("${name}", "${email}", "${password}")`;
    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log('record inserted');
        console.log('new user registred');
        //req.flash('success', 'Data added successfully!');
        res.redirect('/login');
      });
});



//Login Page

app.get("/login", (req, res) => {
    res.render('login');
    }
)

app.post("/login", upload.none(), async (req, res) => {

    const user = req.body.email;
    const password = req.body.password;
    console.log("hello");
    
    db.getConnection ( async (err, connection)=> {
    
        if (err) throw (err);

        const sqlSearch = "Select * from userTable where user = ?";
        const search_query = mysql.format(sqlSearch,[user]);

        if (result.length == 0) {
            console.log("--------> User does not exist")
            res.sendStatus(404)
           } else {

            const hashedPassword = result[0].password
            //get the hashedPassword from result

            if (await bcrypt.compare(password, hashedPassword)) {
                console.log("---------> Login Successful")
                res.send(`${user} is logged in!`)
                res.redirect('/home');
            } else {
                console.log("---------> Password Incorrect")
                res.send("Password incorrect!")
            } //end of bcrypt.compare()

}
}) 
}) 

