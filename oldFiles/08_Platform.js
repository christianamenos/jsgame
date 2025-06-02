class Platform {
  constructor(topLeftCoord, width, height, color, isAffectedByGravity, isSolidObject, movementSequence) {
    if (!color) {
      color = "#999";
    }
    this.pos = topLeftCoord;
    this.oldPos = Coord.clone(topLeftCoord);
    this.width = width;
    this.height = height;
    this.color = color;
    this.boundBox = new BoundingBox(Coord.clone(this.pos), this.width, this.height);
    this.isAffectedByGravity = !!isAffectedByGravity;
    this.isSolidObject = !isSolidObject;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.sprite = new Rectangle(this.pos, this.width, this.height);
    this.movSeq = movementSequence;
    this.currentMovement = 0;
  }

  applyGravity(gravity) {
    if (this.isAffectedByGravity) {
      if (!gravity) gravity = DEFAULT_GRAVITY;
      this.ySpeed += LOOP_TIME * gravity;
    }
  }

  move() {
    this.oldPos.copyCoord(this.pos);
    if (this.movSeq && this.movSeq.sequence) {
      this.pos.x += this.movSeq.sequence[this.currentMovement].xSpeed;
      this.pos.y += this.movSeq.sequence[this.currentMovement].ySpeed;
      if (this.destReached()) {
        this.pos.copyCoord(this.movSeq.sequence[this.currentMovement].toPos);
        this.currentMovement = (this.currentMovement + 1) % this.movSeq.sequence.length;
      }
    } else {
      this.applyGravity();
      this.pos.x += this.xSpeed;
      this.pos.y += this.ySpeed;
    }
    this.boundBox.pos.copyCoord(this.pos);
  }

  destReached() {
    const targetPos = this.movSeq.sequence[this.currentMovement].toPos;
    const originPos = this.movSeq.sequence[this.currentMovement].fromPos;
    const xIsOvercome = originPos.x <= targetPos.x && this.pos.x >= targetPos.x
    ||  targetPos.x <= originPos.x && this.pos.x <= targetPos.x;
    const yIsOvercome = originPos.y <= targetPos.y && this.pos.y >= targetPos.y
    ||  targetPos.y <= originPos.y && this.pos.y <= targetPos.y;
    return xIsOvercome && yIsOvercome;
  }

  draw(context) {
    this.sprite.draw(context, this.color);
  }
}
