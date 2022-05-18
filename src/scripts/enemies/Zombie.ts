import Entity from '../entities/Entity';
import character from '../../assets/character.png';
import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';

export default class Zombie extends Entity {
  constructor(id: number, app: PIXI.Application) {
    super(id, PIXI.Sprite.from(character));
    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;
    this.velDisplay = new PIXI.Graphics();

    app.stage.addChild(this.sprite);
    app.stage.addChild(this.velDisplay);
    app.stage.addChild(this.sprite);
    this.windowHeight = app.screen.height;
    this.windowWidth = app.screen.width;
  }
  vel = new Vector(0);

  windowHeight: number;
  windowWidth: number;
  velDisplay: PIXI.Graphics;
  hitpoints = 100;
  damage = 10;
  maxSpeed = 2;

  update(dt: number, players: Player[], grid: Vector[][]) {
    const x = Math.floor(this.position.x * 0.05);
    const y = Math.floor(this.position.y * 0.05);

    this.vel.set(grid[x][y]);
    this.position.add(this.vel);
  }

  draw() {
    this.sprite.position.set(this.position.x, this.position.y);

    this.velDisplay.clear();

    this.velDisplay.position.set(
      this.position.x + this.size.width * 0.5,
      this.position.y + this.size.height * 0.5
    );
    this.velDisplay
      .lineStyle(5, 0x000000)
      .moveTo(0, 0)
      .lineTo(this.vel.x * 10, this.vel.y * 10);
  }
}
