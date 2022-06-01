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
      console.log('pew');
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

    return this.bullets;
  }
}
