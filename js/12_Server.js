class Server {
  constructor(topLeftCoord) {
    this.pos = topLeftCoord;
    this.oldPos = Coord.clone(topLeftCoord);
    this.width = 60;
    this.height = 80;
    this.color = "#cccc99";
    this.boundBox = new BoundingBox(Coord.clone(this.pos), this.width, this.height);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.sprite = new Rectangle(this.pos, this.width, this.height);
  }

  applyGravity(gravity) {
    if (!gravity) gravity = DEFAULT_GRAVITY;
    this.ySpeed += LOOP_TIME * gravity;
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
