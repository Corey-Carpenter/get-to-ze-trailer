var searchedMovies;
const searchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// loads movies from OMDB API
//fetches results from api based on search term
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=b4d0ef09&`;
     //uses await to pause execution of loadMovies
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if(data.Response == "True") displayMovieList(data.Search);
}

//finds movies on keyup through use of html
function findMovies(){
    let searchTerm = (searchBox.value).trim();
    //hides if there is nothing typed
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

//displays movies in dropdown
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movieListItem = document.createElement('div');
         //Gets imdb ID based on the search value
        movieListItem.dataset.id = movies[i].imdbID; 
        movieListItem.classList.add('search-list-item');
         //displays image not found png if there isn't a poster available. Else displays the poster
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "error404.html";

        //displayed through inline html
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

//loads movies details using the IMDB id from above
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {

            searchList.classList.add('hide-search-list');
            searchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=b4d0ef09&`);
            const movieDetails = await result.json();
            // searchedMovies = localStorage.getItem("placeHolderName");
            // console.log("@@@@@@@@@@@",searchedMovies)
            // searchedMovies.push(movieDetails.Title)
            // console.log("*******", searchedMovies)
            localStorage.setItem("placeholderName", movieDetails.Title);
            //console.log(movieDetails.Title);
            displayMovieDetails(movieDetails);
        });
    });
}

//displays the details grabbed in loadMovieDetails
function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
     <a href="movies.html">   <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster" ></a>
    </div>
    <div class = "movie-info"> 
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
};

//hides search list if anywhere outside is clicked
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});


