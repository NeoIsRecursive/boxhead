import Entity from '../entities/Entity';
import character from '../../assets/character.png';
import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import Astar from './Astar';

export default class Zombie extends Entity {
  constructor(id: number, app: PIXI.Application, obstacles: Entity[]) {
    super(id, PIXI.Sprite.from(character));
    this.sprite!.height = this.size.height;
    this.sprite!.width = this.size.width;

    app.stage.addChild(this.sprite!);
    this.windowHeight = app.screen.height;
    this.windowWidth = app.screen.width;

    this.#pathFinder = new Astar(32, obstacles, app);
  }

  #pathFinder: Astar;

  vel = new Vector(0);

  windowHeight: number;
  windowWidth: number;
  hitpoints = 100;
  damage = 10;
  maxSpeed = 2;
  walking = false;
  nextPos = new Vector(0);
  count = 0;
  update(dt: number, players: Player[]) {
    const newVec = this.#pathFinder.getPath(this.position, players[0].position);

    this.vel.set(newVec.mult(dt));

    this.position.add(this.vel);
    /*     if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + 32 > this.windowWidth)
      this.position.x = this.windowWidth - 32;
    if (this.position.y < 0) this.windowHeight = 0;
    if (this.position.y + 32 > this.windowHeight)
      this.position.y = this.windowHeight - 32; */
  }

  draw() {
    this.sprite!.position.set(this.position.x, this.position.y);
  }
}
