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

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list")

//loads the movies from OMDb API
async function loadMovies(_searchTerm) {
    const URL = "https://omdbapi.com/?s=${searchTerm}&page=1&apikey=b4d0ef09";
    //fetches results from api based on search term
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data.Search);
    if (data.response == "True") displayMovieList(data.Search);
};

//finds movies on keyup
//TODO: add hide-search-list id that displays none
//TODO: either have it load movies on this page or set it up to load on movies.html
function findMovies() {
    let searchTerm = (movieSearchBox.value);
    if (searchTerm.length > 0) {
        loadMovies(searchTerm);
    } else { 
        searchList.classList.add('hide-search-list');
    };
};
