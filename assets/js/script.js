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