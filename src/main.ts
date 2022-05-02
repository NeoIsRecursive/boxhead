import * as PIXI from 'pixi.js';
import character from './assets/character.png';

let app = new PIXI.Application({
  width: 640,
  height: 400,
  backgroundColor: 0xfafafa,
});

const sprite = PIXI.Sprite.from(character);

app.stage.addChild(sprite);

document.getElementById('app')!.appendChild(app.view);
