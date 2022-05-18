import * as PIXI from 'pixi.js';
import Player from './scripts/player/Player';
import setUpKeys from './scripts/player/Controller';
import Zombie from './scripts/enemies/Zombie';
import FlowField from './scripts/enemies/flowField';

setUpKeys();

const width = 640;
const height = 400;
const res = 20;

let app = new PIXI.Application({
  width,
  height,
  backgroundColor: 0xfafafa,
});

const flowField = new FlowField(width, height, res);

const players = [new Player(1, app), new Player(2, app)];

const enemies: Zombie[] = [];

for (let index = 0; index < 10; index++) {
  enemies.push(new Zombie(index, app));
  const randomX = Math.floor(Math.random() * app.screen.width);
  const randomy = Math.floor(Math.random() * app.screen.height);
  enemies[index].position.set(randomX, randomy);
}

const GameLoop = (dt: number) => {
  const entities = [...players, ...enemies];

  flowField.update(players);
  const grid = flowField.getGrid();
  entities.forEach((entity) => {
    entity.update(dt, players, grid);
  });

  entities.forEach((entity) => {
    entity.draw();
  });

  // flowField.getGrid().forEach((col, xindex) =>
  //   col.forEach((row, yindex) => {
  //     const test = new PIXI.Graphics();
  //     test.lineStyle({ width: 2, color: 0x000000 });
  //     test.drawRect(xindex * res, yindex * res, res, res);
  //     // console.log({ xindex, yindex, row });
  //     app.stage.addChild(test);
  //   })
  // );
};

app.ticker.maxFPS = 60;
// dt is delta time
app.ticker.add((dt) => {
  GameLoop(dt);
});

document.getElementById('app')!.appendChild(app.view);
