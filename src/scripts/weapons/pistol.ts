import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';

export default class Pistol {
  constructor(Player: Player) {
    this.player = Player;
    this.hitBox = new PIXI.Graphics();
  }
  player;
  hitBox;

  fire() {
    if (this.player.firing()) {
      if (this.player.goingUp()) console.log('fire up');
      if (this.player.goingDown()) console.log('fire down');
      if (this.player.goingLeft()) console.log('fire left');
      if (this.player.goingRight()) console.log('fire right');
    }
  }

  draw() {
    // console.log(this.player.position);
    this.hitBox.position.set(this.player.position.x, this.player.position.y);
    this.hitBox
      .lineStyle(20, 0xffffff)
      .moveTo(0, 0)
      .lineTo(this.player.vel.x, this.player.vel.y);
  }
}
