import * as PIXI from 'pixi.js';
import Player from '../player/Player';

export default class Bullet {
  constructor(App: PIXI.Application) {
    this.app = App;
    this.speed = 20;
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
    this.hitBox.drawRect(
      Player.body.position.x + Player.sprite.width / 2,
      Player.body.position.y + Player.sprite.height / 2,
      5,
      5
    );
    this.hitBox.endFill();
    this.app.stage.addChild(this.hitBox);
  }
}
