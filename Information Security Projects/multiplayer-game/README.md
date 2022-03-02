# [Secure Real Time Multiplayer Game](https://www.freecodecamp.org/learn/information-security/information-security-projects/secure-real-time-multiplayer-game)

Develop a 2D real time multiplayer game using the HTML Canvas API and Socket.io that is functionally similar to this: https://secure-real-time-multiplayer-game.freecodecamp.rocks/. Working on this project will involve you writing your code using one of the following methods:

- Clone this GitHub repo and complete your project locally.
- Use our Replit starter project to complete your project.
- Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the Solution Link field. Optionally, also submit a link to your project's source code in the GitHub Link field. The game can be as simple or complex as you like, as long as all the following user stories are implemented:

1. Multiple players can connect to a server and play.
2. Each player has an avatar.
3. Each player is represented by an object created by the `Player` class in `Player.mjs`.
4. At a minimum, each player object should contain a unique `id`, a `score`, and `x` and `y` coordinates representing the player's current position.
5. The game has at least one type of collectible item. Complete the `Collectible` class in `Collectible.mjs` to implement this.
6. At a minimum, each collectible item object created by the `Collectible` class should contain a unique `id`, a `value`, and `x` and `y` coordinates representing the item's current position.
7. Players can use the WASD and/or arrow keys to move their avatar. Complete the `movePlayer` method in `Player.mjs` to implement this.
8. The `movePlayer` method should accept two arguments: a string of "up", "down", "left", or "right", and a number for the amount of pixels the player's position should change. `movePlayer` should adjust the `x` and `y` coordinates of the player object it's called from.
9. The player's score should be used to calculate their rank among the other players. Complete the `calculateRank` method in the `Player` class to implement this.
10. The `calculateRank` method should accept an array of objects representing all connected players and return the string `Rank: currentRanking/totalPlayers`. For example, in a game with two players, if Player A has a score of 3 and Player B has a score of 5, `calculateRank` for Player A should return `Rank: 2/2`.
11. Players can collide with a collectible item. Complete the `collision` method in `Player.mjs` to implement this.
12. The `collision` method should accept a collectible item's object as an argument. If the player's avatar intersects with the item, the `collision` method should return `true`.
13. All players are kept in sync.
14. Players can disconnect from the game at any time.
15. Prevent the client from trying to guess / sniff the MIME type.
16. Prevent cross-site scripting (XSS) attacks.
17. Nothing from the website is cached in the client.
18. The headers say that the site is powered by "PHP 7.4.3" even though it isn't (as a security measure).

### Testing and additional notes

- To run the tests on Repl.it, set NODE_ENV to test without quotes in the .env file.
- To run the tests in the console, use the command npm run test. To open the Repl.it console, press Ctrl+Shift+P (Cmd if on a Mac) and type "open shell".