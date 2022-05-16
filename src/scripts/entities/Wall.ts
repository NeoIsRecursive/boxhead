import wall from '../../assets/wall.png';
import * as PIXI from 'pixi.js';
import Entity from './Entity';

class Wall extends Entity {
  constructor(id: number, app: PIXI.Application) {
    super(id, PIXI.Sprite.from(wall));
    this.sprite.height = this.size.height;
    this.sprite.width = 70;

    this.position.set(app.screen.width / 2 - 200, app.screen.height / 2);
    app.stage.addChild(this.sprite);
  }

  draw() {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

export default Wall;
