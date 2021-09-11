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
  // currentScene = 0; // TODO: uncomment this when finished creating the levels
  // const playerInitialPos = new Coord(10, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER) // TODO: uncomment this when finished creating the levels
  const playerInitialPos = new Coord(SCREEN_WIDTH - 40, 30); // TODO: remove this when finished creating the levels
  player = new Player(playerInitialPos);
  isGameOver = false;
  scenes = [];
  coinCounter = 0;
  changeScene(currentScene, playerInitialPos);
  SceneBuilder.buildScenes();
  drawScene();
}

function initGame() {
  initializeKeyboardListeners();
  restartGame();
}

function changeScene(scene, newpos) {
  currentScene = scene;
  player.pos.copyCoord(newpos);
  player.oldPos.copyCoord(newpos);
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
