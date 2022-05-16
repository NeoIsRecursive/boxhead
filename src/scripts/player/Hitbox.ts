import Player from './Player';
import * as PIXI from 'pixi.js';

class Hitbox {
  hitbox = new PIXI.Graphics();
  player;

  constructor(id: number, app: PIXI.Application, Player: Player) {
    this.hitbox.beginFill(0x66ccff);
    this.hitbox.drawRect(0, 0, 80, 40);
    this.hitbox.endFill();
    this.hitbox.x = 0;
    this.hitbox.y = 0;
    app.stage.addChild(this.hitbox);

    this.player = Player;
  }

  update() {
    if (this.player.goingUp()) this.hitbox.rotation = (3 * PIXI.PI_2) / 4;
    if (this.player.goingDown()) this.hitbox.rotation = PIXI.PI_2 / 4;
    if (this.player.goingLeft()) this.hitbox.rotation = PIXI.PI_2 / 2;
    if (this.player.goingRight()) this.hitbox.rotation = PIXI.PI_2;

    this.hitbox.x = this.player.position.x + this.player.size.width / 2;
    this.hitbox.y = this.player.position.y + this.player.size.height / 2;
  }
}

export default Hitbox;
