const express = require("express"); //This line imports the Express.js framework, which simplifies the process of building web applications and APIs in Node.js.
//const mongoose = require('mongoose');
const redis = require("redis");
const { Client } = require("pg");
//init app
const PORT = process.env.PORT || 4000; // run i n aspecifec Port - This variable is set to 4000, indicating the port number on which the server will listen for incoming requests.
const app = express(); // It initializes an instance of the Express application.

//connect to redis
const REDIS_HOST = "redis";
const REDIS_PORT = 6379;
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Client Redis connected!... : "));
redisClient.connect();

// // Connect to Mongo Database
// const DB_USER = "root";
// const DB_PASSWORD = "root";
// const DB_PORT = 27017;
// const DB_HOST = "mongo"; // get the ip deirect from mongo service not manually
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// // To login docker exec [container name] mongosh -u root -p root

// mongoose
//   .connect(URI)
//   .then(() => console.log("!!! Connected to DB !!!"))
//   .catch((err) => console.log("!!! faild to connect to DB!!! : ", err));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// Docker Practical Course in Arabic | #17 - Docker with PostgresSQL

// Define the connection parameters
const DB_USER = "root";
const DB_PASSWORD = "root";
const DB_PORT = 5432;
const DB_HOST = "postgres"; // get the ip deirect from postgres service not manually
const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// Create a new client instance
const client = new Client({
  connectionString: URI,
});

// Connect to the database
client
  .connect()
  .then(() => console.log("!!! Connected to Postgres-DB !!!"))
  .catch((err) =>
    console.log("!!! faild to connect to Postgres-DB!!! : ", err)
  );

//Defining a Route:
/*This code defines a route for handling GET requests to the root path ('/'). When a user accesses the root path, the server responds by sending the HTML content <h1>...</h1>.
app.get('/'...): This sets up a route for handling HTTP GET requests to the root path.
(req, res) => res.send(' <h1>..</h1> '): This is the callback function that gets executed when a request is made to the specified route. It sends the specified HTML content as the response.*/
app.get("/", (req, res) => {
  redisClient.set("products", "Products...");
  res.send(" <h1> Hello Tresmerge!!</h1> ");
});

app.get("/data", async (req, res) => {
  const Products = await redisClient.get("products");
  res.send(`<h1> Hello Tresmerge!!</h1> <h2> ${Products} </h2> `);
});

app.listen(PORT, () => console.log(`app is up and running in port: ${PORT}`));