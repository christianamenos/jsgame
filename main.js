const canvas = document.getElementById('viewport');
const context = canvas.getContext('2d');

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
    }

    draw(context) {
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle = this.color; // RGB R G B - 0 - f 16 * 16  = 256
        context.fill();
        context.closePath();
    }
}

const playerCoord = new Coord(300, 150);
const player = new Player(playerCoord);
player.draw(context);




