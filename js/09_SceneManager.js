function gameLoop() {
  if (!isPaused && !isGameOver) {
    calculateScene();
    drawScene();
  } else {
    alert('GAME OVER!');
    document.location.reload();
  }
  requestAnimationFrame(gameLoop);
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
  const playerCoord = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT*3 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);
  player = new Player(playerCoord);
  initializeKeyboardListeners();
  createSolidObjectsAndPlatforms();
  drawScene();
}

function createSolidObjectsAndPlatforms() {
  const p1coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  solidObjects.push(new Platform(p1coord, SCREEN_WIDTH/3, PLATFORM_HEIGHT));
  const p2coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT*2);
  solidObjects.push(new Platform(p2coord, 70, PLATFORM_HEIGHT));
  const p3coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT*3);
  solidObjects.push(new Platform(p3coord, 40, PLATFORM_HEIGHT));

  const p4coord = new Coord(SCREEN_WIDTH/3 + 70, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  solidObjects.push(new Platform(p4coord, 100, PLATFORM_HEIGHT));

  const p5coord = new Coord(SCREEN_WIDTH/3 + 220, SCREEN_HEIGHT - PLATFORM_HEIGHT*3);
  solidObjects.push(new Platform(p5coord, 55, PLATFORM_HEIGHT));

  const p6coord = new Coord(SCREEN_WIDTH - 75, SCREEN_HEIGHT - PLATFORM_HEIGHT*5);
  solidObjects.push(new Platform(p6coord, 75, PLATFORM_HEIGHT));

  const leftDoorCoord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT*3 - DEFAULT_PLAYER_HEIGHT*1.25);
  solidObjects.push(new Platform(leftDoorCoord, PLATFORM_HEIGHT/2, DEFAULT_PLAYER_HEIGHT*1.25, '#c33'));

  const rightDoorCoord = new Coord(SCREEN_WIDTH - PLATFORM_HEIGHT/2, SCREEN_HEIGHT - PLATFORM_HEIGHT*5 - DEFAULT_PLAYER_HEIGHT*1.25);
  solidObjects.push(new Platform(rightDoorCoord, PLATFORM_HEIGHT/2, DEFAULT_PLAYER_HEIGHT*1.25, '#3c3'));
}

function initializeKeyboardListeners() {
  document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft") {
      leftKeyPressed = true;
      event.preventDefault();
    }

    if (event.key == "ArrowRight") {
      rightKeyPressed = true;
      event.preventDefault();
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
gameLoop();
