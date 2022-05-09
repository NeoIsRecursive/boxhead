import * as PIXI from 'pixi.js';
import Entity from './Entity';

class Wall extends Entity {
  rectangle = new PIXI.Graphics();

  draw(app: PIXI.Application) {
    console.log(this.position);

    this.rectangle.beginFill(0xff0000);
    this.rectangle.drawRect(0, 0, 64, 64);
    this.rectangle.x = 100;
    this.rectangle.y = 100;
    this.rectangle.endFill();
    app.stage.addChild(this.rectangle);

    console.log(this.rectangle.getBounds());
  }
}

export default Wall;
