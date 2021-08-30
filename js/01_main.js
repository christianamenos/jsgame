const canvas = document.getElementById("viewport");
const context = canvas.getContext("2d");

const FPS_RATE = 60;
const LOOP_TIME = 1 / FPS_RATE;
const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;
const DEFAULT_GRAVITY = 9.81;
const PLATFORM_HEIGHT = 15;
const DEFAULT_PLAYER_HEIGHT = 50;
const COIN_WIDTH = 5;
const COLLISION_SPACER = 0.001;

let player;
let platforms = [];
let coins = [];
let doors = [];
let rightKeyPressed = false;
let leftKeyPressed = false;
let isPlayerJumping = false;
let jumpKeyPressed = false;
let circle;
let isPaused = false;
let isGameOver = false;
let coinCounter = 0;
