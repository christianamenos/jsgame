class Server {
  constructor(topLeftCoord, secCredsReq, activatesDoors) {
    this.isFixed = false;
    this.pos = topLeftCoord;
    this.oldPos = Coord.clone(topLeftCoord);
    this.width = 60;
    this.height = 80;
    this.boundBox = new BoundingBox(Coord.clone(this.pos), this.width, this.height);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.secCredsReq = secCredsReq;
    if (!activatesDoors) {
      activatesDoors = [];
    }
    this.activatesDoors = activatesDoors;

    this.sprite = [
      { shape: new Rectangle(this.pos, this.width, this.height), color: () => "#454545" },
      { shape: new Rectangle(new Coord(this.pos.x + 5, this.pos.y + 5), this.width - 10, 20), color: () => "#e5e5e5" },
      { shape: new Rectangle(new Coord(this.pos.x + 5, this.pos.y + 30), this.width - 10, 20), color: () => "#e5e5e5" },
      { shape: new Rectangle(new Coord(this.pos.x + 5, this.pos.y + 55), this.width - 10, 20), color: () => "#e5e5e5" },
      {
        shape: new Circle(new Coord(this.pos.x + 10, this.pos.y + 15), 2),
        color: () => this.isFixed ? "#393" : "#f33",
      },
      {
        shape: new Circle(new Coord(this.pos.x + 10, this.pos.y + 40), 2),
        color: () => this.isFixed ? "#393" : "#f33",
      },
      {
        shape: new Circle(new Coord(this.pos.x + 10, this.pos.y + 65), 2),
        color: () => this.isFixed ? "#393" : "#f33",
      },
    ];
  }

  doesActivateDoors() {
    return this.activatesDoors.length > 0;
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
    this.sprite.forEach((comp) => {
      comp.shape.draw(context, comp.color());
    });
  }
}
