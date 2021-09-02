function gameLoop() {
  frame = (frame + 1) % 180;
  if (!isPaused && !isGameOver) {
    calculateScene();
    drawScene();
  } else {
    alert("GAME OVER!");
    document.location.reload();
  }
  requestAnimationFrame(gameLoop);
}

function drawScene() {
  cleanViewport();
  drawBackground(context);
  drawCounter(context, coinCounter);
  scenes[currentScene].platforms.forEach((plat) => {
    plat.draw(context);
  });
  scenes[currentScene].coins.forEach((coin) => {
    coin.draw(context);
  });
  scenes[currentScene].doors.forEach((door) => {
    door.draw(context);
  });
  player.draw(context);
}

function cleanViewport() {
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function calculateScene() {
  player.move();
  scenes[currentScene].platforms.map((plat) => {
    plat.move();
  });
}

function initializeScene() {
  const playerCoord = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);
  player = new Player(playerCoord);
  initializeKeyboardListeners();
  createplatformsAndPlatforms();
  drawScene();
}

function drawCounter(context, count) {
  context.font = "16px Arial";
  context.fillStyle = "#333";
  context.fillText(`Score: ${count}`, 8, 20);
}

function createplatformsAndPlatforms() {
  // LEVEL 1
  const scene = new Scene();
  const p1coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  scene.platforms.push(new Platform(p1coord, SCREEN_WIDTH / 3, PLATFORM_HEIGHT));
  const p2coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 2);
  scene.platforms.push(new Platform(p2coord, 70, PLATFORM_HEIGHT));
  const p3coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3);
  scene.platforms.push(new Platform(p3coord, 40, PLATFORM_HEIGHT));

  const p4coord = new Coord(SCREEN_WIDTH / 3 + 70, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  scene.platforms.push(new Platform(p4coord, 100, PLATFORM_HEIGHT));

  const p5coord = new Coord(SCREEN_WIDTH / 3 + 220, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3);
  scene.platforms.push(new Platform(p5coord, 55, PLATFORM_HEIGHT));

  const p6coord = new Coord(SCREEN_WIDTH - 75, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5);
  scene.platforms.push(new Platform(p6coord, 75, PLATFORM_HEIGHT));

  const leftDoorCoord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3 - DEFAULT_PLAYER_HEIGHT * 1.25);
  const nextPlayerPosD1 = null;
  scene.doors.push(new Door(leftDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 0, nextPlayerPosD1, 2));

  const rightDoorCoord = new Coord(
    SCREEN_WIDTH - PLATFORM_HEIGHT / 2,
    SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT * 1.25
  );
  const nextPlayerPosD2 = new Coord(SCREEN_WIDTH / 2, SCREEN_HEIGHT - PLATFORM_HEIGHT - DEFAULT_PLAYER_HEIGHT * 2);
  scene.doors.push(new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 1, nextPlayerPosD2, 1));

  const coinCoord = new Coord(SCREEN_WIDTH / 3 + 120, SCREEN_HEIGHT - PLATFORM_HEIGHT - DEFAULT_PLAYER_HEIGHT / 2);
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

function drawBackground(context) {
  const size = 20;
  const colWidthAux = size * 1.6;
  
  const rowHeight = size*0.925;
  const colWidth = size * 2 * 1.6;
  const numColumns = SCREEN_WIDTH / colWidth + 1;
  const numRows = SCREEN_HEIGHT / rowHeight + 1;
  let isOddRow = false;

  let borderOpacity = 1;
  let fillOpacity = 1;
  let borderHexOpacity = Math.floor(255 * borderOpacity).toString(16).padStart(2, '0');
  let fillHexOpacity = Math.floor(255 * fillOpacity).toString(16).padStart(2, '0');

  // Draw rows
  for (let i = 0; i < numRows; i++) {
    let xSpacer = isOddRow ? 0 : colWidthAux;
    // Draw columns
    for (let j = 0; j < numColumns; j++) {
      drawHexagon(context, size, xSpacer + j * colWidth, i * rowHeight, borderHexOpacity, fillHexOpacity);
    }
    isOddRow = !isOddRow;
  }
}


function drawHexagon(context, size, x, y, borderHexOpacity, fillHexOpacity) {
  drawFigure(context, 6, size, x, y, borderHexOpacity, fillHexOpacity, 0);
}

function drawFigure(context, sides, radius, x, y, borderHexOpacity, fillHexOpacity, startAt) {
  // if (!startAt) startAt = 0;

  /*
  if (!borderOpacity) {
    borderOpacity = 'ff';
  }

  if (!fillOpacity) {
    fillOpacity = '00';
  }
  */
  
  const vertexDistance = (2 * Math.PI) / sides;
  context.beginPath();
  for (var i = 0; i < sides; i++) {
    context.lineTo(
      x + radius * Math.cos(vertexDistance * i + startAt),
      y + radius * Math.sin(vertexDistance * i + startAt)
    );
  }
  // context.lineWidth = 1;
  // context.strokeStyle = "#3399ff" + borderHexOpacity;
  // context.strokeStyle = "#ffffff" + borderHexOpacity;
  // context.shadowBlur = 5;
  // context.shadowColor = "#006699" + borderHexOpacity;
  // context.fillStyle = "#3399ff" + fillHexOpacity;
  context.fillStyle = "#ffffff" + fillHexOpacity;
  context.fill();
  context.closePath();
  // context.stroke();
  // context.shadowBlur = 0;
}

initializeScene();
gameLoop();
