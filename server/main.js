import { Meteor } from 'meteor/meteor';
var apiai = require('apiai');
var config = require('./config');
var http = require('http');

Meteor.startup(() => {
  // code to run on server at startup
});

var app = apiai(config.CLIENT_ACCESS_TOKEN);
var omdbApiUrl = "http://www.omdbapi.com/?t=";

Meteor.methods({
  'userRequest': function(userRequest) {
    console.log(userRequest.userText);
    return new Promise(function(resolve,reject){
      var request = app.textRequest(userRequest.userText, {
          sessionId: 'aidhuojas2kwe2sda'
      });
      request.on('response', function(response) {
          console.log(response.result.fulfillment.speech);
          resolve(response.result.fulfillment.speech);
      });
      request.on('error', function(error) {
          console.log(error);
          reject(error);
          // return "Im malfunctioning...cyber apocalypse is here!! >:D ";
      });
      request.end();
    })
  },
  'movieRequest': function(movieName) {
    return new Promise(function(resolve,reject){

    });

  }
});

//REST API Routes
Router.route('/api/v1/movie', {where: 'server'})
  .post(function () {
    var movieName = this.request.body.result && this.request.body.result.parameters && this.request.body.result.parameters.movie ? this.request.body.result.parameters.movie : 'The Godfather';
    console.log(movieName);
    var that = this;
    var reqUrl = omdbApiUrl + movieName + "&apiKey=" + config.OMDB_API_KEY;
    http.get(reqUrl,function(apiResponse){
      var completeResponse = '';
       apiResponse.on('data', function(chunk) {
           completeResponse += chunk;
       });
       apiResponse.on('end', function() {
           var movie = JSON.parse(completeResponse);
           var dataToSend = movieName === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
           dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

           var movieData = {
               speech: dataToSend,
               displayText: dataToSend,
               source: 'get-movie-details'
            };
            that.response.writeHead(200);
            that.response.end(JSON.stringify(movieData));
       });
    },function(err){
      console.log(err);
      that.response.writeHead(400);
      that.response.end(JSON.stringify(err));
    })
  });

WebApp.connectHandlers.use('/movie',function(req,res,next) {
});
