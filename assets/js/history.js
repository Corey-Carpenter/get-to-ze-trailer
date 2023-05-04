var lastMovieName;
var displayDiv = document.querySelector("#result-grid")

function lastMovieTitle() {
  lastMovieName=  localStorage.getItem("placeholderName")
  var h3 = document.createElement("h3")
  h3.textContent = lastMovieName
  displayDiv.appendChild(h3)
}



lastMovieTitle();