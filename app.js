//////Using the Node framework of javascript/////////
//////Bring in Libraries from npm(online repo of node moddules/libraries)//////
const express = require("express");
const bodyParser = require("body-parser");
//////////Create Library Objects/////////////////
const app = express();
/////////Use those library objects////////////
///////////////Store lists as arrays/////////////////////
let courses = ["CSE 20", "MATH 19A", "STEV 1"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
/////////////////////////////////////////////////////////////////////////////////
////////Load the home page "schedule.ejs" (i.e. schedule.ejs "gets" "/" from app.js)/////////
app.get("/", function(req, res) {
  //Express (using ejs) finds & edits the schedule.ejs file
  res.render("schedule",{newListItems: courses});
});
////////////////////////////////////////////////////////////////////////////////
app.get("/edit", function(req, res) {
  //Express (using ejs) finds & edits the schedule.ejs file
  res.render("edit");
});
////For when a user posts the input "newCourse" via an html form "itemInput" (list.ejs)
app.post("/edit", function(req, res){
  res.redirect("/edit");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
