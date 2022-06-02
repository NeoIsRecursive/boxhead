import * as PIXI from 'pixi.js';
import Zombie from '../enemies/Zombie';
import Entity from '../entities/Entity';
import { Dict } from '@pixi/utils';

export default class Rounds {
  constructor(
    app: PIXI.Application,
    obstacles: Entity[],
    animations: Dict<PIXI.Texture<PIXI.Resource>[]>,
    physicsComposite: Matter.World
  ) {
    this.app = app;
    this.obstacles = obstacles;
    this.animations = animations;
    this.physicsComposite = physicsComposite;

    this.initial = 3;
    this.increase = 3;
    this.wait = 0;
  }
  app: PIXI.Application;
  obstacles: Entity[];
  animations: Dict<PIXI.Texture<PIXI.Resource>[]>;
  physicsComposite: Matter.World;

  initial: number;
  increase: number;
  wait: number;

  NextRound(enemies: Zombie[]) {
    this.initial += this.increase;
    for (let index = 0; index < this.initial; index++) {
      enemies.push(
        new Zombie(
          index,
          this.app,
          this.obstacles,
          this.animations,
          this.physicsComposite
        )
      );
    }
  }

  Rounds(enemies: Zombie[]) {
    if (enemies.length <= 0) {
      this.wait += 1;
      if (this.wait >= 50) {
        this.wait = 0;
        console.log('next');
        this.NextRound(enemies);
      }
    }
  }
}
