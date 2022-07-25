const express = require('express')
const app = express()
var session = require('express-session');


//display
const flash = require('connect-flash');

//Cyber Security
const bcrypt = require('bcrypt');

//Database importations
const mysql = require('mysql');
const pool = require('./dbService').pool;
const getConnection = require('./dbService').pool;

//input and form readears importations
const multer = require('multer');
const upload = multer();

var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var dotenv = require('dotenv');
const connection = require('./dbService');

dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/views'));
app.set("view engine", "ejs");


app.use(session({
    secret:'flashblog',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());



var sass = require("sass");


app.use(express.static(__dirname + '/views'));



app.listen(8000, () => {
    console.log("Application started and listening on port 8000")
})


//Register Page

app.get("/register", (req, res) => {
    res.render('register')
})



app.post('/register', upload.none(), async (req, res) => {

    //Register Information
    var name = req.body.name;
    var email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.pass,10);
    var  repeatPassword = req.body.re_pass;

    //Possible Errors
    var registrationError = [
        {name: 'passwordsDoenstMatch', message: `The passwords doesn't match`},
        {name: 'nameAlreadyExists', message: `This name already has been taken`},
        {name: 'emailAreadyexists', message: `This email aready has been taken`},
    ]
    if (repeatPassword !== hashedPassword) {
        console.log(registrationError[0]);

    } else if (await bcrypt.compare(repeatPassword, hashedPassword)) {
        console.log("Password matches");
        var sql = `INSERT INTO authentification (name, email, password) VALUES ("${name}", "${email}", "${hashedPassword}")`;
        pool.query(sql, (err, result)  => {
            if (err) throw err;
            console.log('record inserted');
            console.log('new user registred');
            res.redirect('/login');
          });
    }

});



//Login Page

app.get("/login", (req, res) => {
    res.render('login');
    }
)

app.post("/login", upload.none(), async (req, res) => {

    const user = req.body.email;
    const password = req.body.password;


    pool.getConnection( async (err, connection) => {
        if (err) throw (err);


        const sqlSearch = "SELECT * FROM authentification where email = ?";
        const search_query = mysql.format(sqlSearch, [user]);



        await connection.query (search_query, async (err, result) => {
            
            connection.release();

            if (err) throw (err);

            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.sendStatus(404)
            } else {
                const hashedPassword = result[0].password
                //get the hashedPassword from result

                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    res.redirect('home');
                } 
                else {
                    console.log("---------> Password Incorrect")
                    
                } //end of bcrypt.compare()
            }

        })
    })


}); 
 

app.get("/home", (req, res) => {
    res.render('home');
    }
)

