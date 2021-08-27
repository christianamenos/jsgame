function gameLoop() {
  drawScene();
  calculateScene();
}

function drawScene() {
  cleanViewport();
  floor.draw(context);
  solidObject1.draw(context);
  player.draw(context);
}

function cleanViewport() {
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function calculateScene() {
  player.move();
  floor.move();
  solidObject1.move();
}

function initializeScene() {
  const playerCoord = new Coord(300, 150); // SCREEN_HEIGHT - FLOOR_HEIGHT - DEFAULT_PLAYER_HEIGHT);
  player = new Player(playerCoord);
  initializeKeyboardListeners();
  const floorCoord = new Coord(0, SCREEN_HEIGHT - FLOOR_HEIGHT);
  floor = new Platform(floorCoord, SCREEN_WIDTH, FLOOR_HEIGHT);
  const solidObject1Coord = new Coord(400, SCREEN_HEIGHT - FLOOR_HEIGHT - 40);
  solidObject1 = new Platform(solidObject1Coord, 40, 40);
}

function initializeKeyboardListeners() {
  document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
      leftKeyPressed = true;
    }

    if (event.key == "ArrowRight") {
      rightKeyPressed = true;
    }

    if (!isPlayerJumping && event.key == " ") {
      jumpKeyPressed = true;
    }

    player.updateSpeed();
  });

  document.addEventListener("keyup", function (event) {
    if (event.key == "ArrowLeft") {
      leftKeyPressed = false;
    }

    if (event.key == "ArrowRight") {
      rightKeyPressed = false;
    }

    /*
      if (event.key == " ") {
        jumpKeyPressed = false;
      }
      */

    player.updateSpeed();
  });
}

initializeScene();
setInterval(gameLoop, LOOP_TIME * 100);
