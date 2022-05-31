import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import { Graphics } from 'pixi.js';
import Bullet from './Bullet';
import Matter from 'matter-js';

export default class Weapon {
  constructor(App: PIXI.Application, Player: Player) {
    this.player = Player;
    this.app = App;

    this.speed = 5;
  }
  player;
  bullet: Bullet;
  bullets: Bullet[] = [];
  speed;
  hasFired;
  app;

  fire(dt) {
    if (this.player.firing()) {
      this.hasFired = true;
      console.log('pew');
      // this.bullet.shootBullet(this.player);

      //The extra && statements are so that bullets can go in an diagonal direction.
      // if (this.player.lookingAt.x >= -1 && this.player.lookingAt.x <= 0)
      //   this.bullet.direction.left = true;
      // if (this.player.lookingAt.x <= 1 && this.player.lookingAt.x >= 0)
      //   this.bullet.direction.right = true;
      // if (this.player.lookingAt.y >= -1 && this.player.lookingAt.y <= 0)
      //   this.bullet.direction.up = true;
      // if (this.player.lookingAt.y <= 1 && this.player.lookingAt.y >= 0)
      //   this.bullet.direction.down = true;

      this.bullets.push(
        new Bullet(
          this.app,
          this.player.physics,
          this.player.body.position,
          this.player.lookingAt
        )
      );
    }

    this.bullets.forEach((bullet: Bullet) => {
      bullet.draw();
    });
  }
}
