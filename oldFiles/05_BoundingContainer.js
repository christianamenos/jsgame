class BoundingContainer {
  getBoudingType() {
    return this.constructor.name;
  }
}

class BoundingBox extends BoundingContainer {
  constructor(topLeftCoord, width, height) {
    super();
    this.pos = topLeftCoord;
    this.width = width;
    this.height = height;
  }
}

class BoundingCircle extends BoundingContainer {
  constructor(centerCoordinate, radius) {
    super();
    this.pos = centerCoordinate;
    this.radius = radius;
  }
}
