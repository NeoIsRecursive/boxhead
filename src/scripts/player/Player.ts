//import character from '../../assets/knight/texture.json';
import * as PIXI from 'pixi.js';
import Contain from '../utils/Contain';
import Entity from '../entities/Entity';
import Bounds from '../../types/Bounds';
import { Vector } from 'p5js-vector-standalone';
import { Dict } from '@pixi/utils';

class Player extends Entity {
  constructor(
    id: number,
    app: PIXI.Application,
    animations: Dict<PIXI.Texture<PIXI.Resource>[]>
  ) {
    super(id, new PIXI.AnimatedSprite(animations['idle_left']));
    this.bounds = {
      left: 0,
      right: app.screen.width,
      top: 0,
      bottom: app.screen.height,
    };
    this.animations = animations;
    this.sprite = new PIXI.AnimatedSprite(this.animations['idle_left']);
    this.sprite.loop = false;
    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;
    this.sprite.animationSpeed = 0.25;

    this.position.set(app.screen.width / 2, app.screen.height / 2);
    this.aimStick = new PIXI.Graphics();

    app.stage.addChild(this.sprite);
    app.stage.addChild(this.aimStick);
  }
  animations: Dict<PIXI.Texture<PIXI.Resource>[]>;
  bounds: Bounds;
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

    this.position.add(this.vel.x * speed, this.vel.y * speed);

    // if (this.vel.y < 0) this.sprite.textures = this.animations['idle_left'];
    // if (this.vel.y < 0) this.sprite.textures = this.animations['idle_left'];

    const hit = Contain(this, this.bounds);
    if (hit.top) this.position.y = this.bounds.top;
    if (hit.bottom) this.position.y = this.bounds.bottom - this.size.height;
    if (hit.left) this.position.x = this.bounds.left;
    if (hit.right) this.position.x = this.bounds.right - this.size.width;
  }

  draw() {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;

    /* this.aimStick.clear();

    this.aimStick.position.set(
      this.position.x + this.size.width * 0.5,
      this.position.y + this.size.height * 0.5
    );
    this.aimStick
      .lineStyle(5, 0x000000)
      .moveTo(0, 0)
      .lineTo(this.lookingAt.x * 32, this.lookingAt.y * 32); */
  }

  damage(inflicted: number) {
    this.hitpoints -= inflicted;
    if (this.hitpoints <= 0) {
      console.log('dead');
    }
  }
}

export default Player;
