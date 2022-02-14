// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the project folders
app.use(express.static("website"));
app.use(express.static("img"));

// Setup Server

const port = 3000;

const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// Callback function to complete GET '/all'

// app.get("/all", (req, res) => {
//   res.send(projectData);
// });

// Post Route

app.post("/addData", addData);

function addData(req, res) {
  projectData["image"] = req.body.image;
  projectData["id"] = req.body.id;
  projectData["name"] = req.body.name;
  projectData["designer"] = req.body.designer;
  projectData["category"] = req.body.category;
  projectData["product"] = req.body.product;
  res.send(projectData);
  console.log(projectData);
}
