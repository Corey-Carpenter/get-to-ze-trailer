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


/*function createVideo() {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var scriptTag = document.getElementsByTagName("script")[0];
    scriptTag.parentNode.insertBefore(tag, scriptTag);
    }

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
        player = new YT.Player("player", {
          height: "390",
          width: "640",
          videoId: videoId,
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
*/

//onYouTubeIframeAPIReady();
