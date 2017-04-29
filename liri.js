var myTwitter = require("./key.js");
var twitter = require("twitter");
var myKeys = myTwitter.twitterKeys;
// var myCustomerKey = myKeys.consumer_key;
// var myConsumerSecret = myKeys.consumer_secret;
// var myAccessTokenKey = myKeys.access_token_key;
// var myAccessTokenSecret = myKeys.access_token_secret;
var spotify = require("spotify");
var request = require('request');
var fs = require('fs');

function commandLine(){
	 userInput = process.argv[2];
	if(userInput === "my-tweets"){
	 	myTweets();
	 }
	 else if (userInput === "spotify-this-song" ){
	 	//var song = process.argv;
	 	var userSong = ""
	 	for (var i = 3; i < process.argv.length; i++){
	 		userSong += process.argv[i] + " ";	
	 	}
	 	
	 	mySpotify(userSong);
	 }
	 else if(userInput === "movie-this"){
	 	 var userInput = process.argv;
		 var movie = ""
		 for (var i = 3; i < userInput.length; i++) {
		       movie += userInput[i] + " ";
		      };
			 	myMovie(movie);
			 }
		else if(userInput === "do-what-it-says"){
			 	doThis();
			 }
}
commandLine();
function myTweets(){
		 var params = {screen_name: "@michaeljones118", count: "20"}

		 myKeys.get("statuses/user_timeline", params, function(error, tweets, response){
				if(!error){
					for(tweet in tweets){			
						
						console.log(tweets[tweet].created_at);
						console.log(tweets[tweet].text);
				
					 	console.log("----------------------------")
					 	fs.appendFile("log.txt","tweets[tweet].text");
					 	fs.appendFile("log.txt","tweets[tweet].created_at");

					 }
				}
				else {
					console.log("error");
					}
			 
		});
};
function mySpotify(userSong){

  if (userSong === undefined) {
    userSong = "The Sign Ace of Base";
  }
	
  spotify.search({ 
		type: 'track', 
		query: userSong
	}, function(err, data) {
	    if (err) throw err;
	    
		var music = data.tracks.items;
		
		    for (var i = 0; i<music.length; i++){
		    	for (j=0; j<music[i].artists.length; j++){
		    	    console.log("Artist: " + music[i].artists[j].name);
		        	console.log("Song Name: " + music[i].name);
		        	console.log("Preview Link of the song from Spotify: " + music[i].preview_url);
		        	console.log("Album Name: " + music[i].album.name + "\n");

		        	fs.appendFile('log.txt', "\n");
		        	fs.appendFile("log.txt", "Artist: " + music[i].artists[j].name);
		        	fs.appendFile("log.txt", "Song Name: " + music[i].name);
		        	fs.appendFile("log.txt", "Preview Link of the song from Spotify: " + music[i].preview_url);
		        	fs.appendFile("Album Name: " + music[i].album.name + "\n");
			}	

		}
		
		});
	
}

function myMovie(movie){
	
	
	request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
		if(!error) 
		//JSON.parse the body of the result and store it in the variable json for easier access
		json = JSON.parse(body);
		
		console.log("Title: " + json.Title);
		console.log("Year: " + json.Year);
		console.log("Rated: " + json.Rated);
		console.log("Country: " + json.Country);
		console.log("Language: " + json.Language);
		console.log("Director: " + json.Director);
		console.log("Actors: " + json.Actors);
		console.log("Plot: " + json.Plot);
		console.log("imdbRating: " + json.imdbRating);
		console.log("Rotten Tomatoes Rating: " + json.tomatoRating);
		console.log("Rotten Tomatoes URL: " + json.tomatoURL);

		//append the results to the log.txt file
		fs.appendFile('log.txt', "\n");
		fs.appendFile("log.txt", "\n" + "Title: " + json.Title + "\n");
		fs.appendFile("log.txt", "Year: " + json.Year + "\n");
		fs.appendFile("log.txt", "Rated: " + json.Rated + "\n");
		fs.appendFile("log.txt", "Country: " + json.Country + "\n");
		fs.appendFile("log.txt", "Language: " + json.Language + "\n");
		fs.appendFile("log.txt", "Director: " + json.Director + "\n");
		fs.appendFile("log.txt", "Actors: " + json.Actors + "\n");
		fs.appendFile("log.txt", "Plot: " + json.Plot + "\n");
		fs.appendFile("log.txt", "imdbRating: " + json.imdbRating + "\n");
		fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + json.tomatoRating + "\n");
		fs.appendFile("log.txt", "Rotten Tomatoes URL: " + json.tomatoURL + "\n");

	})
}
function doThis(){

	fs.readFile("random.txt","utf8",function(err,data){

	console.log(data);
	var dataArr = data.split(",");
	userSong = dataArr[1];
	mySpotify(userSong);
	});
}