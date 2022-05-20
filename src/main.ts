import * as PIXI from 'pixi.js';
import Player from './scripts/player/Player';
import Wall from './scripts/entities/Wall';
import setUpKeys from './scripts/player/Controller';

import Zombie from './scripts/enemies/Zombie';
import Hitbox from './scripts/player/Hitbox';
import Collision from './scripts/utils/Collision';

setUpKeys();

const width = 640;
const height = 480;
const res = 32;

let app = new PIXI.Application({
  width,
  height,
  backgroundColor: 0xfafafa,
});

const players = [new Player(1, app)];
players[0].draw();

const enemies: Zombie[] = [];

for (let index = 0; index < 10; index++) {
  enemies.push(new Zombie(index, app));
  const randomX = Math.floor(Math.random() * app.screen.width);
  const randomy = Math.floor(Math.random() * app.screen.height);
  enemies[index].position.set(
    Math.floor(randomX / res) * res,
    Math.floor(randomy / res) * res
  );
}

const wall = new Wall(2, app);
wall.draw();

const GameLoop = (dt: number) => {
  const entities = [...players, ...enemies];

  entities.forEach((entity) => {
    entity.update(dt, players);
  });

  entities.forEach((entity) => {
    entity.draw();
  });
};

app.ticker.maxFPS = 60;
// dt is delta time
app.ticker.add((dt) => {
  GameLoop(1);
});

document.getElementById('app')!.appendChild(app.view);
