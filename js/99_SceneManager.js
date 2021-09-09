let songPlayer = new CPlayer();
songPlayer.init(song);
isSongGenerated = songPlayer.generate() >= 1;

function gameLoop() {
  frame = (frame + 1) % 180;
  if (!isPaused && !isGameOver) {
    calculateScene();
    drawScene();
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
  changeScene(0, new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER));
  buildScenes();
  drawScene();
}

function initGame() {
  initializeKeyboardListeners();
  restartGame();
}

function buildScene0() {
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
  const nextPlayerPosD2 = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);

  scene.doors.push(new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 1, nextPlayerPosD2, 1));

  const coinCoord = new Coord(SCREEN_WIDTH / 3 + 120, SCREEN_HEIGHT - PLATFORM_HEIGHT - DEFAULT_PLAYER_HEIGHT / 2);
  scene.coins.push(new Coin(coinCoord, COIN_WIDTH));

  scenes.push(scene);
}

function buildScene1() {
  const scene = new Scene();

  const doorD1Coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT * 1.25);
  const nextPlayerPosD1 = new Coord(
    SCREEN_WIDTH - 10 - player.width,
    SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER
  );
  scene.doors.push(new Door(doorD1Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 0, nextPlayerPosD1, 1));

  const p1coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5);
  scene.platforms.push(new Platform(p1coord, 70, PLATFORM_HEIGHT));

  const p2y = 120;
  scene.platforms.push(
    buildVerticalMovingPlatform(140, p2y, 60, PLATFORM_HEIGHT, SCREEN_HEIGHT - PLATFORM_HEIGHT - p2y / 2, 8, undefined)
  );

  const p3coord = new Coord(SCREEN_WIDTH / 3 + 70, SCREEN_HEIGHT - PLATFORM_HEIGHT);
  scene.platforms.push(new Platform(p3coord, 100, PLATFORM_HEIGHT));

  const p4y = SCREEN_HEIGHT - PLATFORM_HEIGHT;
  scene.platforms.push(
    buildVerticalMovingPlatform(
      SCREEN_WIDTH / 3 + 200,
      SCREEN_HEIGHT - PLATFORM_HEIGHT,
      55,
      PLATFORM_HEIGHT,
      SCREEN_HEIGHT - PLATFORM_HEIGHT - p4y / 2,
      8,
      undefined
    )
  );

  const p5coord = new Coord(SCREEN_WIDTH - 75, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5);
  scene.platforms.push(new Platform(p5coord, 75, PLATFORM_HEIGHT));

  const s1coord = new Coord(p3coord.x + scene.platforms[2].width / 2 - 30, p3coord.y - 80);
  const s1 = new Server(s1coord);

  const rightDoorCoord = new Coord(
    SCREEN_WIDTH - PLATFORM_HEIGHT / 2,
    SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT * 1.25
  );

  const nextPlayerPosD2 = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);

  scene.doors.push(new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 2, nextPlayerPosD2, 1));

  scene.servers.push(s1);

  scenes.push(scene);
}

function buildScene2() {
  const scene = new Scene();
  const fixPlatWidth = 70;
  const movePlatWidth = 30;
  const color = "#454545";
  const platformsYPos = SCREEN_HEIGHT - PLATFORM_HEIGHT * 5;

  const doorD1Coord = new Coord(0, platformsYPos - DEFAULT_PLAYER_HEIGHT * 1.25);
  const nextPlayerPosD1 = new Coord(
    SCREEN_WIDTH - 10 - player.width,
    platformsYPos - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER
  );
  scene.doors.push(new Door(doorD1Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 1, nextPlayerPosD1, 1));

  const p1coord = new Coord(0, platformsYPos);
  scene.platforms.push(new Platform(p1coord, fixPlatWidth, PLATFORM_HEIGHT));

  const p2X = fixPlatWidth + 40;
  scene.platforms.push(
    buildVerticalMovingPlatform(p2X, 120, movePlatWidth, movePlatWidth, SCREEN_HEIGHT - PLATFORM_HEIGHT - 30, 8, color)
  );

  const p3coord = new Coord(p2X + movePlatWidth + 40, platformsYPos);
  scene.platforms.push(new Platform(p3coord, fixPlatWidth, PLATFORM_HEIGHT));

  const p4X = p3coord.x + fixPlatWidth + 40;
  scene.platforms.push(
    buildVerticalMovingPlatform(p4X, 120, movePlatWidth, movePlatWidth, SCREEN_HEIGHT - PLATFORM_HEIGHT - 30, 8, color)
  );

  const p5coord = new Coord(p4X + movePlatWidth + 40, platformsYPos);
  scene.platforms.push(new Platform(p5coord, fixPlatWidth, PLATFORM_HEIGHT));

  const p6X = p5coord.x + fixPlatWidth + 40;
  scene.platforms.push(
    buildVerticalMovingPlatform(p6X, 120, movePlatWidth, movePlatWidth, SCREEN_HEIGHT - PLATFORM_HEIGHT - 30, 8, color)
  );

  const p7coord = new Coord(SCREEN_WIDTH - fixPlatWidth, platformsYPos * 0.6 - 3);
  scene.platforms.push(new Platform(p7coord, fixPlatWidth, PLATFORM_HEIGHT));

  const rightDoorCoord = new Coord(
    SCREEN_WIDTH - PLATFORM_HEIGHT / 2,
    platformsYPos * 0.6 - DEFAULT_PLAYER_HEIGHT - PLATFORM_HEIGHT
  );

  const nextPlayerPosD2 = new Coord(10, platformsYPos - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);

  scene.doors.push(new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 2, nextPlayerPosD2, 1));

  scenes.push(scene);
}

function buildScenes() {
  buildScene0();
  buildScene1();
  buildScene2();
}

function buildVerticalMovingPlatform(x, y, width, height, bottomY, velocity, color) {
  const pCoord = new Coord(x, y);
  const pBottomPos = new Coord(pCoord.x, bottomY);
  const pMovSeq = new MovementSequence();
  pMovSeq.addMovement(new Movement(Coord.clone(pCoord), pBottomPos, velocity));
  pMovSeq.addMovement(new Movement(pBottomPos, Coord.clone(pCoord), velocity));
  return new Platform(pCoord, width, height, color, false, true, pMovSeq);
}

function changeScene(scene, newpos) {
  player = new Player(newpos);
  currentScene = scene;
  player.pos.copyCoord(newpos);
  player.oldPos.copyCoord(player.pos);
  player.boundBox.pos.copyCoord(player.pos);
  document.querySelectorAll(".scencetut").forEach((scenetut) => {
    scenetut.classList.add("hidden");
  });
  const scenetut = document.getElementById("scene" + (currentScene + 1).toString().padStart(2, "0"));
  if (scenetut) {
    scenetut.classList.remove("hidden");
  }
}

function initializeKeyboardListeners() {
  keyDownListener = document.addEventListener("keydown", function (event) {
    switch (currentScreen) {
      case 2:
        processKeyPressDuringGame(event);
        break;
      case 1:
        if (!isSongGenerated) {
          try {
            isSongGenerated = songPlayer.generate() >= 1;
          } catch (err) {
            console.log("Song loading");
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

  keyUpListener = document.addEventListener("keyup", function (event) {
    if (event.key == "ArrowLeft") {
      leftKeyPressed = false;
    }

    if (event.key == "ArrowRight") {
      rightKeyPressed = false;
    }

    if (event.key == "Enter") {
      actionKeyPressed = false;
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
    currentVolume += 3;
  } else {
    currentVolume -= 3;
  }
  if (currentVolume > 9) {
    currentVolume = 9;
  } else if (currentVolume < 0) {
    currentVolume = 0;
  }
  const lis = document.querySelectorAll("#ui-status li");
  lis.forEach((li, index) => {
    li.classList.remove("active");
    if (3 * (index + 1) <= currentVolume) {
      li.classList.add("active");
    }
  });
  audio.volume = currentVolume / 10;
}

document.getElementById("lvol").addEventListener("click", () => {
  editVolume(false);
});
document.getElementById("mvol").addEventListener("click", () => {
  editVolume(true);
});

function updateCounter(count) {
  document.getElementById("counter").innerHTML = count;
}

function gameOver(isWin) {
  isPaused = true;
  pauseBackground();
  isGameOver = true;
  audio.pause();
  audio.currentTime = 0;
  isSongPlaying = false;
  if (isWin) {
    currentScreen = 3;
  } else {
    currentScreen = 4;
  }
  Message.showCurrentScreen();
  restartGame();
}

initGame();
gameLoop();
