const { MongoClient } = require("mongodb");
const http = require("http");
const { error } = require("console");
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to Database");

    const database = client.db("Mydb");
    let collection = database.collection("Student");

    http
      .createServer(async (req, res) => {
        if (req.url === "/add") {
          await collection.insertOne({ name: "irshad", age: 22 });
          res.end("One doc has been added to collection");
        } else if (req.url == "/view") {
          let data = await collection.find().toArray();
          res.end(JSON.stringify(data));
        }
      })
      .listen(3000);

    console.log("Server running at http://localhost:3000");
  } catch (error) {
    console.log(error);
  }
}

startServer();
