const canvas = document.getElementById('viewport');
const context = canvas.getContext('2d');

const x = 300;
const y = 150;
const width = 25;
const height = 50;

context.beginPath();
context.rect(x, y, width, height);
context.fillStyle = '#ff0000'; // RGB R G B - 0 - f 16 * 16  = 256
context.fill();
context.closePath();


