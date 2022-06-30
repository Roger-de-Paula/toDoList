const express = require('express')
const app = express()

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
})







