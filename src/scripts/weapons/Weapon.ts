import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import { Graphics, TilingSprite } from 'pixi.js';
import Bullet from './Bullet';
import Matter from 'matter-js';

export default class Weapon {
  constructor(
    App: PIXI.Application,
    Player: Player,
    PhysicsEngine: Matter.Engine
  ) {
    this.app = App;
    this.player = Player;
    this.physicsEngine = PhysicsEngine;

    this.sprite = PIXI.Sprite.from(
      PIXI.Loader.shared.resources['flamethrower'].texture!
    );
    this.sprite.width = 40;
    this.sprite.height = 20;
    this.sprite.anchor.set(0.5);
    this.app.stage.addChild(this.sprite!);

    this.speed = 5;
  }
  app;
  player;
  physicsEngine: Matter.Engine;

  sprite: PIXI.Sprite;
  mirroredSprite;
  bullet: Bullet;
  bullets: Bullet[] = [];
  speed;
  hasFired;

  draw() {
    this.sprite.x = this.player.sprite.position.x + 30;
    this.sprite.y = this.player.sprite.position.y + 30;

    if (this.player.goingUp()) {
      this.sprite.rotation = (3 / 2) * Math.PI;
    }
    if (this.player.goingDown()) {
      this.sprite.rotation = Math.PI / 2;
    }
    if (this.player.goingLeft()) {
      this.sprite.rotation = Math.PI;
    }
    if (this.player.goingRight()) {
      this.sprite.rotation = 2 * Math.PI;
    }
  }
}

// this.mirroredSprite = this.sprite.scale.y *= -1;
// this.sprite.anchor.y = 1; /* 0 = top, 0.5 = center, 1 = bottom */
// this.mirroredSprite; /* flip vertically */
