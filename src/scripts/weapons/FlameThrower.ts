import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import { Graphics } from 'pixi.js';
import Bullet from './Bullet';
import Matter from 'matter-js';
import Weapon from './Weapon';
import Zombie from '../enemies/Zombie';

export default class Flamethrower extends Weapon {
  constructor(
    App: PIXI.Application,
    Player: Player,
    PhysicsEngine: Matter.Engine
  ) {
    super(App, Player, PhysicsEngine);
  }

  fire(enemies: Zombie[]) {
    if (this.player.firing()) {
      console.log('pew');
      this.bullets.push(
        new Bullet(
          this.app,
          this.player.physics,
          this.player.body.position,
          this.player.lookingAt
        )
      );
    }

    this.bullets.forEach((bullet: Bullet) => {
      bullet.draw();
    });

    for (let j = 0; j < this.bullets.length; j++) {
      for (let i = 0; i < enemies.length; i++) {
        if (
          (Matter as any).Collision.collides(
            this.bullets[j].body,
            enemies[i].body
          )
        ) {
          enemies[i].hitpoints -= this.bullets[j].damage;
          this.bullets[j].lifetime = 0;

          //We should probably use a linked list instead of an array when suddenly pulling stuff out but uwww maybe some other day!
          if (enemies[i].hitpoints <= 0) {
            enemies[i].die();
            enemies.splice(i, 1);
          }
        }
      }

      this.bullets[j].lifetime -= 1;
      if (this.bullets[j].lifetime <= 0) {
        this.bullets[j].damage = 0;
        Matter.World.remove(this.physicsEngine.world, this.bullets[j].body);
        this.app.stage.removeChild(this.bullets[j].sprite!);
        this.bullets.splice(j, 1);
      }
    }
  }
}
