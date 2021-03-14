const path = require("path");
const express = require("express");
const app = express(); // create express app
const db = require('./app/models');
var bodyParser = require('body-parser')
const routes = require('./app/routes/routes')
const Sequelize = require('sequelize');
const DataTypes = require('./app/config/db.config');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// const Connection = require("mysql2/typings/mysql/lib/Connection");
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors);

// parse application/json
// app.use(bodyParser.urlencoded());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
var jsonParser = express.json()


// app.use(function(req, res, next) {
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('matt/public'));
}
// Define API routes here
// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './matt/public/index.html'));
});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});
// parse application/x-www-form-urlencoded

// app.use("/api/profile", profile);
// app.use("/api/posts", posts);
module.exports = function (sequelize, DataTypes) {
  var Songs = sequelize.define("Songs", {

    song: DataTypes.STRING,
    artist: DataTypes.STRING,

  });

  // Performances.associate = function (models) {

  // };
  return Songs;
};
const addSong = (req, res) => {
  let songs = {};

      // Building Customer object from upoading request's body
      songs.song = req.body.song;
      songs.artist = req.body.artist;
     
      // Save to MySQL database
      db.mattdb.create(songs, 
                        {attributes: ['song', 'artist']})
                  .then(result => {    
                    res.status(200).json(result);
                  });

  
}
app.post('/api/song',addSong)

// app.use("/api/song", Songs);

// const songs = Sequelize.define('songs', {
//   id: {
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//   },
//   song: DataTypes.STRING,
//   artist: DataTypes.STRING
// });

  // console.log("heyy")
  // db.Songs.create({
  //     song: request.body.song,
  //     artist: request.body.artist,
  // }).then(function (songs) {
  //     if (songs) {
  //         response.send(songs);
  //     } else {
  //         response.status(400).send('Error in insert new record');
  //     }
  //     res.end()
  // });

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
// Setup a default catch-all route that sends back a wel

// start express server on port 5000
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + 'http://localhost:' + PORT);
  });
});