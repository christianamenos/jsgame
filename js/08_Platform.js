class Platform {
  constructor(topLeftCoord, width, height, color, isAffectedByGravity, isSolidObject) {
    if (!color) {
      color = "#663333";
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
  }

  applyGravity(gravity) {
    if (this.isAffectedByGravity) {
      if (!gravity)
        gravity = DEFAULT_GRAVITY;
      this.ySpeed += LOOP_TIME * gravity;
    }
  }

  move() {
    this.applyGravity();
    this.pos.x += this.xSpeed;
    this.pos.y += this.ySpeed;
    this.boundBox.pos.copyCoord(this.pos);
  }

  draw(context) {
    this.sprite.draw(context, this.color);
  }
}
