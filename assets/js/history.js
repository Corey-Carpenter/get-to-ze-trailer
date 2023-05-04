var lastMovieName;
var lastMoviePlot;
var lastMovieYear;
var displayDiv = document.querySelector("#past-result-grid")

function lastMovieTitle() {
  lastMovieName =  localStorage.getItem("Title")
  lastMoviePlot = localStorage.getItem("Plot")
  lastMovieYear = localStorage.getItem("Year")
  var title = document.createElement("h1")
  title.textContent = lastMovieName
  title.classList.add("movie-title")
  var year = document.createElement("h3")
  year.textContent = lastMovieYear
  var plot = document.createElement("h3")
  plot.textContent = lastMoviePlot
  displayDiv.appendChild(title)
  displayDiv.appendChild(year)
  displayDiv.appendChild(plot)
}

lastMovieTitle();