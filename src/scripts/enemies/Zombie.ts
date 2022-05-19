import Entity from '../entities/Entity';
import character from '../../assets/character.png';
import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import Astar from './Astar';

export default class Zombie extends Entity {
  constructor(id: number, app: PIXI.Application) {
    super(id, PIXI.Sprite.from(character));
    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;

    app.stage.addChild(this.sprite);
    this.windowHeight = app.screen.height;
    this.windowWidth = app.screen.width;

    this.#pathFinder = new Astar(32, app);
  }

  #pathFinder: Astar;

  vel = new Vector(0);

  windowHeight: number;
  windowWidth: number;
  hitpoints = 100;
  damage = 10;
  maxSpeed = 2;

  update(dt: number, players: Player[]) {
    const spot = this.#pathFinder.getPath(this.position, players[0].position);
    console.log(spot);
    this.position.x += spot.x * dt;
    this.position.y += spot.y * dt;
  }

  draw() {
    this.sprite.position.set(this.position.x, this.position.y);
  }
}
