import "dotenv/config";

import express from "express";

import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI;
// create an instance of the client for the initial connection
const client = new MongoClient(connectionString);
let dbconnected = false;
// make an async function to handle the connection (and any errors)
async function run() {
  try {
    // connect client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log('{ message: "Successfully connected to the database!" }');
    dbconnected = true;
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.log({ message: "Failed to connect to the database." });
    dbconnected = false;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run();

const app = express();

app.get("/", (req, res) => {
    if(dbconnected){
      res.json({ message: "Successfully connected to the database!" });
    }else{
    res.status(500).json({ message: "Failed to connect to the database." });
    }


});

const port = 3001;

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
