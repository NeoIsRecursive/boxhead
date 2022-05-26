import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Matter from 'matter-js';

export default class Entity {
  constructor(id: number, physics: Matter.World, sprite?: PIXI.Sprite) {
    this.id = id;
    Matter.Composite.add(physics, this.body);
    this.body.frictionAir = 0.8;
    if (typeof sprite !== undefined) this.sprite = sprite;
  }
  id: number;
  sprite?: PIXI.Sprite;
  position = new Vector(0, 0);
  body = Matter.Bodies.circle(0, 0, 16);
  size = { height: 32, width: 32 };
}
