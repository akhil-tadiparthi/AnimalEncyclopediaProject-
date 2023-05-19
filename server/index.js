// This file serves the backend API for the database 
// Other files in /server such as SingletonCSVParser contain code for parsing the DB from the CSV file
// The DBWrapper Class (Facade) on the client side provides an easy interface for interacting with the DB
const SingletonCSVParser = require('./SingletonCSVParser.js');

var express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
var cors = require('cors')


// Single Instance of CSV Parser from SingletonCSVParser.js
const singletonCSVParser = SingletonCSVParser.getInstance();
// Use CSV Parser to get Database which is sent to client via 
// the GET request below
const AnimalDB = singletonCSVParser.loadAnimalDB_FromCSV();
app.get("/api/getAnimalDB",cors(), (req, res) => {
    console.log("GET request received")
    console.log(AnimalDB)
    res.json({ "animalDB": AnimalDB })
});

app.listen(PORT)


