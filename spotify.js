var spotify = require('spotify');
 
// if (type == "spotify") {
  var userSelection = "thriller";
  // if (songTitle === undefined) {
  //   songTitle = "what's my age again";
  // }
  spotify.search({ 
		type: 'track', 
		query: userSelection
	}, function(err, data) {
	    if (err) throw err;
	    //this sets the variable music to get the initial information from the object, just so it's easier to call in the for loop below
		var music = data.tracks.items;
		//this loops through the object that we get from spotify and then loops through each objects information to get what we need from spotify
		    for (var i = 0; i<music.length; i++){
		    	for (j=0; j<music[i].artists.length; j++){
		    	    console.log("Artist: " + music[i].artists[j].name);
		        	console.log("Song Name: " + music[i].name);
		        	console.log("Preview Link of the song from Spotify: " + music[i].preview_url);
		        	console.log("Album Name: " + music[i].album.name + "\n");
			}	
		}
		console.log(data.tracks.items.artists.name);
	});