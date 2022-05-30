import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import { Graphics } from 'pixi.js';

export default class Weapon {
  constructor(App: PIXI.Application, Player: Player) {
    this.player = Player;
    this.app = App;

    this.speed = 5;
  }
  player;
  bullet: PIXI.Graphics;
  bullets = [PIXI.Graphics];
  speed;
  hasFired;
  app;

  fire(dt) {
    if (this.player.firing()) {
      this.hasFired = true;
      console.log('boom');

      this.bullet = new PIXI.Graphics();
      this.bullet.beginFill(0xff0000);
      this.bullet.x = 0;
      this.bullet.drawRect(
        this.player.position.x,
        this.player.position.y,
        5,
        5
      );
      this.bullet.endFill();
      this.app.stage.addChild(this.bullet);
      this.bullets.push(this.bullet);

      if (this.player.goingUp()) console.log('fire up');
      if (this.player.goingDown()) console.log('fire down');
      if (this.player.goingLeft()) console.log('fire left');
      if (this.player.goingRight()) console.log('fire right');
    }
    if (this.hasFired) {
      console.log(this.bullets);

      this.bullets.forEach((bullet) => {
        bullet.x += dt * this.speed;
      });
    }
  }

  draw() {}
}
