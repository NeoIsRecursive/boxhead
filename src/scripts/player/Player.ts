import character from '../../assets/character.png';
import * as PIXI from 'pixi.js';
class Player {
  id: number;
  sprite: PIXI.Sprite;
  position = { x: 40, y: 50 };
  controlls = { up: 'w', left: 'a', down: 's', right: 'd' };
  speed = 4;

  constructor(id: number, app: PIXI.Application) {
    this.id = id;
    this.sprite = PIXI.Sprite.from(character);
    app.stage.addChild(this.sprite);
  }

  update(dt: number, keys: boolean[]) {
    const speed = this.speed * dt;
    if (keys[this.controlls.up]) this.position.y -= speed;
    if (keys[this.controlls.down]) this.position.y += speed;
    if (keys[this.controlls.left]) this.position.x -= speed;
    if (keys[this.controlls.right]) this.position.x += speed;
  }

  draw() {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

export default Player;
