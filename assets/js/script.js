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

//getOMDBAPI();
//getYoutubeAPI();


const searchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid'); //we  can change result grid to something else that might better fit because we're not really doing a grid

//loads the movies from OMDb API
async function loadMovies(searchTerm){
    //fetches results from api based on search term
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=b4d0ef09&`;
    //uses await to pause execution of loadMovies
    const result = await fetch(`${URL}`);
    const data = await result.json();
    if(data.Response == "True") displayMovieList(data.Search);
}

//finds movies on keyup through use of html
//right now it's slow but I think it's because it's fetching from omdbAPI on every key up so it takes time for it to process. Still works tho
function findMovies(){
    let searchTerm = (searchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

//diplays movies in dropdown
//might need to adjust how many movies pop up
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movieList = document.createElement('div');
         //Gets imdb IDbased on the search value
        movieList.dataset.id = movies[i].imdbID; 
        movieList.classList.add('search-list-item');
        //displays image not found png if there isn't a poster available. Else displays the poster
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "error404.html";

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
        //right now the above code has the poster at the top, then the title, then the year. We can switch this around however we see fit. I think the poster should stay at the top with the title directly below. I think we maybe add the year below the plot in displayMovieDetails below but I'm up for anything. 

        searchList.appendChild(movieList);
    };
    loadMovieDetails();
};

//load this onto movies.html as well
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            searchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=b4d0ef09&`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

//TODO: create the function that takes clicks/enter to movies html
//TODO: display the movie info and trailer on movies html
//I deleted the whole display function because it was completely copy pasted and we can create our own to display how we want'
//for now I think we should ignore the recommended button and focus on finishing our MVP. I don't know if there's a way to make the movies load faster on keyup because its really slow


//this needs to go to movies.html if I'm not mistaken
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
