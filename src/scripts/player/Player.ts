import character from '../../assets/character.png';
import * as PIXI from 'pixi.js';
class Player {
  id: number;
  sprite: PIXI.Sprite;
  position = { x: 0, y: 50 };
  controlls = { up: 'w', left: 'a', down: 's', right: 'd' };
  size = { height: 64, width: 32 };
  goingUp = (): boolean => window.keys.get(this.controlls.up) || false;
  goingDown = (): boolean => window.keys.get(this.controlls.down) || false;
  goingLeft = (): boolean => window.keys.get(this.controlls.left) || false;
  goingRight = (): boolean => window.keys.get(this.controlls.right) || false;
  speed = 4;

  constructor(id: number, app: PIXI.Application) {
    this.id = id;

    this.sprite = PIXI.Sprite.from(character);

    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;

    this.position.x = app.screen.width / 2;
    this.position.y = app.screen.height / 2;

    app.stage.addChild(this.sprite);
  }

  update(dt: number) {
    const speed = this.speed * dt;
    if (this.goingUp()) this.position.y -= speed;
    if (this.goingDown()) this.position.y += speed;
    if (this.goingLeft()) this.position.x -= speed;
    if (this.goingRight()) this.position.x += speed;
  }

  draw() {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

export default Player;
