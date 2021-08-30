class Player {
  constructor(topLeftcoordinate) {
    this.position = topLeftcoordinate;
    this.oldPosition = new Coord(topLeftcoordinate.x, topLeftcoordinate.y);
    this.width = 25;
    this.height = DEFAULT_PLAYER_HEIGHT;
    this.color = "#39f";
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.boundingContainer = new BoundingBox(this.position, this.width, this.height);
  }

  applyGravity() {
    this.ySpeed += LOOP_TIME * DEFAULT_GRAVITY;
  }

  stopFalling() {
    this.ySpeed = 0;
  }

  draw(context) {
    context.beginPath();
    context.rect(this.position.x, this.position.y, this.width, this.height);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  keepInsideViewportLimits() {
    if (this.position.y <= 0) {
      this.oldPosition.y = this.position.y;
      this.position.y = 0;
      this.ySpeed = 0;
    }
    if (this.position.x <= 0) {
      this.oldPosition.x = this.position.x;
      this.position.x = 0;
    }
    if (this.position.x >= SCREEN_WIDTH - this.width) {
      this.oldPosition.x = this.position.x;
      this.position.x = SCREEN_WIDTH - this.width;
    }
    if (this.position.y + this.height >= SCREEN_HEIGHT) {
      isPaused = true;
      isGameOver = true;
    }
  }

  isColliding() {
    let hasLanded = false;
    platforms.forEach(platform => {
      if (CollisionManager.areBoundingContainersColliding(this.boundingContainer, platform.boundingContainer)) {
        if (CollisionManager.isCollidingFromTop(player, platform)) {
          isPlayerJumping = false;
          this.stopFalling();
          this.adjustPositonToTopOfElement(platform);
          hasLanded = true;
        }

        if (CollisionManager.isCollidingFromLeft(player, platform)) {
          this.adjustPostionToLeftOfElement(platform);
        } else if (CollisionManager.isCollidingFromRight(player, platform)) {
          this.adjustPostionToRightOfElement(platform);
        } else if (CollisionManager.isCollidingFromBottom(player, platform)) {
          this.adjustPostionToBottomOfElement(platform);
          this.ySpeed = 0;
        }
      }
    });

    coins = coins.filter(coin => {
      if (CollisionManager.areBoundingContainersColliding(this.boundingContainer, coin.boundingContainer)) {
        coinCounter++;
        return false;
      }
      return true;
    });

    doors.forEach(door => {
      if (CollisionManager.areBoundingContainersColliding(this.boundingContainer, door.boundingContainer)) {
        alert('Change scene!');
      }
    })
    return hasLanded;
  }

  move() {
    this.oldPosition.x = this.position.x;
    this.position.x += this.xSpeed;

    let hasLanded = this.isColliding();

    if (!hasLanded) {
      this.oldPosition.y = this.position.y;
      this.applyGravity();
    }

    this.position.y += this.ySpeed;

    this.keepInsideViewportLimits();
  }

  adjustPositonToTopOfElement(object) {
    this.position.y = object.position.y - this.height;
  }

  adjustPostionToLeftOfElement(object) {
    this.position.x = object.position.x - this.width - COLLISION_SPACER;
  }

  adjustPostionToRightOfElement(object) {
    this.position.x = object.position.x + object.width + COLLISION_SPACER;
  }

  adjustPostionToBottomOfElement(object) {
    this.position.y = object.position.y + object.height + COLLISION_SPACER;
  }

  updateSpeed() {
    this.xSpeed = 0;
    if (rightKeyPressed) this.xSpeed += 2;
    if (leftKeyPressed) this.xSpeed -= 2;
    if (!isPlayerJumping && this.ySpeed <= LOOP_TIME * DEFAULT_GRAVITY && jumpKeyPressed) {
      this.ySpeed -= 4;
      isPlayerJumping = true;
      jumpKeyPressed = false;
      this.oldPosition.y = this.position.y;
      this.position.y -= COLLISION_SPACER;
    }
  }
}
