class BoundingContainer {
  getBoudingType() {
    return this.constructor.name;
  }
}

class BoundingBox extends BoundingContainer {
  constructor(topLeftCoordinate, width, height) {
    super();
    this.position = topLeftCoordinate;
    this.width = width;
    this.height = height;
  }
}

class BoundingCircle extends BoundingContainer {
  constructor(centerCoordinate, radius) {
    super();
    this.position = centerCoordinate;
    this.radius = radius;
  }
}
