// import * as PIXI from 'pixi.js';
// import { Vector } from 'p5js-vector-standalone';
// import Player from '../player/Player';
// import { Graphics } from 'pixi.js';
// import Bullet from './Bullet';
// import Matter from 'matter-js';
// import Weapon from './Weapon';
// import Zombie from '../enemies/Zombie';

// class PistolBullet extends Bullet {
//   constructor(
//     App: PIXI.Application,
//     physics: Matter.World,
//     from: Matter.Vector,
//     to: Vector
//   ) {
//     super(
//       1,
//       physics,
//       PIXI.Sprite.from(PIXI.Loader.shared.resources['flame'].texture!),
//       to
//     );
//     this.sprite!.width = 15;
//     this.sprite!.height = 15;
//     this.lifetime = 26;
//     this.damage = 10;

//     this.app = App;
//     this.app.stage.addChild(this.sprite!);
//     this.speed = 15;
//     this.direction = { left: false, right: false, up: false, down: false };

//     Matter.Body.setPosition(
//       this.body,
//       Matter.Vector.create(from.x + 30 * to.x, from.y + 30 * to.y)
//     );
//     this.body.circleRadius = 0.1;
//     this.body.frictionAir = 0.2;
//     const force = Matter.Vector.create(to.x * this.speed, to.y * this.speed);
//     Matter.Body.applyForce(this.body, this.body.position, force);
//   }
//   app;
//   speed;
//   direction;
//   lifetime;
//   damage;

//   draw() {
//     //I would like to change to position of the flames but it breaks the flamethrower sprite for some reason
//     this.sprite!.position.set(this.body.position.x, this.body.position.y);
//   }
// }

// export default class Pistol extends Weapon {
//   constructor(
//     App: PIXI.Application,
//     Player: Player,
//     PhysicsEngine: Matter.Engine
//   ) {
//     super(App, Player, PhysicsEngine);

//     this.sprite = PIXI.Sprite.from(
//       PIXI.Loader.shared.resources['flamethrower'].texture!
//     );
//   }

//   fire(enemies: Zombie[]) {
//     if (this.player.firing()) {
//       console.log('pew');
//       this.bullets.push(
//         new PistolBullet(
//           this.app,
//           this.player.physics,
//           this.player.body.position,
//           this.player.lookingAt
//         )
//       );
//     }

//     this.bullets.forEach((bullet: Bullet) => {
//       bullet.draw();
//     });

//     for (let j = 0; j < this.bullets.length; j++) {
//       for (let i = 0; i < enemies.length; i++) {
//         if (
//           (Matter as any).Collision.collides(
//             this.bullets[j].body,
//             enemies[i].body
//           )
//         ) {
//           enemies[i].hitpoints -= this.bullets[j].damage;
//           this.bullets[j].lifetime = 0;

//           //We should probably use a linked list instead of an array when suddenly pulling stuff out but uwww maybe some other day!
//           if (enemies[i].hitpoints <= 0) {
//             enemies[i].die();
//             enemies.splice(i, 1);
//           }
//         }
//       }

//       this.bullets[j].lifetime -= 1;
//       if (this.bullets[j].lifetime <= 0) {
//         this.bullets[j].damage = 0;
//         Matter.World.remove(this.physicsEngine.world, this.bullets[j].body);
//         this.app.stage.removeChild(this.bullets[j].sprite!);
//         this.bullets.splice(j, 1);
//       }
//     }
//   }
// }
