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
    app.stage.addChild(this.sprite);
    this.windowHeight = app.screen.height;
    this.windowWidth = app.screen.width;
  }
  vel = new Vector(
    Math.random() * 2 < 1 ? -1 : 1,
    Math.random() * 2 > 1 ? -1 : 1
  );

  windowHeight: number;
  windowWidth: number;
  maxSpeed = 3;
  desiredSeparation = 20;
  radius = 50;

  update(dt: number, player: Player, b: Zombie[]) {
    this.vel.add(this.cohesion(b));
    this.vel.add(this.alignment(b));
    this.vel.add(this.separation(b));
    this.vel.add(player.position.copy().sub(this.position).mult(1.5));
    this.vel.limit(this.maxSpeed);
    console.log(this.vel);

    if (this.position.x < 0) this.vel.x = 4;
    if (this.position.y < 0) this.vel.y = 4;
    if (this.position.x > this.windowWidth - this.size.width) this.vel.x = -4;
    if (this.position.y > this.windowHeight - this.size.height) this.vel.y = -4;
    this.position.add(this.vel.mult(dt));
  }

  draw() {
    this.sprite.position.set(this.position.x, this.position.y);
  }

  cohesion(b: Zombie[]): Vector {
    const cohesion = new Vector(0);
    let count = 0;
    b.forEach((boid) => {
      if (
        boid !== this &&
        Math.abs(this.position.dist(boid.position)) < this.radius
      ) {
        cohesion.add(boid.position);
        count += 1;
      }
    });
    cohesion.div(count);

    return cohesion.sub(this.position).mult(0.1);
  }
  alignment(b: Zombie[]): Vector {
    const alignment = new Vector(0);
    let count = 0;
    b.forEach((boid) => {
      if (
        boid !== this &&
        Math.abs(this.position.dist(boid.position)) < this.radius
      ) {
        alignment.add(boid.vel);
        count += 1;
      }
    });
    alignment.div(count);

    return alignment.sub(this.position).div(100);
  }

  separation(b: Zombie[]): Vector {
    const separation = this.position.copy();
    let count = 0;
    b.forEach((boid) => {
      const dist = this.position.dist(boid.position);
      if (boid !== this && dist < this.radius) {
        separation.sub(boid.position.copy().div(dist / 10));
        count++;
      }
    });
    separation.div(count);
    return separation;
  }
}
