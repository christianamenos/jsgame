const canvas = document.getElementById('viewport');
const context = canvas.getContext('2d');

const FPS_RATE = 60;
const LOOP_TIME = 1/FPS_RATE;
const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const DEFAULT_GRAVITY = 9.81;
const FLOOR_HEIGHT = 30;
const DEFAULT_PLAYER_HEIGHT = 50;

let player;
let floor;
let rightKeyPressed = false;
let leftKeyPressed = false;
let jumpKeyPressed = false;
let playerTouchedTheFloor = false;
let circle;

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Player {
    constructor(coordinates) {
        this.position = coordinates;
        this.width = 25;
        this.height = DEFAULT_PLAYER_HEIGHT;
        this.color = '#ff0000';
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.boundingContainer = new BoundingBox(this.position, this.width, this.height);
    }

    applyGravity() {
        this.ySpeed += LOOP_TIME * DEFAULT_GRAVITY;
        /*
        if (this.ySpeed > 0 && this.position.y >= SCREEN_HEIGHT -FLOOR_HEIGHT -this.height) {
            this.ySpeed = 0;
        }
        */
    }

    draw(context) {
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle = this.color; // RGB R G B - 0 - f 16 * 16  = 256
        context.fill();
        context.closePath();
    }

    move() {
        this.applyGravity();
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;
        /*
        if (this.position.y >= SCREEN_HEIGHT -FLOOR_HEIGHT -this.height) {
            this.position.y = SCREEN_HEIGHT -FLOOR_HEIGHT -this.height;
            playerTouchedTheFloor = true;
        }
        */
        if (this.position.y <= 0) {
            this.position.y = 0;
        }
        if (this.position.x >= SCREEN_WIDTH -this.width) {
            this.position.x = SCREEN_WIDTH -this.width;
        }
        if (this.position.x <= 0) {
            this.position.x = 0;
        }
    }

    updateSpeed() {
        this.xSpeed = 0;
        if (rightKeyPressed) this.xSpeed += 2;
        if (leftKeyPressed) this.xSpeed -= 2;
        if (playerTouchedTheFloor && jumpKeyPressed) this.ySpeed -= 4;
    }
}

class Rectangle {
    constructor(coordinates, width, height) {
        this.position = coordinates;
        this.width = width;
        this.height = height;
    }

    draw(context, color) {
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
}

class Circle {
    constructor(coordinate, radius) {
        this.position = coordinate;
        this.radius = radius;
    }

    draw(context, color) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
}

class CollisionManager {

    static areBoundingContainersColliding(container1, container2) {
        const boundingType1 = container1.getBoudingType();
        const boundingType2 = container2.getBoudingType();
        const boxContainerType = BoundingBox.prototype.constructor.name;
        const circleContainerType = BoundingCircle.prototype.constructor.name;
        if (boundingType1 == boxContainerType
            && boundingType2 == boxContainerType) {
            areRectanglesColliding(container1, container2);
        } else if (boundingType1 == boxContainerType && boundingType2 == circleContainerType
            || boundingType1 == circleContainerType && boundingType2 == boxContainerType) {
            if (boundingType1 == boxContainerType) {
                const containerAux = container2;
                containerAux = container1;
                container1 = container2;
                container2 = container3;
            }
            isCircleCollidingWithRectangle(container1, container2);
        } else if (boundingType1 == circleContainerType
            && boundingType2 == circleContainerType) {
            areCirclesColliding(container1, container2);
        }
    }

    static areRectanglesColliding(container1, container2) {
        return container1.position.x < container2.position.x + container2.width
        && container1.position.x + container1.width > container2.position.x
        && container1.position.y < container2.position.y + container2.height
        && container1.position.y + container1.height > container2.position.y;
    }
    
    static areCirclesColliding(container1, container2) {
        const xDistance = container2.postion.x - container1.positon.x;
        const yDistance = container2.postion.y - container1.positon.y;
        const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        return distance < container1.radius + container2.radius;
    }
    
    static isCircleCollidingWithRectangle(circleContainer, boxContainer) {
        const halfBoxWidth = boxContainer.width/2;
        const halfBoxHeight = boxContainer.height/2;
        const xDistance = Math.abs(circleContainer.position.x - (boxContainer.position.x + halfBoxWidth));
        const yDistance = Math.abs(circleContainer.position.y - (boxContainer.position.y + halfBoxHeight));
        if (xDistance > halfBoxWidth + circleContainer.radius) return false;
        if (yDistance > halfBoxHeight + circleContainer.radius) return false;
        if (xDistance <= halfBoxWidth) return true;
        if (yDistance <= halfBoxHeight) return true;
        const cornerDistanceX = xDistance - halfBoxWidth;
        const cornerDistanceY = yDistance - halfBoxHeight;
        return Math.pow(cornerDistanceX, 2) + Math.pow(cornerDistanceY, 2) <= Math.pow(circleContainer.radius, 2);
    }
}

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

class Platform {
    constructor(topLeftCoordinate, width, height, isAffectedByGravity, isSolidObject) {
        this.position = topLeftCoordinate;
        this.width = width;
        this.height = height;
        this.color = '#663333';
        this.boundingContainer = new BoundingBox(this.position, this.width, this.height);
        this.isAffectedByGravity = !!isAffectedByGravity;
        this.isSolidObject = !isSolidObject;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.sprite = new Rectangle(this.position, this.width, this.height);
    }

    applyGravity(gravity) {
        if (this.isAffectedByGravity) {
            if (!gravity) gravity = DEFAULT_GRAVITY;
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

function gameLoop() {
    drawScene();
    calculateScene();
}

function drawScene() {
    cleanViewport();
    floor.draw(context);
    player.draw(context);
}

function cleanViewport() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function calculateScene() {
    player.move();
    floor.move();
}

function initializeScene() {
    const playerCoord = new Coord(300, SCREEN_HEIGHT - FLOOR_HEIGHT - DEFAULT_PLAYER_HEIGHT);
    player = new Player(playerCoord);
    initializeKeyboardListeners();
    const floorCoord = new Coord(0, SCREEN_HEIGHT - FLOOR_HEIGHT);
    floor = new Platform(floorCoord, SCREEN_WIDTH, FLOOR_HEIGHT);
}

function initializeKeyboardListeners() {
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowLeft") {
            leftKeyPressed = true;
        }

        if (event.key == "ArrowRight") {
            rightKeyPressed = true;
        }

        if (event.key == " ") {
            jumpKeyPressed = true;
        }

        player.updateSpeed();
    });

    document.addEventListener("keyup", function(event) {
        if (event.key == "ArrowLeft") {
            leftKeyPressed = false;
        }

        if (event.key == "ArrowRight") {
            rightKeyPressed = false;
        }

        if (event.key == " ") {
            jumpKeyPressed = false;
            playerTouchedTheFloor = false;
        }

        player.updateSpeed();
    });
}

initializeScene();
setInterval(gameLoop, LOOP_TIME);
