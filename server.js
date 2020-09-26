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
let usersCourses = [["CSE 20","MATH 19A","STEV 1"],['WRIT 1','STEV 2','CSE 30'],['INVOLUNTARY LEAVE OF ABSENSE'],['MATH 19B','MATH 21','HIS 10A','THEA 14','STAT 131','MATH 23A'],[],[],[],[],[],[],[],[],[],[],[],[]];
let allCourses = ['CSE 20','CSE 30','CSE 16', 'CSE 12', 'CSE 13S']
let currentTerm = "Undefined";
let seasons = ["Fall", "Winter", "Spring", "Summer"];
let years = ["Freshman", "Sophomore", "Junior", "Senior"];
let chosenTerm_index = 0;

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
    usersCourses: usersCourses,
    seasons: seasons,
    years: years
  });
});
////////////////////////////////////////////////////////////////////////////////
app.post("/", function(req, res){
  if(req.body.name === "add-year"){
    years.push("Super");
    usersCourses.push([],[],[],[]);
    res.redirect("/");
  }else if(req.body.name === "remove-year" && years.length>4){
    years.pop();
    usersCourses.pop([],[],[],[]);
    res.redirect("/");
  }else if((req.body.name === "remove-year" && years.length<=4) || (req.body.name === "add-year" && year.length>=8)){
    res.redirect("/");
  }else{
    ////redirect to the edit page
    chosenTerm_index = req.body.name;
    let season_index = chosenTerm_index %4;
    let year_index = Math.floor(chosenTerm_index/4);
    let season = seasons[season_index];
    let year = years[year_index];
    currentTerm = season + " | " + year;
    res.redirect("/edit");
  }
});
////////Load the edit page "edit.ejs" (i.e. edit.ejs "gets" "/edit" from app.js)/////////
app.get("/edit", function(req, res) {
  //Express (using ejs) finds & modifies the edit.ejs file
  res.render("edit",{
    currentTermCourses: usersCourses[chosenTerm_index],
    currentTerm: (currentTerm + " Year"),
    allCourses: allCourses
  });
});

////For when a user clicks on a quarter, activating the html form "quarter" (schedule.ejs)
app.post("/edit", function(req, res){
  if (req.body.addCourse){
    let courseName = allCourses[req.body.addCourse];
    usersCourses[chosenTerm_index].push(courseName);
    res.redirect("/edit");
  }else{
      let index = parseInt(req.body.removeCourse);
      let a = usersCourses[chosenTerm_index].slice(0, index);
      let b = usersCourses[chosenTerm_index].slice(index+1,usersCourses[chosenTerm_index].length +1);
      if(a===[] && b===[]){
        usersCourses[chosenTerm_index] = [];
        res.redirect("/edit");
      }else{
        usersCourses[chosenTerm_index] = a.concat(b);
        res.redirect("/edit");
      }
  }
});


//////fire up the server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
