import Entity from '../entities/Entity';
import * as PIXI from 'pixi.js';
import { Dict } from '@pixi/utils';
import { createVector, Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import Astar from './Astar';
import { RandomEvenPos } from '../utils/RandomCol';
import Matter from 'matter-js';

export default class Zombie extends Entity {
  constructor(
    id: number,
    app: PIXI.Application,
    obstacles: Entity[],
    animations: Dict<PIXI.Texture<PIXI.Resource>[]>,
    physicsComposite: Matter.World
  ) {
    super(id, physicsComposite);
    this.app = app;
    this.physicsComposite = physicsComposite;

    this.animations = animations;
    this.sprite = new PIXI.AnimatedSprite(this.animations['idle_right']);
    this.sprite.loop = false;
    this.sprite.animationSpeed = 0.2;
    this.sprite.height = this.size.height;
    this.sprite.width = this.size.width;
    this.body.label = 'zombie';

    this.hitpoints = 100;

    app.stage.addChild(this.sprite!);
    this.windowHeight = app.screen.height;
    this.windowWidth = app.screen.width;

    const pos = RandomEvenPos(this.windowWidth, this.windowHeight, 32);
    Matter.Body.setPosition(this.body, Matter.Vector.create(pos.x, pos.y));

    this.lastx = this.position.x >= this.windowWidth * 0.5 ? -1 : 0;
    this.#pathFinder = new Astar(32, obstacles, app);
  }

  #pathFinder: Astar;

  app;
  physicsComposite;
  vel = new Vector(0);
  sprite: PIXI.AnimatedSprite;
  animations: Dict<PIXI.Texture<PIXI.Resource>[]>;
  windowHeight: number;
  windowWidth: number;
  hitpoints = 100;
  damage = 10;
  maxSpeed = 2;
  walking = false;
  nextPos = new Vector(0);
  count = 0;
  lastx: number;
  dead = false;
  attacking = false;

  update(dt: number, players: Player[]) {
    if (this.dead || players.length < 1) {
      if (!this.sprite.playing) {
        this.sprite.textures =
          this.animations['idle_' + (this.lastx < 0 ? 'left' : 'right')];
        this.sprite.play();
      }
      return;
    }
    const sorted = [...players].sort((a, b) => {
      return (
        createVector(a.body.position.x, a.body.position.y).magSq() -
        createVector(b.body.position.x, b.body.position.y).magSq()
      );
    });

    if ((Matter as any).Collision.collides(sorted[0].body, this.body)) {
      this.attacking = true;
      this.attack(sorted[0]);
    } else {
      this.attacking = false;
    }

    const newVec = this.#pathFinder.getPath(
      this.body.position,
      sorted[0].body.position
    );

    if (newVec.y < 0) {
      if (!this.sprite.playing) {
        this.sprite.textures =
          this.animations['run_' + (this.lastx < 0 ? 'left' : 'right')];
        this.sprite.play();
      }
    } else if (newVec.y > 0) {
      if (!this.sprite.playing) {
        this.sprite.textures =
          this.animations['run_' + (this.lastx < 0 ? 'left' : 'right')];
        this.sprite.play();
      }
    }
    if (newVec.x < 0) {
      this.lastx = newVec.x;
      if (!this.sprite.playing) {
        this.sprite.textures = this.animations['run_left'];
        this.sprite.play();
      }
    } else if (newVec.x > 0) {
      this.lastx = newVec.x;
      if (!this.sprite.playing) {
        this.sprite.textures = this.animations['run_right'];
        this.sprite.play();
      }
    }

    if (newVec.magSq() === 0) {
      if (!this.sprite.playing) {
        this.sprite.textures =
          this.animations['idle_' + (this.lastx < 0 ? 'left' : 'right')];
        this.sprite.play();
        //this.sprite.filters = [new PIXI.filters.BlurFilter()];
      }
    }

    this.vel.set(newVec.mult(dt));
    const force = Matter.Vector.create(this.vel.x, this.vel.y);
    Matter.Body.applyForce(this.body, this.body.position, force);
  }

  die() {
    Matter.World.remove(this.physicsComposite, this.body);
    this.app.stage.removeChild(this.sprite!);

    this.dead = true;
    this.sprite.textures = this.animations['die_left'];
    this.sprite.play();
    this.sprite.onComplete = () => {
      //ta bort zombien
      console.log('död');
    };
  }

  attack(player: Player) {
    if (!this.sprite.playing) {
      this.sprite.textures =
        this.animations['damage_' + (this.lastx < 0 ? 'left' : 'right')];
      this.sprite.play();
      this.sprite.onComplete = () => {
        if (this.attacking) {
          player.damage(this.damage);
          this.attacking = false;
        }
      };
    }
  }

  draw() {
    this.sprite.position.set(this.body.position.x, this.body.position.y);
  }
}
