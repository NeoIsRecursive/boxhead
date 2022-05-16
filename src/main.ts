import * as PIXI from 'pixi.js';
import Player from './scripts/player/Player';
import setUpKeys from './scripts/player/Controller';
import Zombie from './scripts/enemies/Zombie';

setUpKeys();

let app = new PIXI.Application({
  width: 640,
  height: 400,
  backgroundColor: 0xfafafa,
});

const player = new Player(1, app);
player.draw();

const enemies: Zombie[] = [];

for (let index = 0; index < 10; index++) {
  enemies.push(new Zombie(index, app));
  const randomX = Math.floor(Math.random() * app.screen.width);
  const randomy = Math.floor(Math.random() * app.screen.height);
  enemies[index].position.set(randomX, randomy);
}

const GameLoop = (dt: number) => {
  [player, ...enemies].forEach((entity) => {
    entity.update(dt, player, enemies);
  });

  [player, ...enemies].forEach((entity) => {
    entity.draw();
  });
};

app.ticker.maxFPS = 60;
//dt is delta time
app.ticker.add((dt) => {
  GameLoop(dt);
});

document.getElementById('app')!.appendChild(app.view);
