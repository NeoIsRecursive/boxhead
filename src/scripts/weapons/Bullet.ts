import * as PIXI from 'pixi.js';

export default class Bullet {
  constructor(App: PIXI.Application) {
    this.app = App;
    this.speed = 5;
    this.direction = { left: 0, right: 0, top: 0, down: 0 };
  }
  bullet;
  app;
  speed;
  direction;

  shootBullet() {
    this.bullet = new PIXI.Graphics();
    this.bullet.beginFill(0xff0000);
    this.bullet.x = 0;
    this.bullet.drawRect(this.player.position.x, this.player.position.y, 5, 5);
    this.bullet.endFill();
    this.app.stage.addChild(this.bullet);

    switch (this.direction) {
      case -1:
        this.bullet.x += this.speed;
        break;
      case 1:
        this.bullet.x += this.speed;
        break;
      case 1:
        this.bullet.x += this.speed;
        break;
      case -1:
        this.bullet.x += this.speed;
        break;
    }
  }
}
