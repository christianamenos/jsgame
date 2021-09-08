class Player {
  constructor(topLeftCoord) {
    this.pos = topLeftCoord;
    this.oldPos = Coord.clone(this.pos);
    this.width = 25;
    this.height = DEFAULT_PLAYER_HEIGHT;
    this.color = "#39f";
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.boundBox = new BoundingBox(Coord.clone(this.pos), this.width, this.height);
    this.standingPlatform = null;
    this.movingDirection = 1;
  }

  applyGravity() {
    this.ySpeed += LOOP_TIME * DEFAULT_GRAVITY;
  }

  stopFalling() {
    this.ySpeed = 0;
  }

  updateMovingDirection() {
    if (this.movingDirection < 0 && this.oldPos.x < this.pos.x) {
      this.movingDirection = 1;
    } else if (this.movingDirection > 0 && this.oldPos.x > this.pos.x) {
      this.movingDirection = -1;
    }
  }

  draw(context) {
    this.updateMovingDirection();
    let sprites = [
      { shape: new Rectangle(new Coord(this.pos.x + 8, this.pos.y + 28), 15, 13), color: () => "#fa7206" }, // upside
      { shape: new Rectangle(new Coord(this.pos.x + 8, this.pos.y + 41), 15, 1), color: () => "#151515" }, // belt
      { shape: new Rectangle(new Coord(this.pos.x + 8, this.pos.y + 42), 15, 7), color: () => "#fa7206" }, // pants
      { shape: new Rectangle(new Coord(this.pos.x + 8, this.pos.y + 49), 15, 2), color: () => "#151515" }, // shoe
      { shape: new Circle(new Coord(this.pos.x + 15, this.pos.y + 15), 15), color: () => "#3cf" }, // helmet
    ];
    if (this.movingDirection >= 0) {
      sprites.push({ shape: new Rectangle(new Coord(this.pos.x + 2, this.pos.y + 28), 6, 13), color: () => "#293a66" }); // oxygen tanks
      sprites.push({
        shape: new Rectangle(new Coord(this.pos.x + 12, this.pos.y + 32), 13, 6),
        color: () => "#ca5206",
      }); // arm
      sprites.push({ shape: new Rectangle(new Coord(this.pos.x + 25, this.pos.y + 32), 2, 6), color: () => "#151515" }); // hand
    } else {
      sprites.push({
        shape: new Rectangle(new Coord(this.pos.x + 23, this.pos.y + 28), 6, 13),
        color: () => "#293a66",
      }); // oxygen tanks
      sprites.push({ shape: new Rectangle(new Coord(this.pos.x + 6, this.pos.y + 32), 13, 6), color: () => "#ca5206" }); // arm
      sprites.push({ shape: new Rectangle(new Coord(this.pos.x + 4, this.pos.y + 32), 2, 6), color: () => "#151515" }); // hand
    }

    sprites.forEach((sprite) => {
      sprite.shape.draw(context, sprite.color());
    });
  }

  keepInsideViewportLimits() {
    if (this.pos.y <= 30) {
      this.oldPos.y = this.pos.y;
      this.pos.y = 30;
      this.ySpeed = 0;
    }
    if (this.pos.x <= 0) {
      this.oldPos.x = this.pos.x;
      this.pos.x = 0;
    }
    if (this.pos.x >= SCREEN_WIDTH - this.width) {
      this.oldPos.x = this.pos.x;
      this.pos.x = SCREEN_WIDTH - this.width;
    }
    if (this.pos.y >= SCREEN_HEIGHT) {
      gameOver(false);
    }
  }

  updateStandingPlatform() {
    scenes[currentScene].platforms.forEach((platform) => {
      if (
        this.standingPlatform &&
        (this.pos.x + this.width < this.standingPlatform.pos.x ||
          this.pos.x > this.standingPlatform.pos.x + this.standingPlatform.width)
      ) {
        this.standingPlatform = null;
      }

      if (CollisionManager.areBoundingContainersColliding(this.boundBox, platform.boundBox)) {
        if (CollisionManager.isCollidingFromTop(player, platform)) {
          isPlayerJumping = false;
          this.stopFalling();
          this.adjustPositonToTopOfElement(platform);
          this.standingPlatform = platform;
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

    scenes[currentScene].coins = scenes[currentScene].coins.filter((coin) => {
      if (CollisionManager.areBoundingContainersColliding(this.boundBox, coin.boundBox)) {
        coinCounter++;
        return false;
      }
      return true;
    });

    scenes[currentScene].doors.forEach((door) => {
      if (door.status == 1) {
        if (CollisionManager.areBoundingContainersColliding(this.boundBox, door.bBox)) {
          changeScene(door.nextScene, door.nextPlayerPos);
        } else {
          if (CollisionManager.areBoundingContainersColliding(this.boundBox, door.bBoxAnim)) {
            door.open();
          } else {
            door.close();
          }
        }
      }
    });

    scenes[currentScene].servers.forEach((server) => {
      if (
        actionKeyPressed &&
        !server.isFixed &&
        CollisionManager.areBoundingContainersColliding(this.boundBox, server.boundBox)
      ) {
        let msg = "<p>ThE sErVeR iS rUnNinG OuT oF <strong>SPACE</strong>.";
        if (coinCounter < server.secCredsReq) {
          msg += `<br/> CoLlEcT ${server.secCredsReq} sEcUrItY cArDs Or mOrE tO gEt AcCeSs.</p>`;
          Message.openDialog(msg);
          actionKeyPressed = false;
        } else {
          coinCounter -= server.secCredsReq;
          server.isFixed = true;
          if (!server.doesActivateDoors()) {
            gameOver(true);
          } else {
            msg += "<br/> PrOcEdInG cLeAnInG dIsK sPaCe... Operation succeded. All systems running back to normal.</p>";
            Message.openDialog(msg);
            actionKeyPressed = false;
          }
        }
      }
    });
  }

  move() {
    this.oldPos.x = this.pos.x;
    this.pos.x += this.xSpeed;

    this.boundBox.pos.copyCoord(this.pos);
    this.updateStandingPlatform();

    if (this.standingPlatform && this.standingPlatform.movSeq) {
      this.oldPos.y = this.pos.y;
      this.pos.y = this.standingPlatform.pos.y - this.height - COLLISION_SPACER;
    } else {
      this.oldPos.y = this.pos.y;
      this.applyGravity();
      this.pos.y += this.ySpeed;
    }

    this.boundBox.pos.copyCoord(this.pos);
    this.keepInsideViewportLimits();
  }

  adjustPositonToTopOfElement(object) {
    this.pos.y = object.pos.y - this.height - COLLISION_SPACER;
  }

  adjustPostionToLeftOfElement(object) {
    this.pos.x = object.pos.x - this.width - COLLISION_SPACER;
  }

  adjustPostionToRightOfElement(object) {
    this.pos.x = object.pos.x + object.width + COLLISION_SPACER;
  }

  adjustPostionToBottomOfElement(object) {
    this.pos.y = object.pos.y + object.height + COLLISION_SPACER;
  }

  updateSpeed() {
    this.xSpeed = 0;
    if (rightKeyPressed) this.xSpeed += 2;
    if (leftKeyPressed) this.xSpeed -= 2;
    if (!isPlayerJumping && this.ySpeed <= LOOP_TIME * DEFAULT_GRAVITY && jumpKeyPressed) {
      this.ySpeed -= 4;
      this.standingPlatform = null;
      isPlayerJumping = true;
      jumpKeyPressed = false;
      this.oldPos.y = this.pos.y;
      this.pos.y -= COLLISION_SPACER;
    }
  }
}
