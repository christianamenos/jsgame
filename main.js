const canvas = document.getElementById('viewport');
const context = canvas.getContext('2d');

const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const DEFAULT_GRAVITY = 9.81;

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
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    applyGravity() {
        this.ySpeed += 1/DEFAULT_GRAVITY;
    }

    move() {
        this.position.x += this.xSpeed;
        this.position.y += this.ySpeed;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle = this.color; // RGB R G B - 0 - f 16 * 16  = 256
        context.fill();
        context.closePath();
    }
}

function cleanViewport() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

const playerCoord = new Coord(300, 150);
const player = new Player(playerCoord);
player.draw(context);
setInterval(function() {
    player.applyGravity();
    player.move();
    cleanViewport();
    player.draw(context);
}, 10);




