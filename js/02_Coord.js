class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static cloneCoord(coord) {
    return new Coord(coord.x, coord.y);
  }

  copyCoord(coord) {
    this.x = coord.x;
    this.y = coord.y;
  }
}
