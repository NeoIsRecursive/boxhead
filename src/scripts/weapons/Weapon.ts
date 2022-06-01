import * as PIXI from 'pixi.js';
import { Vector } from 'p5js-vector-standalone';
import Player from '../player/Player';
import { Graphics } from 'pixi.js';
import Bullet from './Bullet';
import Matter from 'matter-js';

export default class Weapon {
  constructor(
    App: PIXI.Application,
    Player: Player,
    PhysicsEngine: Matter.Engine
  ) {
    this.app = App;
    this.player = Player;
    this.physicsEngine = PhysicsEngine;

    this.speed = 5;
  }
  app;
  player;
  physicsEngine: Matter.Engine;
  bullet: Bullet;
  bullets: Bullet[] = [];
  speed;
  hasFired;
}
