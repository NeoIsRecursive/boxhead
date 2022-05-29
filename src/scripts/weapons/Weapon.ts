import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import { Graphics } from 'pixi.js';

export default class Weapon {
  constructor(App: PIXI.Application, Player: Player) {
    this.player = Player;
    this.hitBox = new PIXI.Graphics();
    this.app = App;
  }
  player;
  hitBox;
  hasFired;
  app;

  fire(dt) {
    if (this.player.firing()) {
      this.hasFired = true;

      console.log('boom');

      this.hitBox.lineStyle({ width: 4, color: 0xff3300, alpha: 1 });
      this.hitBox.beginFill(0x66ccff);
      this.hitBox.drawRect(
        this.player.position.x,
        this.player.position.y,
        5,
        5
      );
      this.hitBox.endFill();

      this.app.stage.addChild(this.hitBox);
      if (this.player.goingUp()) console.log('fire up');
      if (this.player.goingDown()) console.log('fire down');
      if (this.player.goingLeft()) console.log('fire left');
      if (this.player.goingRight()) console.log('fire right');
    }
    if (this.hasFired) {
      this.hitBox.x += dt * 1;
    }
  }

  draw() {}
}
