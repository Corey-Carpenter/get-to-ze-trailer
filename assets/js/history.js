var lastMovieName;
var lastMoviePlot;
var displayDiv = document.querySelector("#past-result-grid")

function lastMovieTitle() {
  lastMovieName =  localStorage.getItem("Title")
  lastMoviePlot = localStorage.getItem("Plot")
  var title = document.createElement("h1")
  title.textContent = lastMovieName
  title.classList.add("movie-title")
  var plot = document.createElement("h3")
  plot.textContent = lastMoviePlot
  displayDiv.appendChild(title)
  displayDiv.appendChild(plot)
}

lastMovieTitle();