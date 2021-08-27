class Player {
  constructor(topLeftcoordinate) {
    this.position = topLeftcoordinate;
    this.oldPosition = new Coord(topLeftcoordinate.x, topLeftcoordinate.y);
    this.width = 25;
    this.height = DEFAULT_PLAYER_HEIGHT;
    this.color = "#ff0000";
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
    }
    if (this.position.x >= SCREEN_WIDTH - this.width) {
      this.oldPosition.x = this.position.x;
      this.position.x = SCREEN_WIDTH - this.width;
    }
    if (this.position.x <= 0) {
      this.oldPosition.x = this.position.x;
      this.position.x = 0;
    }
  }

  move() {
    this.oldPosition.x = this.position.x;
    this.position.x += this.xSpeed;

    const isPlayerCollidingWithFloor = CollisionManager.areBoundingContainersColliding(this.boundingContainer, floor.boundingContainer);
    const isPlayerTouchingTheFloorFromTop = isPlayerCollidingWithFloor && CollisionManager.isCollidingFromTop(player, floor);
    const isPlayerCollidingWithSolid = CollisionManager.areBoundingContainersColliding(this.boundingContainer, solidObject1.boundingContainer);
    const isPlayerTouchingSolidObjectFromTop = isPlayerCollidingWithSolid && CollisionManager.isCollidingFromTop(player, solidObject1);
    const isPlayerTouchingSolidObjectFromBottom = isPlayerCollidingWithSolid && CollisionManager.isCollidingFromBottom(player, solidObject1);

    const isPlayerOverSolidSurface = isPlayerTouchingTheFloorFromTop || isPlayerTouchingSolidObjectFromTop;
    if (isPlayerOverSolidSurface) {
      isPlayerJumping = false;
      this.stopFalling();
      if (isPlayerTouchingTheFloorFromTop) {
        this.adjustPositonToTopOfElement(floor);
      } else if (isPlayerTouchingSolidObjectFromTop) {
        this.adjustPositonToTopOfElement(solidObject1);
      }
    } else {
      this.oldPosition.y = this.position.y;
      this.applyGravity();
    }

    if (isPlayerCollidingWithSolid) {
      if (CollisionManager.isCollidingFromLeft(player, solidObject1)) {
        this.adjustPostionToLeftOfElement(solidObject1);
      } else if (CollisionManager.isCollidingFromRight(player, solidObject1)) {
        this.adjustPostionToRightOfElement(solidObject1);
      }
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

  updateSpeed() {
    this.xSpeed = 0;
    if (rightKeyPressed)
      this.xSpeed += 2;
    if (leftKeyPressed)
      this.xSpeed -= 2;
    if (!isPlayerJumping && this.ySpeed <= LOOP_TIME*DEFAULT_GRAVITY && jumpKeyPressed) {
      this.ySpeed -= 4;
      isPlayerJumping = true;
      jumpKeyPressed = false;
      this.oldPosition.y = this.position.y;
      this.position.y -= COLLISION_SPACER;
    }
  }
}
