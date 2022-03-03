require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');
const helmet = require("helmet");

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet.noSniff());
app.use(helmet.xssFilter({}));
app.use(helmet.noCache());

// Force headers
app.use((req, res, next) => {
  res.setHeader( 'X-Powered-By', 'PHP 7.4.3' );
  next();
});

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({ origin: '*' }));

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});


const io = socket(server)
const gameState = {
  players: {},
  lobbyLeader: ""
}

// Connect to socket.io game lobby
io.on('connection', (socket) => {
  console.log("Server: a user connected:", socket.id);

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected")
    // Assign a new lobby leader if lobby leader quits with active players in lobby
    if (gameState.players.length > 1)
      if (lobbyLeader == gameState.players[socket.id].id)
        lobbyLeader = gameState.players[0].id

    delete gameState.players[socket.id]
  })

  // Handle a new player joining the game
  socket.on('newPlayer', (player) => {
    console.log("Server : New player '%s' joined the game!", player.id)
    gameState.players[socket.id] = player
    gameState.lobbyLeader = player.id
    console.log(gameState)
  })

  // Update gamestate when a player moves
  socket.on("playerMoved", (player) => {
    if (gameState.players[socket.id]) {
      gameState.players[socket.id].x = player.x
      gameState.players[socket.id].y = player.y
    }
  })

  // Spawn a new collectible
  socket.on("newCollectible", (collectible) => {
    console.log("New Collectible:", collectible.id)
    gameState.collectible = collectible
  })

  // Handle collectible catching event
  socket.on("collectibleCaught", (playerandcollectible) => {
    console.log("Collectible Caught")
    delete gameState.collectible
    for (var player in gameState.players) {
      if (gameState.players[player].id == playerandcollectible.id)
        gameState.players[player].score += playerandcollectible.value
      gameState.caughtLastCollectible = playerandcollectible.id
    }
    console.log(gameState.players)
  })
})

// Update game state every frame (16.66ms) elapsed assuming 60fps gameplay
setInterval(() => {
  io.sockets.emit('state', gameState);
}, 1000 / 60);


module.exports = app; // For testing
