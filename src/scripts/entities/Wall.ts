import wall from '../../assets/wall.png';
import * as PIXI from 'pixi.js';
import Entity from './Entity';

class Wall extends Entity {
  rectangle = new PIXI.Graphics();
  constructor(id: number, app: PIXI.Application) {
    super(id, PIXI.Sprite.from(wall));
    this.bounds = {
      left: 0,
      right: app.screen.width,
      top: 0,
      bottom: app.screen.height,
    };
    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;

    this.position.set(app.screen.width / 2, app.screen.height / 2);

    app.stage.addChild(this.sprite);
  }

  draw() {}
}

export default Wall;