import Player from './Player';
import { Vector } from 'p5js-vector-standalone';
import Entity from '../entities/Entity';
import Collision from '../utils/Collision';

class Hitbox {
  constructor(player: Player) {
    this.distance = 10;
    this.player = player;
    this.position.set(this.player.position.x, this.player.position.y);
  }
  distance: number;
  player;
  position = new Vector(0);

  update() {
    this.position.x = this.player.position.x;
    this.position.y = this.player.position.y;

    if (this.player.goingUp()) this.position.y -= this.distance;
    if (this.player.goingDown()) this.position.y += this.distance;
    if (this.player.goingLeft()) this.position.x -= this.distance;
    if (this.player.goingRight()) this.position.x += this.distance;
  }

  check(entities: Entity[]) {
    for (let entity of entities) {
      if (Collision(this.player, entity)) {
        console.log('yeah');
        return true;
      }
    }
    return false;
  }
}

export default Hitbox;
