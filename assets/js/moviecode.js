var lastMovieName;
var displayDiv = document.querySelector("#result-grid")

function generateMovie() {
  var lastMovieName=  localStorage.getItem("movieIdLink");
  var h3 = document.createElement("h3")
  h3.textContent = lastMovieName
  displayDiv.appendChild(h3)
}

console.log(localStorage.getItem('movieIdLink'));
//console.log(localStorage.getItem("userNamesearch"));


document.getElementById("movie-title").innerHTML = localStorage.getItem("movieTitle");
alert (localStorage.getItem("movieTitle");)