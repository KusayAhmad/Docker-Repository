const express = require('express'); //This line imports the Express.js framework, which simplifies the process of building web applications and APIs in Node.js.
const mongoose = require('mongoose');

//init app
const PORT = process.env.PORT || 4000; // run i n aspecifec Port - This variable is set to 4000, indicating the port number on which the server will listen for incoming requests.
const app = express(); // It initializes an instance of the Express application.

// donnect db
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_PORT = 27017;
const DB_HOST = '172.27.0.2'; // got it from docker inspect node-app-mongo-1
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
.connect(URI)
.then (() => console.log('!!! Connected to DB !!!'))
.catch((err) => console.log('!!! faild to connect to DB!!! : ',err));

//Defining a Route:
/*This code defines a route for handling GET requests to the root path ('/'). When a user accesses the root path, the server responds by sending the HTML content <h1>...</h1>.

app.get('/'...): This sets up a route for handling HTTP GET requests to the root path.
(req, res) => res.send(' <h1>..</h1> '): This is the callback function that gets executed when a request is made to the specified route. It sends the specified HTML content as the response.*/

app.get('/', (req, res) => res.send(' <h1> Hello Tresmerge!!</h1> '));


app.listen(PORT, () => console.log(`app is up and running in port: ${PORT}`));