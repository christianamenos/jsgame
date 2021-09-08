let songPlayer = new CPlayer();
songPlayer.init(song);
isSongGenerated = songPlayer.generate() >= 1;

function gameLoop() {
  frame = (frame + 1) % 180;
  if (!isPaused && !isGameOver) {
    calculateScene();
    drawScene();
  } else if (isGameOver) {
    currentScreen = 4;
    Message.showCurrentScreen();
    restartGame();
  }
  requestAnimationFrame(gameLoop);
}

function drawScene() {
  cleanViewport();
  drawBackground(context);
  updateCounter(coinCounter);
  scenes[currentScene].platforms.forEach((plat) => {
    plat.draw(context);
  });
  scenes[currentScene].coins.forEach((coin) => {
    coin.draw(context);
  });
  scenes[currentScene].doors.forEach((door) => {
    door.draw(context);
  });
  scenes[currentScene].servers.forEach((server) => {
    server.draw(context);
  });
  player.draw(context);
}

function cleanViewport() {
  context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function calculateScene() {
  scenes[currentScene].platforms.map((plat) => {
    plat.move();
  });
  player.move();
}

function restartGame() {
  isGameOver = false;
  scenes = [];
  coinCounter = 0;
  currentScene = 0;
  const playerCoord = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);
  player = new Player(playerCoord);
  buildScenes();
  drawScene();
}

function initGame() {
  initializeKeyboardListeners();
  restartGame();
}

function buildScenes() {
  // LEVEL 1
  const scene1 = new Scene();
  const p1coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  scene1.platforms.push(new Platform(p1coord, SCREEN_WIDTH / 3, PLATFORM_HEIGHT));
  const p2coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 2);
  scene1.platforms.push(new Platform(p2coord, 70, PLATFORM_HEIGHT));
  const p3coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3);
  scene1.platforms.push(new Platform(p3coord, 40, PLATFORM_HEIGHT));

  const p4coord = new Coord(SCREEN_WIDTH / 3 + 70, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  scene1.platforms.push(new Platform(p4coord, 100, PLATFORM_HEIGHT));

  const p5coord = new Coord(SCREEN_WIDTH / 3 + 220, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3);
  scene1.platforms.push(new Platform(p5coord, 55, PLATFORM_HEIGHT));

  const p6coord = new Coord(SCREEN_WIDTH - 75, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5);
  scene1.platforms.push(new Platform(p6coord, 75, PLATFORM_HEIGHT));

  const leftDoorCoord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3 - DEFAULT_PLAYER_HEIGHT * 1.25);
  const nextPlayerPosD1 = null;
  scene1.doors.push(new Door(leftDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 0, nextPlayerPosD1, 2));

  const rightDoorCoord = new Coord(
    SCREEN_WIDTH - PLATFORM_HEIGHT / 2,
    SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT * 1.25
  );
  const nextPlayerPosD2 = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);

  scene1.doors.push(new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 1, nextPlayerPosD2, 1));

  const coinCoord = new Coord(SCREEN_WIDTH / 3 + 120, SCREEN_HEIGHT - PLATFORM_HEIGHT - DEFAULT_PLAYER_HEIGHT / 2);
  scene1.coins.push(new Coin(coinCoord, COIN_WIDTH));
  scenes.push(scene1);

  // LEVEL 2
  const scene2 = new Scene();

  const doorL2D1Coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT * 1.25);
  const nextPlayerPosL2D1 = new Coord(
    SCREEN_WIDTH - 10 - player.width,
    SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER
  );
  scene2.doors.push(
    new Door(doorL2D1Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 0, nextPlayerPosL2D1, 1)
  );

  const p1L2coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5);
  scene2.platforms.push(new Platform(p1L2coord, 70, PLATFORM_HEIGHT));

  const p2L2coord = new Coord(140, 60);
  const p2L2BottomY = SCREEN_HEIGHT - PLATFORM_HEIGHT - p2L2coord.y;
  const p2L2BottomPos = new Coord(p2L2coord.x, p2L2BottomY);
  const p2L2MovSeq = new MovementSequence();
  p2L2MovSeq.addMovement(new Movement(Coord.clone(p2L2coord), p2L2BottomPos, 8));
  p2L2MovSeq.addMovement(new Movement(p2L2BottomPos, Coord.clone(p2L2coord), 8));
  scene2.platforms.push(new Platform(p2L2coord, 60, PLATFORM_HEIGHT, undefined, false, true, p2L2MovSeq));

  const p3L2coord = Coord.clone(p4coord);
  scene2.platforms.push(new Platform(p3L2coord, 100, PLATFORM_HEIGHT));

  const s1L2coord = new Coord(p3L2coord.x + scene2.platforms[2].width / 2 - 30, p3L2coord.y - 80);
  const s1L2 = new Server(s1L2coord);
  scene2.servers.push(s1L2);

  scenes.push(scene2);
}

function changeScene(scene, newpos) {
  currentScene = scene;
  player.pos.copyCoord(newpos);
  player.oldPos.copyCoord(player.pos);
  player.boundBox.pos.copyCoord(player.pos);
}

function initializeKeyboardListeners() {
  document.addEventListener("keydown", function (event) {
    switch (currentScreen) {
      case 2:
        processKeyPressDuringGame(event);
        break;
      case 1:
        if (!isSongGenerated) {
          try {
            isSongGenerated = songPlayer.generate() >= 1;
          } catch(err) {
            console.log('Song loading');
          }
        }
        if (!isSongPlaying && isSongGenerated) {
          isSongPlaying = true;
          var wave = songPlayer.createWave();
          audio.src = URL.createObjectURL(new Blob([wave], { type: "audio/wav" }));
          audio.play();
          isPaused = false;
          resumeBackground();
          currentScreen++;
          Message.showCurrentScreen();
        }
        break;
      case 0:
        currentScreen++;
        Message.showCurrentScreen();
        break;
      case 3:
      case 4:
        currentScreen = 0;
        Message.showCurrentScreen();
    }
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

function processKeyPressDuringGame(event) {
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

  if (!actionKeyPressed && event.key == "Enter") {
    if (document.getElementsByClassName("msg").length > 0) {
      Message.closeDialog();
    } else {
      actionKeyPressed = true;
    }
  }

  player.updateSpeed();
}

function resumeBackground() {
  document.getElementById("viewport").classList.remove("paused");
}

function pauseBackground() {
  document.getElementById("viewport").classList.add("paused");
}

function drawBackground(context) {
  const size = 20;
  const colWidthAux = size * 1.6;

  const rowHeight = size * 0.925;
  const colWidth = size * 2 * 1.6;
  const numColumns = SCREEN_WIDTH / colWidth + 1;
  const numRows = SCREEN_HEIGHT / rowHeight + 1;
  let isOddRow = false;

  let fillOpacity = 1;
  let fillHexOpacity = Math.floor(255 * fillOpacity)
    .toString(16)
    .padStart(2, "0");

  for (let i = 0; i < numRows; i++) {
    let xSpacer = isOddRow ? 0 : colWidthAux;
    for (let j = 0; j < numColumns; j++) {
      drawHexagon(context, size, xSpacer + j * colWidth, i * rowHeight, fillHexOpacity);
    }
    isOddRow = !isOddRow;
  }
}

function drawHexagon(context, size, x, y, fillHexOpacity) {
  drawFigure(context, 6, size, x, y, fillHexOpacity, 0);
}

function drawFigure(context, sides, radius, x, y, fillHexOpacity, startAt) {
  const vertexDistance = (2 * Math.PI) / sides;
  context.beginPath();
  for (var i = 0; i < sides; i++) {
    context.lineTo(
      x + radius * Math.cos(vertexDistance * i + startAt),
      y + radius * Math.sin(vertexDistance * i + startAt)
    );
  }
  context.fillStyle = "#ffffff" + fillHexOpacity;
  context.fill();
  context.closePath();
}

function editVolume(isIncrement) {
  if (isIncrement) {
    currentVolume += 0.3;
  } else {
    currentVolume -= 0.3;
  }
  if (currentVolume > 0.9) {
    currentVolume = 0.9;
  } else if(currentVolume < 0) {
    currentVolume = 0;
  }
  const lis = document.querySelectorAll('#ui-status li');
  lis.forEach((li, index) => {
    li.classList.remove('active');
    if (0.3 * (index + 1) <= currentVolume) {
      li.classList.add('active');
    }
  });
  audio.volume = currentVolume;
}
document.getElementById('lvol').addEventListener('click', () => {
  editVolume(false);
});
document.getElementById('mvol').addEventListener('click', () => {
  editVolume(true);
});

function updateCounter(count) {
  document.getElementById('counter').innerHTML = count;
}

initGame();
gameLoop();
