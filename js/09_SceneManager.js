function gameLoop() {
  calculateScene();
  drawScene();
}

function drawScene() {
  cleanViewport();
  solidObjects.map(plat => {
    plat.draw(context);
  });
  player.draw(context);
}

function cleanViewport() {
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function calculateScene() {
  player.move();
  solidObjects.map(plat => {
    plat.move();
  });
}

function initializeScene() {
  const playerCoord = new Coord(300, 50);
  player = new Player(playerCoord);
  initializeKeyboardListeners();
  createSolidObjectsAndPlatforms();
  drawScene();
}

function createSolidObjectsAndPlatforms() {
  const floorCoord = new Coord(0, SCREEN_HEIGHT - FLOOR_HEIGHT);
  solidObjects.push(new Platform(floorCoord, SCREEN_WIDTH, FLOOR_HEIGHT));
  const boxCoord = new Coord(400, SCREEN_HEIGHT - FLOOR_HEIGHT - 40);
  solidObjects.push(new Platform(boxCoord, 40, 40));
  const p1Coord = new Coord(300, SCREEN_HEIGHT - FLOOR_HEIGHT - 80);
  solidObjects.push(new Platform(p1Coord, 80, 20));
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

    player.updateSpeed();
  });
}

initializeScene();
setInterval(gameLoop, LOOP_TIME * 100);
