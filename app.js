//////Using the Node framework of javascript/////////
//////Bring in Libraries from npm(online repo of node moddules/libraries)//////
const express = require("express");
const bodyParser = require("body-parser");
MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
assert = require('assert');
//////////Create Library Objects/////////////////
const app = express();
/////////Use those library objects////////////
///////////////Store courses as array (temporary)/////////////////////
let q1 = ["CSE 20", "MATH 19A", "STEV 1"];
let currentTerm = "";
let seasons = ["Fall", "Winter", "Spring", "Summer"];
let years = ["2019-2020", "2020-2021", "2021-2022", "2022-2023"];
let yearCount = 3;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


/////////////////////////////////////////////Set-up/create your MONGODB DATABASE///////////////////////////////////////
const url = 'mongodb://localhost:27017'; //database connection URL
const dbName = 'scheduleDB'; //database dbName
const client = new MongoClient(url, {useUnifiedTopology: true});//create a new instance of MongoClient
////////////////////CONNECT your database(Client) to this SERVER via port 27017////////////////////////
client.connect(function(err){
  assert.equal(null, err);
  console.log("Mongodb connected successfully to the server via port 27017");
  db = client.db(dbName); //assign db object
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////Load the home page "schedule.ejs" (i.e. schedule.ejs "gets" "/" from app.js)/////////
app.get("/", function(req, res) {
  //Express (using ejs) finds & modifies the schedule.ejs file
  res.render("schedule",{
    quarterCourses: q1,
    seasons: seasons,
    years: years
  });
});
////////////////////////////////////////////////////////////////////////////////
app.post("/", function(req, res){
  if(req.body.editYear === "add"){
    years.push("Incomplete");
  }
  if(req.body.editYear === "remove"){
    years.pop();
  }
  res.redirect("/");
});
////////Load the edit page "edit.ejs" (i.e. edit.ejs "gets" "/edit" from app.js)/////////
app.get("/edit", function(req, res) {
  //Express (using ejs) finds & modifies the edit.ejs file
  res.render("edit",{
    quarterCourses: q1,
    currentTerm: currentTerm
  });
});

////For when a user clicks on a quarter, activating the html form "q1" (schedule.ejs)
app.post("/edit", function(req, res){
  ////redirect to the edit page
  let season_index = (req.body.q) %4;
  let year_index = Math.floor(req.body.q/4);
  let season = seasons[season_index];
  let year = years[year_index];
  currentTerm = season + " " + year;
  res.redirect("/edit");
});

//////fire up the server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
