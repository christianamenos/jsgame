class SceneBuilder {
  static buildScenes() {
    SceneBuilder.buildScene0();
    SceneBuilder.buildScene1();
    SceneBuilder.buildScene2();
    SceneBuilder.buildScene3();
    SceneBuilder.buildScene4();
    SceneBuilder.buildScene5();
  }

  static buildScene0() {
    const scene = new Scene();
    const p1coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT);
    scene.platforms.push(new Platform(p1coord, SCREEN_WIDTH / 3, PLATFORM_HEIGHT));
    const p2coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 2);
    scene.platforms.push(new Platform(p2coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));
    const p3coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 3);
    scene.platforms.push(new Platform(p3coord, 40, PLATFORM_HEIGHT));

    const p4coord = new Coord(SCREEN_WIDTH / 3 + DEFAULT_PLATFORM_WIDTH, SCREEN_HEIGHT - PLATFORM_HEIGHT);
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
    const nextPlayerPosD2 = new Coord(
      10,
      SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER
    );

    scene.doors.push(
      new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 1, nextPlayerPosD2, 1)
    );

    const coinCoord = new Coord(SCREEN_WIDTH / 3 + 120, SCREEN_HEIGHT - PLATFORM_HEIGHT - DEFAULT_PLAYER_HEIGHT / 2);
    scene.coins.push(new Coin(coinCoord, COIN_WIDTH));

    scenes.push(scene);
  }

  static buildScene1() {
    const scene = new Scene();

    const doorD1Coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT * 1.25);
    const nextPlayerPosD1 = new Coord(
      SCREEN_WIDTH - 10 - player.width,
      SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER
    );
    scene.doors.push(new Door(doorD1Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 0, nextPlayerPosD1, 1));

    const p1coord = new Coord(0, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5);
    scene.platforms.push(new Platform(p1coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    const p2y = SCREEN_HEIGHT - PLATFORM_HEIGHT;
    scene.platforms.push(
      SceneBuilder.buildVerticalMovingPlatform(
        140,
        p2y,
        SCREEN_HEIGHT - PLATFORM_HEIGHT - p2y / 2,
        undefined,
        60,
        PLATFORM_HEIGHT,
        "#999"
      )
    );

    const p3coord = new Coord(SCREEN_WIDTH / 3 + DEFAULT_PLATFORM_WIDTH, SCREEN_HEIGHT - PLATFORM_HEIGHT);
    scene.platforms.push(new Platform(p3coord, 100, PLATFORM_HEIGHT));

    scene.platforms.push(
      SceneBuilder.buildVerticalMovingPlatform(
        SCREEN_WIDTH / 3 + 200,
        SCREEN_HEIGHT - PLATFORM_HEIGHT,
        SCREEN_HEIGHT - PLATFORM_HEIGHT - p2y / 2,
        undefined,
        55,
        PLATFORM_HEIGHT,
        "#999"
      )
    );

    const p5coord = new Coord(SCREEN_WIDTH - 75, SCREEN_HEIGHT - PLATFORM_HEIGHT * 5);
    scene.platforms.push(new Platform(p5coord, 75, PLATFORM_HEIGHT));

    const rightDoorCoord = new Coord(
      SCREEN_WIDTH - PLATFORM_HEIGHT / 2,
      SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT * 1.25
    );
    const nextPlayerPosD2 = new Coord(
      10,
      SCREEN_HEIGHT - PLATFORM_HEIGHT * 5 - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER
    );
    const d2 = new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 2, nextPlayerPosD2, 0);
    scene.doors.push(d2);

    const s1coord = new Coord(p3coord.x + scene.platforms[2].width / 2 - 30, p3coord.y - 80);
    const s1 = new Server(s1coord, 1, [d2]);
    scene.servers.push(s1);

    scenes.push(scene);
  }

  static buildScene2() {
    const scene = new Scene();

    const platformsBottomY = SCREEN_HEIGHT - PLATFORM_HEIGHT * 5;
    const platformsInitialY = 120;
    const platformsFinalY = SCREEN_HEIGHT - PLATFORM_HEIGHT - 30;

    const doorD1Coord = new Coord(0, platformsBottomY - DEFAULT_PLAYER_HEIGHT * 1.25);
    const nextPlayerPosD1 = new Coord(
      SCREEN_WIDTH - 10 - player.width,
      platformsBottomY - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER
    );
    scene.doors.push(new Door(doorD1Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 1, nextPlayerPosD1, 1));

    const p1coord = new Coord(0, platformsBottomY);
    scene.platforms.push(new Platform(p1coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    const p2X = DEFAULT_PLATFORM_WIDTH + 40;
    scene.platforms.push(SceneBuilder.buildVerticalMovingPlatform(p2X, platformsInitialY, platformsFinalY));

    const p3coord = new Coord(p2X + DEFAULT_MOVING_PLATFORM_WIDTH + 40, platformsBottomY);
    scene.platforms.push(new Platform(p3coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    const p4X = p3coord.x + DEFAULT_PLATFORM_WIDTH + 40;
    scene.platforms.push(SceneBuilder.buildVerticalMovingPlatform(p4X, platformsInitialY, platformsFinalY));

    const p5coord = new Coord(p4X + DEFAULT_MOVING_PLATFORM_WIDTH + 40, platformsBottomY);
    scene.platforms.push(new Platform(p5coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    const p6X = p5coord.x + DEFAULT_PLATFORM_WIDTH + 40;
    scene.platforms.push(SceneBuilder.buildVerticalMovingPlatform(p6X, platformsInitialY, platformsFinalY));

    const p7coord = new Coord(SCREEN_WIDTH - DEFAULT_PLATFORM_WIDTH, platformsBottomY * 0.6 - 3);
    scene.platforms.push(new Platform(p7coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    const rightDoorCoord = new Coord(
      SCREEN_WIDTH - PLATFORM_HEIGHT / 2,
      platformsBottomY * 0.6 - DEFAULT_PLAYER_HEIGHT - PLATFORM_HEIGHT
    );

    const c1Coord = new Coord(p6X + DEFAULT_PLATFORM_WIDTH / 2 - 20, 220);
    scene.coins.push(new Coin(c1Coord, COIN_WIDTH));

    const nextPlayerPosD2 = new Coord(10, platformsBottomY - DEFAULT_PLAYER_HEIGHT - COLLISION_SPACER);

    scene.doors.push(
      new Door(rightDoorCoord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 3, nextPlayerPosD2, 1)
    );

    scenes.push(scene);
  }

  static buildScene3() {
    const scene = new Scene();
    scenes.push(scene);
  }

  static buildScene4() {
    const scene = new Scene();

    const d1Coord = new Coord(SCREEN_WIDTH - PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25);
    const d1 = new Door(d1Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 2, undefined, 1);
    scene.doors.push(d1);

    const d2Coord = new Coord(0, SCREEN_HEIGHT - (40 + DEFAULT_PLAYER_HEIGHT * 1.25));
    const d2 = new Door(d2Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 2, undefined, 0);
    scene.doors.push(d2);

    const c1Coord = new Coord(SCREEN_WIDTH / 2 + 20, SCREEN_HEIGHT / 2 + 36);
    scene.coins.push(new Coin(c1Coord, COIN_WIDTH));

    const c2Coord = new Coord(32, SCREEN_HEIGHT / 2 - 2);
    scene.coins.push(new Coin(c2Coord, COIN_WIDTH));

    const p1Coord = new Coord(SCREEN_WIDTH - DEFAULT_PLATFORM_WIDTH, DEFAULT_PLAYER_HEIGHT * 1.25 + 62);
    scene.platforms.push(new Platform(p1Coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    let positions = [];
    const vertexes = 8;
    const radius = 80;
    const distance = (2 * Math.PI) / vertexes;
    for (let i = 0; i < vertexes; i++) {
      positions.push(
        new Coord(
          c1Coord.x + radius * Math.cos(distance * i) - DEFAULT_PLATFORM_WIDTH / 2,
          c1Coord.y + radius * Math.sin(distance * i) - PLATFORM_HEIGHT / 2
        )
      );
    }

    const moveSeq1 = new MovementSequence();
    const moveSeq2 = new MovementSequence();
    for (let i = 0; i < vertexes; i++) {
      let j1 = i % vertexes;
      let j1Next = (i + 1) % vertexes;
      moveSeq1.addMovement(new Movement(Coord.clone(positions[j1]), Coord.clone(positions[j1Next]), 4));
      let j2 = (i + Math.ceil(vertexes/2)) % vertexes;
      let j2Next = (i + Math.ceil(vertexes/2) + 1) % vertexes;
      moveSeq2.addMovement(new Movement(Coord.clone(positions[j2]), Coord.clone(positions[j2Next]), 4));
    }

    scene.platforms.push(
      new Platform(Coord.clone(positions[2]), DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT, undefined, false, true, moveSeq1)
    );
    scene.platforms.push(
      new Platform(Coord.clone(positions[6]), DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT, undefined, false, true, moveSeq2)
    );

    scene.platforms.push(SceneBuilder.buildHorizontalMovingPlatform(20, DEFAULT_PLAYER_HEIGHT + 70, 140, 10));

    const p5Coord = new Coord(0, SCREEN_HEIGHT - 40);
    scene.platforms.push(new Platform(p5Coord, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    scenes.push(scene);
  }

  static buildScene5() {
    const scene = new Scene();

    const p1 = new Coord(SCREEN_WIDTH - 60, SCREEN_HEIGHT - 40);
    scene.platforms.push(new Platform(p1, DEFAULT_PLATFORM_WIDTH, PLATFORM_HEIGHT));

    const d1Coord = new Coord(SCREEN_WIDTH - PLATFORM_HEIGHT / 2, SCREEN_HEIGHT - (40 + DEFAULT_PLAYER_HEIGHT * 1.25));
    const d1 = new Door(d1Coord, PLATFORM_HEIGHT / 2, DEFAULT_PLAYER_HEIGHT * 1.25, 2, undefined, 1);
    scene.doors.push(d1);

    const p2x = SCREEN_WIDTH - 160;
    scene.platforms.push(SceneBuilder.buildVerticalMovingPlatform(p2x, 160, SCREEN_HEIGHT - PLATFORM_HEIGHT - 30));

    const p3x = SCREEN_WIDTH - 260;
    scene.platforms.push(
      SceneBuilder.buildVerticalMovingPlatform(p3x, 120, SCREEN_HEIGHT - PLATFORM_HEIGHT - 40 - 30, 5)
    );

    const p4x = SCREEN_WIDTH - 360;
    scene.platforms.push(SceneBuilder.buildVerticalMovingPlatform(p4x, 90, SCREEN_HEIGHT - PLATFORM_HEIGHT - 50));

    const p5 = new Coord(30, SCREEN_HEIGHT - 40);
    scene.platforms.push(new Platform(p5, 100, PLATFORM_HEIGHT));

    const c1Coord = new Coord(255, 220);
    scene.coins.push(new Coin(c1Coord, COIN_WIDTH));

    const s1coord = new Coord(50, SCREEN_HEIGHT - 120);
    const s1 = new Server(s1coord, 3);
    scene.servers.push(s1);

    scenes.push(scene);
  }

  static buildVerticalMovingPlatform(x, y, bottomY, speed, width, height, color) {
    if (!speed) {
      speed = DEFAULT_PLATFORM_SPEED;
    }
    if (!color) {
      color = DEFAULT_MOVING_PLATFORM_COLOR;
    }
    if (!width) {
      width = DEFAULT_MOVING_PLATFORM_WIDTH;
    }
    if (!height) {
      height = width;
    }
    const pCoord = new Coord(x, y);
    const pBottomPos = new Coord(pCoord.x, bottomY);
    const pMovSeq = new MovementSequence();
    pMovSeq.addMovement(new Movement(Coord.clone(pCoord), pBottomPos, speed));
    pMovSeq.addMovement(new Movement(pBottomPos, Coord.clone(pCoord), speed));
    return new Platform(pCoord, width, height, color, false, true, pMovSeq);
  }

  static buildHorizontalMovingPlatform(x, y, rightX, speed, width, height, color) {
    if (!speed) {
      speed = DEFAULT_PLATFORM_SPEED;
    }
    if (!color) {
      color = "#999";
    }
    if (!width) {
      width = DEFAULT_PLATFORM_WIDTH;
    }
    if (!height) {
      height = PLATFORM_HEIGHT;
    }
    const pCoord = new Coord(x, y);
    const pRightPos = new Coord(rightX, pCoord.y);
    const pMovSeq = new MovementSequence();
    pMovSeq.addMovement(new Movement(Coord.clone(pCoord), pRightPos, speed));
    pMovSeq.addMovement(new Movement(pRightPos, Coord.clone(pCoord), speed));
    return new Platform(pCoord, width, height, color, false, true, pMovSeq);
  }
}
