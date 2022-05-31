import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import { Graphics } from 'pixi.js';
import Bullet from './Bullet';

export default class Weapon {
  constructor(App: PIXI.Application, Player: Player) {
    this.player = Player;
    this.app = App;

    this.speed = 5;
    this.lookingAt = this.player.lookingAt;
  }
  player;
  lookingAt;
  bullet: Bullet;
  bullets = [];
  speed;
  hasFired;
  app;

  fire(dt) {
    if (this.player.firing()) {
      this.hasFired = true;

      this.bullet = new Bullet(this.app);
      this.bullet.shootBullet(this.player);

      //The extra && statements are so that bullets can go in an diagonal direction.
      if (this.player.lookingAt.x >= -1 && this.player.lookingAt.x <= 0)
        this.bullet.direction.left = true;
      if (this.player.lookingAt.x <= 1 && this.player.lookingAt.x >= 0)
        this.bullet.direction.right = true;
      if (this.player.lookingAt.y >= -1 && this.player.lookingAt.y <= 0)
        this.bullet.direction.up = true;
      if (this.player.lookingAt.y <= 1 && this.player.lookingAt.y >= 0)
        this.bullet.direction.down = true;

      this.bullets.push(this.bullet);
    }

    this.bullets.forEach((bullet: Bullet) => {
      if (bullet.direction.left) bullet.hitBox.x -= bullet.speed;
      if (bullet.direction.right) bullet.hitBox.x += bullet.speed;
      if (bullet.direction.up) bullet.hitBox.y -= bullet.speed;
      if (bullet.direction.down) bullet.hitBox.y += bullet.speed;
    });
  }
}
