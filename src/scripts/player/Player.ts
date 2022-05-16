import character from '../../assets/character.png';
import * as PIXI from 'pixi.js';
import Contain from '../utils/Contain';
import Entity from '../entities/Entity';
import Bounds from '../../types/Bounds';
import Vec from '../utils/Vec';

class Player extends Entity {
  bounds: Bounds;
  controlls = { up: 'w', left: 'a', down: 's', right: 'd' };
  goingUp = (): boolean => window.keys.get(this.controlls.up) || false;
  goingDown = (): boolean => window.keys.get(this.controlls.down) || false;
  goingLeft = (): boolean => window.keys.get(this.controlls.left) || false;
  goingRight = (): boolean => window.keys.get(this.controlls.right) || false;

  vel = new Vec(0, 0);
  speed = 4;

  constructor(id: number, app: PIXI.Application) {
    super(id, PIXI.Sprite.from(character));
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

  update(dt: number) {
    const vel = { x: 0, y: 0 };
    const speed = this.speed * dt;

    if (this.goingUp()) vel.y = -1;
    if (this.goingDown()) vel.y = 1;
    if (this.goingLeft()) vel.x = -1;
    if (this.goingRight()) vel.x = 1;

    this.vel.set(vel.x, vel.y);
    this.position.add(this.vel.x * speed, this.vel.y * speed);

    const hit = Contain(this, this.bounds);
    if (hit.top) this.position.y = this.bounds.top;
    if (hit.bottom) this.position.y = this.bounds.bottom - this.size.height;
    if (hit.left) this.position.x = this.bounds.left;
    if (hit.right) this.position.x = this.bounds.right - this.size.width;
  }

  draw() {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

export default Player;
