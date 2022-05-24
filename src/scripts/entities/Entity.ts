import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';

export default class Entity {
  id: number;
  sprite: PIXI.Sprite | PIXI.AnimatedSprite;
  position = new Vector(0, 0);
  size = { height: 32, width: 32 };
  constructor(id: number, sprite: PIXI.Sprite | PIXI.AnimatedSprite) {
    this.id = id;
    this.sprite = sprite;
  }
}
