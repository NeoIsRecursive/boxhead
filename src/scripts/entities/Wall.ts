import wall from '../../../assets/wall.png';
import * as PIXI from 'pixi.js';
import Entity from './Entity';
import { RandomEvenPos } from '../utils/RandomCol';

class Wall extends Entity {
  constructor(id: number, app: PIXI.Application) {
    super(id, PIXI.Sprite.from(wall));
    this.sprite.height = this.size.width;
    this.sprite.width = this.size.width;
    const pos = RandomEvenPos(
      app.screen.width,
      app.screen.height,
      this.size.width
    );
    this.position.set(pos.x, pos.y);
    app.stage.addChild(this.sprite);
  }

  draw() {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

export default Wall;
