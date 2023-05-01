var OMDBKey = "b4d0ef09&";
var OMDBURL = "http://www.omdbapi.com/";

function getOMDBAPI() {
    fetch ("http://www.omdbapi.com/?apikey="+OMDBKey+"&i=tt0093773&plot=full")
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.Plot);
      });
}

var movieTitle = "Predator";
var youtubeKey = "AIzaSyAsA-iqUV-RlNydntlU4Ft0L_5KY9RRkDI";
var youtubeURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="+movieTitle+"%20Trailer&type=video&key="+youtubeKey;
var trailersArray = [];

function getYoutubeAPI() {
    fetch (youtubeURL)
        .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            for (i = 0; i < data.items.length; i++) {
                var results = data.items[i];
                var videoIDs = results.id.videoId;
                trailersArray.push(videoIDs);
                var trailerPlayer = document.querySelector("#ytplayer");
                if (trailersArray[0] !== null) {
                trailerPlayer.setAttribute("src", "https://www.youtube.com/embed/"+trailersArray[0]);
                }
                else {
                    for (i=1; i<trailersArray.length; i++) {
                        trailerPlayer.setAttribute("src", "https://www.youtube.com/embed/"+trailersArray[i]);
                    }
                }
          }
        });
}

getOMDBAPI();
getYoutubeAPI();

const searchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list")

//loads the movies from OMDb API
async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=b4d0ef09&`;
    //fetches results from api based on search term
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.response == "True") displayMovies(data.Search);
};

//finds movies on keyup when we finish the html
//TODO: add hide-search-list id that displays none in CSS
//TODO: either have it load movies on this page or set it up to load on movies.html
function findMovies() {
    let searchTerm = (searchBox.value);
    if (searchTerm.length > 0) {
        loadMovies(searchTerm);
    } else { 
        searchList.classList.add('hide-search-list');
    };
};


//diplays movies in dropdown
function displayMovies (movies) {
  searchList.innerHTML = "";
  for (let i = 0; i <movies.length; i++) {
    let movieList = document.getElementById("div");
   //not sure if this gets the imdb id or not. its supposed to based on the search
    movieList.dataset.id = movies[i].imdbID;
    //need css class or id "search-list"
    movieList.classList.add("search-list");
    //displays image not found png if there isn't a poster available. Else displays the poster
    //TODO: add an image not found png in assets folder
    if (movies[i].Poster != "N/A")
          moviePoster = movies[i].Poster;
    else
          moviePoster = "" //insert image not found png

          //I think this should be displayed on the page through inline html
          movieList.innerHTML = `
          <div class = "search-item-thumbnail">
              <img src = "${moviePoster}">
          </div>
          <div class = "search-item-info">
              <h3>${movies[i].Title}</h3>
              <p>${movies[i].Year}</p>
          </div>
          `;
          searchList.appendChild(movieList);
  };
};

//TODO: attach the upper js to the search bar
//TODO: make the click on the search results bring up movies.html