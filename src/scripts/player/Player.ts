import * as PIXI from 'pixi.js';
import Entity from '../entities/Entity';
import { Vector } from 'p5js-vector-standalone';
import { Dict } from '@pixi/utils';
import Matter from 'matter-js';
import type Controlls from '../../types/Controlls';

class Player extends Entity {
  constructor(
    id: number,
    app: PIXI.Application,
    animations: Dict<PIXI.Texture<PIXI.Resource>[]>,
    physicsComposite: Matter.World,
    controlls: Controlls
  ) {
    super(id, physicsComposite);
    this.animations = animations;
    this.sprite = new PIXI.AnimatedSprite(this.animations['idle_left']);
    this.sprite.loop = false;
    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;
    this.sprite.animationSpeed = 0.25;
    this.body.label = 'player';
    this.controlls = controlls;

    Matter.Body.setPosition(
      this.body,
      Matter.Vector.create(app.screen.width / 2, app.screen.height / 2)
    );

    this.healthBar = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.healthBar.width = 32;
    this.healthBar.height = 4;
    this.healthBar.tint = 0xff0000;

    app.stage.addChild(this.sprite);
    app.stage.addChild(this.healthBar);
  }
  animations: Dict<PIXI.Texture<PIXI.Resource>[]>;
  controlls;
  goingUp = (): boolean => window.keys.get(this.controlls.up) || false;
  goingDown = (): boolean => window.keys.get(this.controlls.down) || false;
  goingLeft = (): boolean => window.keys.get(this.controlls.left) || false;
  goingRight = (): boolean => window.keys.get(this.controlls.right) || false;
  vel = new Vector(0, 0);
  lookingAt = new Vector(0, 0);
  speed = 4;
  sprite: PIXI.AnimatedSprite;
  healthBar: PIXI.Sprite;
  MaxHP = 100;
  hitpoints = this.MaxHP;
  dead = false;

  lastx = -1;

  update(dt: number) {
    if (this.dead) return;

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

<<<<<<< HEAD
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
<<<<<<< HEAD
    const force = Matter.Vector.create(this.vel.x * speed, this.vel.y * speed);
    Matter.Body.applyForce(this.body, this.body.position, force);
=======

=======
    this.vel.set(vel.x, vel.y);
>>>>>>> 8240b17 (Basic direction for guns)
    this.position.add(this.vel.x * speed, this.vel.y * speed);

    // if (this.vel.y < 0) this.sprite.textures = this.animations['idle_left'];
    // if (this.vel.y < 0) this.sprite.textures = this.animations['idle_left'];

    const hit = Contain(this, this.bounds);
    if (hit.top) this.position.y = this.bounds.top;
    if (hit.bottom) this.position.y = this.bounds.bottom - this.size.height;
    if (hit.left) this.position.x = this.bounds.left;
    if (hit.right) this.position.x = this.bounds.right - this.size.width;
>>>>>>> 3be0edf (Checkout and rebase from master to weapons)
  }

  draw() {
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;

    this.healthBar.position.set(this.body.position.x, this.body.position.y - 8);
  }

  damage(inflicted: number) {
    if (this.hitpoints <= 0) return;
    this.hitpoints -= inflicted;
    this.sprite.textures =
      this.animations['damage_' + (this.lastx < 0 ? 'left' : 'right')];
    this.sprite.play();
    this.healthBar.width = 32 * (this.hitpoints / this.MaxHP);
    if (this.hitpoints <= 0) {
      this.die();
    }
  }

  die() {
    this.dead = true;
    this.sprite.textures =
      this.animations['die_' + (this.lastx < 0 ? 'left' : 'right')];
    this.sprite.play();
  }
}

export default Player;
