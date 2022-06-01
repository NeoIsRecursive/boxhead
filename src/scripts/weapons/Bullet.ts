import * as PIXI from 'pixi.js';
import Player from '../player/Player';
import Matter from 'matter-js';
import Entity from '../entities/Entity';
import { Vector } from 'p5js-vector-standalone';

export default class Bullet extends Entity {
  constructor(
    App: PIXI.Application,
    physics: Matter.World,
    from: Matter.Vector,
    to: Vector
  ) {
    super(
      1,
      physics,
      PIXI.Sprite.from(PIXI.Loader.shared.resources['flame'].texture!)
    );
    this.sprite!.width = 15;
    this.sprite!.height = 15;
    this.lifetime = 26;
    this.damage = 1;

    this.app = App;
    this.app.stage.addChild(this.sprite!);
    this.speed = 15;
    this.direction = { left: false, right: false, up: false, down: false };

    Matter.Body.setPosition(
      this.body,
      Matter.Vector.create(from.x + 16 * to.x, from.y + 16 * to.y)
    );
    this.body.circleRadius = 0.1;
    this.body.frictionAir = 0.2;
    const force = Matter.Vector.create(to.x * this.speed, to.y * this.speed);
    Matter.Body.applyForce(this.body, this.body.position, force);
  }
  hitBox;
  app;
  speed;
  direction;
  lifetime;
  damage;

  draw() {
    this.sprite!.position.set(this.body.position.x, this.body.position.y);
  }
}
