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
      PIXI.Sprite.from(PIXI.Loader.shared.resources['wall'].texture!)
    );
    this.sprite!.width = 5;
    this.sprite!.height = 5;

    this.app = App;
    this.app.stage.addChild(this.sprite!);
    this.speed = 20;
    this.direction = { left: false, right: false, up: false, down: false };

    Matter.Body.setPosition(
      this.body,
      Matter.Vector.create(from.x + 16 * to.x, from.y + 16 * to.y)
    );
    this.body.circleRadius = 1;
    this.body.frictionAir = 0.1;
    const force = Matter.Vector.create(to.x * this.speed, to.y * this.speed);
    Matter.Body.applyForce(this.body, this.body.position, force);
  }
  hitBox;
  app;
  speed;
  direction;

  draw() {
    this.sprite!.position.set(this.body.position.x, this.body.position.y);
  }

  //I hate having to take in player into this function...
  shootBullet(Player: Player) {
    // this.hitBox = new PIXI.Graphics();
    // this.hitBox.beginFill(0xff0000);
    // this.hitBox.x = 0;
    // this.hitBox.drawRect(
    //   Player.body.position.x + Player.sprite.width / 2,
    //   Player.body.position.y + Player.sprite.height / 2,
    //   5,
    //   5
    // );
    // this.hitBox.endFill();
    // this.app.stage.addChild(this.hitBox);
    // const force = Matter.Vector.create(this.speed, this.speed);
    // Matter.Body.applyForce(this.body, this.body.position, force);
  }
}
