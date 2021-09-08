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
const NUM_SCENES = 2;
const SCREENS = ['gameMenu', 'story', 'viewportWrapper', 'gameWin', 'gameOver'];

let currentScene = 0;
let player;
let scenes = [];
let rightKeyPressed = false;
let leftKeyPressed = false;
let isPlayerJumping = false;
let jumpKeyPressed = false;
let actionKeyPressed = false;
let circle;
let isPaused = true;
let isGameOver = false;
let coinCounter = 0;
let frame = 0;
let currentScreen = 0; // 0 => game menu, 1 => story, 2 => game, 3 => game over, 4 => win game
let isSongPlaying = false;
let isSongGenerated = false;
let currentVolume = 0.3;
let audio = document.createElement("audio");
audio.volume = currentVolume;
audio.loop = true;
