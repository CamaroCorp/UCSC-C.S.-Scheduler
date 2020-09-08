
//Schedule Page

var quarters = document.querySelectorAll(".quarter");
var seasons = document.querySelectorAll(".season");
var years = document.querySelectorAll(".year");
var number_of_quarters = quarters.length;
var chosen_quarter_number = 0;
var chosen_season = "season";
var chosen_year = "year";

//Adds a click functionality to each quarter in order to redirect users to the specified "edit schedule" page
for (var i=0; i<number_of_quarters; i++){
  document.querySelectorAll(".quarter")[i].addEventListener("click", function(){

    chosen_quarter_number = this.id;
    season_index = chosen_quarter_number%4;
    year_index = Math.floor(chosen_quarter_number/4);
    chosen_season = seasons[season_index].innerHTML;
    chosen_year = years[year_index].innerHTML;
    alert("pull - " + chosen_season + " " + chosen_year + " - from a database?");

    window.location.href = "rough.html";
  });
}
document.querySelector(".current-term").innerHTML = chosen_season + " " + chosen_year;
