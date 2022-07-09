const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'roger',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

pool.query("SELECT * FROM authentification" ,(err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    // rows fetch
    console.log("db " + "connected");
});

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

module.exports = getConnection;
module.exports = { pool };



