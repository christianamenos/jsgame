const canvas = document.getElementById('viewport');
const context = canvas.getContext('2d');

const FPS_RATE = 60;
const LOOP_TIME = 1/FPS_RATE;
const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const DEFAULT_GRAVITY = 9.81;
const FLOOR_HEIGHT = 30;

let player;
let floor;

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
        this.height = 50;
        this.color = '#ff0000';
        this.xSpeed = -2;
        this.ySpeed = 0;
    }

    applyGravity() {
        this.ySpeed += LOOP_TIME * DEFAULT_GRAVITY;
        if (this.position.y >= SCREEN_HEIGHT -FLOOR_HEIGHT -this.height) {
            this.ySpeed = 0;
        }
    }

    draw(context) {
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle = this.color; // RGB R G B - 0 - f 16 * 16  = 256
        context.fill();
        context.closePath();
    }

    move() {
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;
        if (this.position.y >= SCREEN_HEIGHT -FLOOR_HEIGHT -this.height) {
            this.position.y = SCREEN_HEIGHT -FLOOR_HEIGHT -this.height;
        }
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

function gameLoop() {
    drawScene();
    calculateScene();
}

function drawScene() {
    cleanViewport();
    floor.draw(context, '#663333');
    player.draw(context);
}

function cleanViewport() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function calculateScene() {
    player.applyGravity();
    player.move();
}

function initializeScene() {
    const playerCoord = new Coord(300, 0);
    player = new Player(playerCoord);
    const floorCoord = new Coord(0, SCREEN_HEIGHT - FLOOR_HEIGHT);
    floor = new Rectangle(floorCoord, SCREEN_WIDTH, FLOOR_HEIGHT);
}

initializeScene();
setInterval(gameLoop, LOOP_TIME);




