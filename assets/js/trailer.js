var movieTitle = localStorage.getItem("Title");
var movieYear = localStorage.getItem("Year");
//var youtubeKey = "AIzaSyAsA-iqUV-RlNydntlU4Ft0L_5KY9RRkDI";
var youtubeKey = "AIzaSyBnJ3LiEueVNautOkrnV1EXO_WdetfvkGI";
var youtubeURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q="+movieTitle+movieYear+"%20Trailer&type=video&key="+youtubeKey;
var trailersArray = [];
console.log(movieTitle);
console.log(movieYear);


function getYoutubeAPI() {
    fetch (youtubeURL)
        .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (i = 0; i < data.items.length; i++) {
                var results = data.items[i];
                var videoIDs = results.id.videoId;
                trailersArray.push(videoIDs);
                var trailerPlayer = document.querySelector("#yt-player");
                var trailerTitle = document.querySelector("#trailer-title");
                trailerTitle.textContent = movieTitle;
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

getYoutubeAPI();