require('@instana/collector')();
var express = require('express');
var app = express();

// get the client
const mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root123'
});

app.get('/', function (req, res) {
  res.send('Hello World !');
});

app.get('/addAddress', function (req, res) {

  connection.query('CREATE DATABASE `nodeDB`;USE nodeDB', (err,rows) => {
   if(err) throw err;
   console.log("database created");

    connection.query('CREATE TABLE IF NOT EXISTS `emp_address_data` (`id` INT AUTO_INCREMENT PRIMARY KEY, `address` VARCHAR(255))', (err,rows) => {
     if(err) throw err;
     console.log("table created");

       connection.query('REPLACE INTO `emp_address_data` (`id`,`address`) values (1,"Pune")', (err,rows) => {
       if(err) throw err;
       console.log("address added");
       res.send("address added");
       }); 
    }); 
  }); 
});

app.get('/getAddress', function (req, res) {
  connection.query('SELECT `address` FROM `emp_address2` WHERE `id` = 1', (err,rows) => {
   if(err) throw err;
   console.log(rows);
   res.send(rows[0]);
  }); 
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
