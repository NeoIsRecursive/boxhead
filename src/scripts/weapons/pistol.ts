import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';

export default class Pistol {
  constructor(Player: Player) {
    this.player = Player;
  }
  player;

  fire() {
    if (this.player.firing()) {
      console.log('BAM');
    }
  }
}
