import * as PIXI from 'pixi.js';
import Entity from '../entities/Entity';
import { Vector } from 'p5js-vector-standalone';
import { Dict } from '@pixi/utils';
import Matter from 'matter-js';

class Player extends Entity {
  constructor(
    id: number,
    app: PIXI.Application,
    animations: Dict<PIXI.Texture<PIXI.Resource>[]>,
    physicsComposite: Matter.World
  ) {
    super(id, physicsComposite);
    this.animations = animations;
    this.sprite = new PIXI.AnimatedSprite(this.animations['idle_left']);
    this.sprite.loop = false;
    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;
    this.sprite.animationSpeed = 0.25;
    this.body.label = 'player';

    Matter.Body.setPosition(
      this.body,
      Matter.Vector.create(app.screen.width / 2, app.screen.height / 2)
    );

    this.aimStick = new PIXI.Graphics();

    app.stage.addChild(this.sprite);
    app.stage.addChild(this.aimStick);
  }
  animations: Dict<PIXI.Texture<PIXI.Resource>[]>;
  controlls = { up: 'w', left: 'a', down: 's', right: 'd' };
  goingUp = (): boolean => window.keys.get(this.controlls.up) || false;
  goingDown = (): boolean => window.keys.get(this.controlls.down) || false;
  goingLeft = (): boolean => window.keys.get(this.controlls.left) || false;
  goingRight = (): boolean => window.keys.get(this.controlls.right) || false;
  vel = new Vector(0, 0);
  lookingAt = new Vector(0, 0);
  speed = 4;
  sprite: PIXI.AnimatedSprite;
  aimStick: PIXI.Graphics;
  hitpoints = 100;

  lastx = -1;

  update(dt: number) {
    const vel = { x: 0, y: 0 };
    const speed = this.speed * dt;

    if (this.goingUp()) {
      vel.y = -1;
      if (!this.sprite.playing) {
        this.sprite.textures =
          this.animations['run_' + (this.lastx < 0 ? 'left' : 'right')];
        this.sprite.play();
      }
    }
    if (this.goingDown()) {
      vel.y = 1;
      if (!this.sprite.playing) {
        this.sprite.textures =
          this.animations['run_' + (this.lastx < 0 ? 'left' : 'right')];
        this.sprite.play();
      }
    }
    if (this.goingLeft()) {
      vel.x = -1;
      this.lastx = vel.x;
      if (!this.sprite.playing) {
        this.sprite.textures = this.animations['run_left'];
        this.sprite.play();
      }
    }
    if (this.goingRight()) {
      vel.x = 1;
      this.lastx = vel.x;
      if (!this.sprite.playing) {
        this.sprite.textures = this.animations['run_right'];
        this.sprite.play();
      }
    }

    this.vel.set(vel.x, vel.y).limit(1);
    if (this.vel.magSq() > 0) {
      this.lookingAt.set(this.vel);
    } else {
      if (!this.sprite.playing) {
        this.sprite.textures =
          this.animations['idle_' + (this.lastx < 0 ? 'left' : 'right')];
        this.sprite.play();
      }
    }
    const force = Matter.Vector.create(this.vel.x * speed, this.vel.y * speed);
    Matter.Body.applyForce(this.body, this.body.position, force);
  }

  draw() {
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
  }

  damage(inflicted: number) {
    this.hitpoints -= inflicted;
    if (this.hitpoints <= 0) {
      console.log('dead');
    }
  }
}

export default Player;
