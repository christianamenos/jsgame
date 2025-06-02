class Door {
  constructor(topLeftCoord, width, height, nextScene, nextPlayerPos, status) {
    if (!status) {
      // 0 => closed, 1 => open, 2 => disabled
      status = 0;
    }
    this.pos = topLeftCoord;
    this.width = width;
    this.height = height;
    this.status = status;
    this.nextScene = nextScene;
    this.nextPlayerPos = nextPlayerPos;
    this.doorSpeed = 4;
    let bbPos;
    if (this.pos.x == 0) {
      const bbPosAnim = new Coord(this.pos.x + 25, this.pos.y);
      this.bBoxAnim = new BoundingBox(bbPosAnim, this.width, this.height);
      bbPos = new Coord(this.pos.x, this.pos.y);
    } else {
      const bbPosAnim = new Coord(this.pos.x - 25, this.pos.y);
      this.bBoxAnim = new BoundingBox(bbPosAnim, this.width, this.height);
      bbPos = new Coord(this.pos.x + this.width, this.pos.y);
    }
    this.bBox = new BoundingBox(bbPos, this.width * 0.1, this.height);
    this.sprite = new Rectangle(this.pos, this.width, this.height);
  }

  draw(context) {
    let color = "#c33";
    switch (this.status) {
      case 1:
        color = "#3c3";
        break;
      case 2:
        color = "#454545";
    }
    this.sprite.draw(context, color);
  }

  enable() {
    this.status = 1;
  }

  open() {
    if (this.pos.y >= this.bBox.pos.y - DEFAULT_PLAYER_HEIGHT) {
      this.pos.y -= this.doorSpeed;
    }
  }

  close() {
    if (this.pos.y <= this.bBox.pos.y) {
      this.pos.y += this.doorSpeed;
      if (this.pos.y > this.bBox.pos.y) this.pos.y = this.bBox.pos.y;
    }
  }
}
