import * as PIXI from 'pixi.js';
import Entity from './Entity';
import { RandomEvenPos } from '../utils/RandomCol';
import Matter from 'matter-js';

class Wall extends Entity {
  constructor(
    id: number,
    app: PIXI.Application,
    physicsComposite: Matter.World
  ) {
    super(
      id,
      physicsComposite,
      PIXI.Sprite.from(PIXI.Loader.shared.resources['wall'].texture!)
    );
    this.body.isStatic = true;
    this.sprite!.height = this.size.width;
    this.sprite!.width = this.size.width;
    const pos = RandomEvenPos(
      app.screen.width,
      app.screen.height,
      this.size.width
    );
    Matter.Body.setPosition(this.body, Matter.Vector.create(pos.x, pos.y));
    app.stage.addChild(this.sprite!);
  }

  draw() {
    this.sprite!.x = this.body.position.x;
    this.sprite!.y = this.body.position.y;
  }
}

export default Wall;
