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
  drawCounter(context, coinCounter);
  scenes[currentScene].platforms.forEach(plat => {
    plat.draw(context);
  });
  scenes[currentScene].coins.forEach(coin => {
    coin.draw(context);
  });
  scenes[currentScene].doors.forEach(door => {
    door.draw(context);
  });
  player.draw(context);
}

function cleanViewport() {
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function calculateScene() {
  player.move();
  scenes[currentScene].platforms.map(plat => {
    plat.move();
  });
}

function initializeScene() {
  const playerCoord = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT*3 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);
  player = new Player(playerCoord);
  initializeKeyboardListeners();
  createplatformsAndPlatforms();
  drawScene();
}

function drawCounter(context, count) {
  context.font = '16px Arial';
  context.fillStyle = '#333';
  context.fillText(`Score: ${count}`, 8, 20);
}

function createplatformsAndPlatforms() {
  // LEVEL 1
  const scene = new Scene();
  const p1coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  scene.platforms.push(new Platform(p1coord, SCREEN_WIDTH/3, PLATFORM_HEIGHT));
  const p2coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT*2);
  scene.platforms.push(new Platform(p2coord, 70, PLATFORM_HEIGHT));
  const p3coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT*3);
  scene.platforms.push(new Platform(p3coord, 40, PLATFORM_HEIGHT));

  const p4coord = new Coord(SCREEN_WIDTH/3 + 70, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  scene.platforms.push(new Platform(p4coord, 100, PLATFORM_HEIGHT));

  const p5coord = new Coord(SCREEN_WIDTH/3 + 220, SCREEN_HEIGHT - PLATFORM_HEIGHT*3);
  scene.platforms.push(new Platform(p5coord, 55, PLATFORM_HEIGHT));

  const p6coord = new Coord(SCREEN_WIDTH - 75, SCREEN_HEIGHT - PLATFORM_HEIGHT*5);
  scene.platforms.push(new Platform(p6coord, 75, PLATFORM_HEIGHT));

  const leftDoorCoord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT*3 - DEFAULT_PLAYER_HEIGHT*1.25);
  const nextPlayerPosD1 = null;
  scene.doors.push(new Door(leftDoorCoord, PLATFORM_HEIGHT/2, DEFAULT_PLAYER_HEIGHT*1.25, 0, nextPlayerPosD1, 2));

  const rightDoorCoord = new Coord(SCREEN_WIDTH - PLATFORM_HEIGHT/2, SCREEN_HEIGHT - PLATFORM_HEIGHT*5 - DEFAULT_PLAYER_HEIGHT*1.25);
  const nextPlayerPosD2 = new Coord(SCREEN_WIDTH/2, SCREEN_HEIGHT - PLATFORM_HEIGHT - DEFAULT_PLAYER_HEIGHT*2);
  scene.doors.push(new Door(rightDoorCoord, PLATFORM_HEIGHT/2, DEFAULT_PLAYER_HEIGHT*1.25, 1, nextPlayerPosD2, 1));

  const coinCoord = new Coord(SCREEN_WIDTH/3 + 120, SCREEN_HEIGHT - PLATFORM_HEIGHT - DEFAULT_PLAYER_HEIGHT/2);
  scene.coins.push(new Coin(coinCoord, COIN_WIDTH));
  scenes.push(scene);

  // LEVEL 2
  const scene2 = new Scene();
  scene2.platforms.push(new Platform(p4coord, 100, PLATFORM_HEIGHT));
  scenes.push(scene2);
}

function changeScene(scene, newpos) {
  currentScene = scene;
  player.pos = newpos;
  // TODO: set the player to the pos of the door in the new scene
  // TODO: clean and draw first frame
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
