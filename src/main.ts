import * as PIXI from 'pixi.js';
import Player from './scripts/player/Player';
import Wall from './scripts/entities/Wall';
import setUpKeys from './scripts/player/Controller';
import Hitbox from './scripts/player/Hitbox';
import Collision from './scripts/utils/Collision';

setUpKeys();

let app = new PIXI.Application({
  width: 640,
  height: 400,
  backgroundColor: 0xfafafa,
});

const player = new Player(1, app);
player.draw();

const wall = new Wall(2, app);
wall.draw();

const hitbox = new Hitbox(3, app, player);

const GameLoop = (dt: number) => {
  [player, hitbox].forEach((entity) => {
    if (Collision(hitbox, wall)) {
      console.log('Hit'); //Testing things out
    }
    entity.update(dt);
  });
  [player].forEach((entity) => {
    entity.draw();
  });
};

app.ticker.maxFPS = 60;
//dt is delta time
app.ticker.add((dt) => {
  GameLoop(dt);
});

document.getElementById('app')!.appendChild(app.view);
