class Platform {
  constructor(topLeftCoordinate, width, height, color, isAffectedByGravity, isSolidObject) {
    if (!color) {
      color = "#663333";
    }
    this.position = topLeftCoordinate;
    this.oldPosition = new Coord(topLeftCoordinate.x, topLeftCoordinate.y);
    this.width = width;
    this.height = height;
    this.color = color;
    this.boundingContainer = new BoundingBox(this.position, this.width, this.height);
    this.isAffectedByGravity = !!isAffectedByGravity;
    this.isSolidObject = !isSolidObject;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.sprite = new Rectangle(this.position, this.width, this.height);
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
    this.position.x += this.xSpeed;
    this.position.y += this.ySpeed;
  }

  draw(context) {
    this.sprite.draw(context, this.color);
  }
}
