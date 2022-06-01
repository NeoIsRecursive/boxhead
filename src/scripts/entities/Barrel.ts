import Matter from 'matter-js';
import { Application, Sprite } from 'pixi.js';
import Wall from './Wall';

export default class Barrel extends Wall {
  constructor(
    id: number,
    app: Application,
    physicsComposite: Matter.World,
    sprite: Sprite,
    x: number,
    y: number
  ) {
    super(id, app, physicsComposite, sprite, x, y);
  }
  hitpoints = 10;

  explode() {
    console.log('boom');
  }
}
