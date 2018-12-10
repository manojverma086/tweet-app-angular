var spawn = require('child_process').exec;

var child = spawn('twitter-proxy ./config.json');
//var httpserver = spawn('http-server');
child.on('message', function(message) {
    console.log(message);
})
child.on('error', function(error) {
    console.log(error);
});
// httpserver.on('error', function(error) {
//     console.log(error);
// });


//console.log('Server running on http://localhost:8080');
console.log('Request the Twitter API using: http://localhost:7890/1.1/statuses/user_timeline.json\?count\=30\&screen_name\=makeschool');

