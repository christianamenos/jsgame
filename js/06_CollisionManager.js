class CollisionManager {
  static areBoundingContainersColliding(container1, container2) {
    const boundingType1 = container1.getBoudingType();
    const boundingType2 = container2.getBoudingType();
    const boxContainerType = BoundingBox.prototype.constructor.name;
    const circleContainerType = BoundingCircle.prototype.constructor.name;
    if (boundingType1 == boxContainerType && boundingType2 == boxContainerType) {
      return CollisionManager.areRectanglesColliding(container1, container2);
    } else if ((boundingType1 == boxContainerType && boundingType2 == circleContainerType) ||
      (boundingType1 == circleContainerType && boundingType2 == boxContainerType)) {
      if (boundingType1 == boxContainerType) {
        const containerAux = container2;
        containerAux = container1;
        container1 = container2;
        container2 = containerAux;
      }
      return CollisionManager.isCircleCollidingWithRectangle(container1, container2);
    } else if (boundingType1 == circleContainerType && boundingType2 == circleContainerType) {
      return CollisionManager.areCirclesColliding(container1, container2);
    }
  }

  static areRectanglesColliding(container1, container2) {
    return (
      container1.position.x <= container2.position.x + container2.width &&
      container1.position.x + container1.width >= container2.position.x &&
      container1.position.y <= container2.position.y + container2.height &&
      container1.position.y + container1.height >= container2.position.y
    );
  }

  static areCirclesColliding(container1, container2) {
    const xDistance = container2.postion.x - container1.positon.x;
    const yDistance = container2.postion.y - container1.positon.y;
    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return distance <= container1.radius + container2.radius;
  }

  static isCircleCollidingWithRectangle(circleContainer, boxContainer) {
    const halfBoxWidth = boxContainer.width / 2;
    const halfBoxHeight = boxContainer.height / 2;
    const xDistance = Math.abs(circleContainer.position.x - (boxContainer.position.x + halfBoxWidth));
    const yDistance = Math.abs(circleContainer.position.y - (boxContainer.position.y + halfBoxHeight));
    if (xDistance >= halfBoxWidth + circleContainer.radius)
      return false;
    if (yDistance >= halfBoxHeight + circleContainer.radius)
      return false;
    if (xDistance <= halfBoxWidth)
      return true;
    if (yDistance <= halfBoxHeight)
      return true;
    const cornerDistanceX = xDistance - halfBoxWidth;
    const cornerDistanceY = yDistance - halfBoxHeight;
    return Math.pow(cornerDistanceX, 2) + Math.pow(cornerDistanceY, 2) <= Math.pow(circleContainer.radius, 2);
  }

  static isCollidingFromTop(object1, object2) {
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.oldPosition.y + object1.height < object2.oldPosition.y
    );
  }
  
  static isCollidingFromBottom(object1, object2) {
    return (
      object1.position.y <= object2.position.y + object2.height &&
      object1.oldPosition.y > object2.oldPosition.y + object2.height
    );
  }
  
  static isCollidingFromRight(object1, object2) {
    return (
      object1.position.x <= object2.position.x + object2.width &&
      object1.oldPosition.x >= object2.oldPosition.x + object2.width
    );
  }
  
  static isCollidingFromLeft(object1, object2) {
    return (
      object1.position.x + object1.width >= object2.position.x &&
      object1.oldPosition.x + object1.width <= object2.oldPosition.x
    );
  }
}
