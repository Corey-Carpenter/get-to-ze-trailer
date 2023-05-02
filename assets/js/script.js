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
<<<<<<< HEAD
/*
getOMDBAPI();
getYoutubeAPI();
*/

const searchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (searchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "error404.html";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            searchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster" src="movies.html" >
    </div>
    <div class = "movie-info">
        <a href="movies.html" class = " button is-info"> Link </a> 
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
=======

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
>>>>>>> d1a4dbecc807acfa052e3272f89308936f60fc92
