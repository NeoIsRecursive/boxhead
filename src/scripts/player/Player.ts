import character from '../../assets/character.png';
import * as PIXI from 'pixi.js';
class Player {
  id: number;
  sprite: PIXI.Sprite;
  position = { x: 40, y: 50 };
  controlls = { up: 'w', left: 'a', down: 's', right: 'd' };

  constructor(id: number, app: PIXI.Application) {
    this.id = id;
    this.sprite = PIXI.Sprite.from(character);
    app.stage.addChild(this.sprite);
  }

  update(dt: number, keys: boolean[]) {
    if (keys[this.controlls.up]) this.position.y -= 0.1;
    if (keys[this.controlls.down]) this.position.y += 0.1;
    if (keys[this.controlls.left]) this.position.x -= 0.1;
    if (keys[this.controlls.right]) this.position.x += 0.1;
    console.log(this.position.x);
  }

  draw() {
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

export default Player;
