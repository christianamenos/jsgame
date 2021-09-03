class Movement {
  constructor(originPos, targetPos, timeInSec) {
    const timeInMilis = timeInSec * 1000;
    this.fromPos = originPos;
    this.toPos = targetPos;
    this.xSpeed = (targetPos.x - originPos.x) / (timeInMilis * LOOP_TIME);
    this.ySpeed = (targetPos.y - originPos.y) / (timeInMilis * LOOP_TIME);
  }
}
