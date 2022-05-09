import * as PIXI from 'pixi.js';
import Vec from '../utils/Vec';

export default class Entity {
  id: number;
  sprite: PIXI.Sprite;
  position = new Vec(0, 0);
  size = { height: 64, width: 32 };
  constructor(id: number, sprite: PIXI.Sprite) {
    this.id = id;
    this.sprite = sprite;
  }
}
