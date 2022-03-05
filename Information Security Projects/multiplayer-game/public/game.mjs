import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d');
const currentPlayer = new Player({ x: Math.floor(getRandomPosition(30, canvas.width - 30) / 150) * 150, y: Math.floor(getRandomPosition(50, canvas.height - 50) / 50) * 50, score: 0, id: getRandomId() })

var collectible
var direction = ""
var players = []
var playerRank = 0
const width = 15
const height = 35
const speed = 25
var canCatch = true
var emittedCollectible = false

// Load images on init for quicker operation later
var flag = new Image();
flag.src = '/assets/flag.png';
var playerAvatar = new Image();
playerAvatar.src = '/assets/player.png'
var opponentAvatar = new Image();
opponentAvatar.src = '/assets/opponent.png'

socket.emit('newPlayer', currentPlayer);


const render = (gameState) => {
    context.clearRect(0, 0, 640, 480);
    //  Generate collectible
    if (gameState.collectible) {
        context.drawImage(flag, gameState.collectible.x, gameState.collectible.y)
    }

    // Generate player and opponent avatars
    for (let player in gameState.players)
        if (gameState.players[player].id == currentPlayer.id)
            context.drawImage(playerAvatar, gameState.players[player].x, gameState.players[player].y)
        else
            context.drawImage(opponentAvatar, gameState.players[player].x, gameState.players[player].y)

    // Game Title
    context.fillStyle = "white";
    context.font = "12pt 'Press Start 2P'";
    context.textAlign = "center";
    context.fillText('CAPTURE THE FLAG!', 150, 30);

    // Player score
    context.font = "12pt 'Press Start 2P'";
    context.fillText("Score: " + currentPlayer.score, 375, 30);

    // Get player's rank
    context.font = "12pt 'Press Start 2P'";
    context.fillText(playerRank, 540, 30);
}

socket.on("state", (gameState) => {
    if (!gameState)
        return

    // Emit a new collectible if no collectible is present
    if (!gameState.collectible && gameState.lobbyLeader == currentPlayer.id && !emittedCollectible) {
        socket.emit("newCollectible", new Collectible({ x: getRandomPosition(20, canvas.width - 20), y: getRandomPosition(70, canvas.height - 50), value: 1, id: getRandomId() }))
        emittedCollectible = true

        // Add a delay before emitting a new collectible to prevent early execution after the last one is collected
        setInterval(() => {
            emittedCollectible = false
        }
            , 1000)
    }
    else
        collectible = gameState.collectible

    if (players.length)
        playerRank = currentPlayer.calculateRank(players)

    if (collectible)
        if (currentPlayer.collision(collectible) && canCatch) {
            socket.emit("collectibleCaught", { id: currentPlayer.id, value: collectible.value })
            currentPlayer.score += collectible.value;
            canCatch = false

            // Add a delay after catching the collectible to prevent early emission of the new collectible
            setInterval(() => {
                canCatch = true
            }
                , 1000)
        }

    if (players.length != gameState.nbPlayers) {
        players = []
        for (let player in gameState.players)
            players.push(gameState.players[player])
    }
    render(gameState)
})

const keyDownHandler = (e) => {
    if ((e.keyCode == 37 || e.keyCode == 65) && currentPlayer.x > width * 1.1)
        direction = "left"
    else if ((e.keyCode == 39 || e.keyCode == 68) && currentPlayer.x < (640 - width) * 0.97)
        direction = "right"
    else if ((e.keyCode == 38 || e.keyCode == 87) && currentPlayer.y > height * 1.5)
        direction = "up"
    else if ((e.keyCode == 40 || e.keyCode == 83) && currentPlayer.y < (480 - height) * 0.95)
        direction = "down"
    else direction = "none"

    currentPlayer.movePlayer(direction, speed)
}

function getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomId() {
    var id = '';
    for (var i = 0; i < 5; i++) {
        id += Math.floor(Math.random() * 9);
    }
    return id;
}

setInterval(() => {
    socket.emit("playerMoved", currentPlayer)
}
    , 1000 / 60)

document.addEventListener('keydown', keyDownHandler, false);