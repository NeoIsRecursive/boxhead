import * as PIXI from 'pixi.js';
import Player from '../player/Player';

export default class Bullet {
  constructor(App: PIXI.Application) {
    this.app = App;
    this.speed = 5;
    this.direction = { left: false, right: false, up: false, down: false };
  }
  hitBox;
  app;
  speed;
  direction;

  //I hate having to take in player into this function...
  shootBullet(Player: Player) {
    this.hitBox = new PIXI.Graphics();
    this.hitBox.beginFill(0xff0000);
    this.hitBox.x = 0;
    this.hitBox.drawRect(Player.position.x, Player.position.y, 5, 5);
    this.hitBox.endFill();
    this.app.stage.addChild(this.hitBox);
  }
}
