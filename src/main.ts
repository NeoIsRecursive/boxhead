import * as PIXI from 'pixi.js';
import Player from './scripts/player/Player';
import Wall from './scripts/entities/Wall';
import setUpKeys from './scripts/player/Controller';
import Wall from './scripts/entities/Wall';

setUpKeys();

let app = new PIXI.Application({
  width: 640,
  height: 400,
  backgroundColor: 0xfafafa,
});

const player = new Player(1, app);
player.draw();

const wall = new Wall();
wall.draw(app);

const GameLoop = (dt: number) => {
  [player].forEach((entity) => {
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
