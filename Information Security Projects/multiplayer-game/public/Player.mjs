class Player {
  constructor({ x, y, score, id }) {
    this.x = x
    this.y = y
    this.score = score
    this.id = id
    this.horizontalOffset = 15 // depends on the size of the player avatar image
    this.verticalOffset = 35 // depends on the size of the player avatar image
  }

  movePlayer(dir, speed) {
    if (dir != "none") {
      switch (dir) {
        case "right":
          this.x += speed
          break
        case "left":
          this.x -= speed
          break
        case "up":
          this.y -= speed
          break
        case "down":
          this.y += speed
          break
      }
    }
  }

  collision(item) {
    if (this.x < item.x + this.horizontalOffset &&
      this.x > item.x - this.horizontalOffset * 1.4 &&
      this.y < item.y + this.verticalOffset * 0.8 &&
      this.y > item.y - this.verticalOffset * 1.3)
      return true
    else
      return false
  }

  calculateRank(arr) {
    var playerRank = arr.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
    return "Rank: " + (playerRank.length - playerRank.findIndex(player => player.id === this.id)).toString() + '/' + playerRank.length.toString();
  }
}

export default Player;
