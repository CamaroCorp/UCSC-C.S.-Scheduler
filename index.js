
//Schedule Page

//Adds a click functionality to each quarter in order to redirect users to the "edit schedule" page
var quarters = document.querySelectorAll(".quarter");
var number_of_quarters = quarters.length;
for (var i=0; i<number_of_quarters; i++){
  document.querySelectorAll(".quarter")[i].addEventListener("click", function(){
    window.location.href = "editSchedule.html";
  });
}
