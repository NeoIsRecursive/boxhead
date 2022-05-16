import Player from './Player';
import * as PIXI from 'pixi.js';

class Hitbox {
  hitbox = new PIXI.Graphics();
  distance: number;

  player;

  constructor(id: number, app: PIXI.Application, Player: Player) {
    this.hitbox.drawRect(0, 0, 32, 60);
    this.hitbox.endFill();
    this.hitbox.x = 0;
    this.hitbox.y = 0;
    app.stage.addChild(this.hitbox);

    this.distance = 10;
    this.player = Player;
  }

  update() {
    this.hitbox.x = this.player.position.x;
    this.hitbox.y = this.player.position.y;

    if (this.player.goingUp()) this.hitbox.y -= this.distance;
    if (this.player.goingDown()) this.hitbox.y += this.distance;
    if (this.player.goingLeft()) this.hitbox.x -= this.distance;
    if (this.player.goingRight()) this.hitbox.x += this.distance;
  }
}

export default Hitbox;
