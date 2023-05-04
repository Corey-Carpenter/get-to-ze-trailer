$(document).ready(function(){
    var key = 'AIzaSyAsA-iqUV-RlNydntlU4Ft0L_5KY9RRkDI' ;
    var playlistID ='LoveLifeLyrics';
    var URL = "https://www.googleapis.com/youtube/v3/videos";


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistID: playlistID,
    }

    loadVids();

    function loadVids (){
        $.getJSON(URL, options, function (data, textStatus, jqXHR) {
           console.log(data)
          var id = data.items[0].snippets.resourcedId.videoID; 
           
         mainVids(id);
         resultsloop()  

        });

    }

    function mainVids(id){
        $('#video').html(`
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" 
    title="YouTube video player" 
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
    picture-in-picture; web-share" 
    allowfullscreen>
  </iframe>
        `);
    }



    function resultsloop(){

        var thumb = data.items[0].snippet.thumbnails.medium.url;
        var title = item[0].snippet.title;
        var description = item[0].snippet.description.substring(0,100);

        $('main').append( `
        <article>
        <img src="https://www.google.come/logo.jpg" alt= "image" class="thumb"
            <div class ="details">
            <h4>${title}</h4>
            <p>${description}</p>
            </div>
            </articles>
        `
        )



    }



});