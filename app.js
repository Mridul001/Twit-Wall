const express = require('express');
const app = express();

const Twit = require('twit');
const dotenv = require('dotenv');

const server = require('http').Server(app);
var io = require('socket.io')(server);


dotenv.config();


// Static Files
app.use(express.static('public'));

const T= new Twit({
  consumer_key: process.env.consumer_key , 
  consumer_secret:process.env.consumer_secret ,
  access_token:  process.env.access_token,
  access_token_secret: process.env.access_token_secret ,
  
});




// STREAM is an Event Emitter...
// T.stream keeps the connection alive...
var stream = T.stream('statuses/filter', { track: '#India', language: 'en' }); 


tweetArray = [];

// And from here begins the show..

// For any new Tweet.
io.on('connection', function(socket){
  stream.on('tweet', async(tweet)=>{
      socket.emit('newTweet', tweet);
  });
});



// listen for requests :)
const listener = server.listen(3000, function() {
  console.log('Your server is working');
});
