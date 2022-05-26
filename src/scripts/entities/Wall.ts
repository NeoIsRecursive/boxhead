import { Sprite, Application } from 'pixi.js';
import Entity from './Entity';
import Matter from 'matter-js';

class Wall extends Entity {
  constructor(
    id: number,
    app: Application,
    physicsComposite: Matter.World,
    sprite: Sprite,
    x: number,
    y: number
  ) {
    super(id, physicsComposite, sprite);
    this.body.isStatic = true;
    this.sprite!.height = this.size.width;
    this.sprite!.width = this.size.width;
    Matter.Body.setPosition(this.body, Matter.Vector.create(x * 32, y * 32));
    app.stage.addChild(this.sprite!);
    this.draw();
  }

  draw() {
    this.sprite!.x = this.body.position.x;
    this.sprite!.y = this.body.position.y;
  }
}

export default Wall;
