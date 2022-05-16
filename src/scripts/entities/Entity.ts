import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';

export default class Entity {
  id: number;
  sprite: PIXI.Sprite;
  position = new Vector(0, 0);
  size = { height: 64, width: 32 };
  constructor(id: number, sprite: PIXI.Sprite) {
    this.id = id;
    this.sprite = sprite;
  }
}
