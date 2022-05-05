import * as PIXI from 'pixi.js';
import Player from './scripts/player/Player';

let app = new PIXI.Application({
  width: 640,
  height: 400,
  backgroundColor: 0xfafafa,
});

const keys: boolean[] = [];

window.addEventListener('keydown', (e: KeyboardEvent) => {
  keys[e.key] = true;
});
window.addEventListener('keyup', function (e) {
  keys[e.key] = false;
});

const player = new Player(1, app);
player.draw();

const GameLoop = (dt: number) => {
  [player].forEach((entity) => {
    entity.update(dt, keys);
  });
  [player].forEach((entity) => {
    entity.draw();
  });
  requestAnimationFrame(GameLoop);
};

//dt is delta time
app.ticker.add((dt) => GameLoop(dt));

document.getElementById('app')!.appendChild(app.view);
