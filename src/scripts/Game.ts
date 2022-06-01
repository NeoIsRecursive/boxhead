import * as PIXI from 'pixi.js';
import Player from './player/Player';
import Wall from './entities/Wall';
import Zombie from './enemies/Zombie';
import Matter from 'matter-js';
import type GameMap from '../types/GameMap';
import Barrel from './entities/Barrel';
import Bullet from './weapons/Bullet';
import FlameThrower from './weapons/FlameThrower';

export default class Game {
  constructor(loader: PIXI.Loader, element: HTMLElement) {
    this.#app = new PIXI.Application({
      backgroundColor: 0x7f8076,
      width: this.#width,
      height: this.#height,
    });
    this.#app.screen.width = this.#width;
    this.#app.screen.height = this.#height;
    this.loader = loader;
    this.#element = element;
  }
  #element;
  loader: PIXI.Loader;
  physicsEngine = Matter.Engine.create();
  players: Player[] = [];
  weapons = [];
  bullets: Bullet[] = [];
  enemies: Zombie[] = [];
  walls: Wall[] = [];
  #width = 640;
  #height = 480;
  #app;
  gameOver = false;

  setup(map: GameMap) {
    this.#element.appendChild(this.#app.view);
    this.#createBounds();
    this.#createMap(map);
    this.players.push(
      new Player(
        1,
        this.#app,
        this.loader.resources['player'].spritesheet!.animations,
        this.physicsEngine.world,
        { up: 'w', down: 's', left: 'a', right: 'd', fire: 't' }
      )
    );
    this.players.push(
      new Player(
        2,
        this.#app,
        this.loader.resources['player'].spritesheet!.animations,
        this.physicsEngine.world,
        {
          up: 'ArrowUp',
          down: 'ArrowDown',
          left: 'ArrowLeft',
          right: 'ArrowRight',
          fire: 'l',
        }
      )
    );

    this.weapons.push(
      new FlameThrower(this.#app, this.players[0], this.physicsEngine)
    );

    for (let index = 0; index < 10; index++) {
      this.enemies.push(
        new Zombie(
          index,
          this.#app,
          this.walls,
          this.loader.resources['skeleton'].spritesheet!.animations,
          this.physicsEngine.world
        )
      );
    }

    this.#start();
  }

  #Loop(dt: number) {
    const entities = [...this.players, ...this.enemies];
    const alivePlayers = this.players.filter((x) => !x.dead);
    if (window.keys.get('e')) this.players[0].damage(1);

    for (const entity of entities) {
      entity.update(dt, alivePlayers);
    }

    this.weapons[0].fire(this.enemies);

    [...entities, ...this.walls, ...this.weapons].forEach((entity) => {
      entity.draw();
    });

    Matter.Engine.update(this.physicsEngine, dt);

    if (alivePlayers.length < 1) {
      this.#endGame();
    }
  }

  #endGame() {
    setTimeout(() => {
      this.#app.ticker.stop();
      this.gameOver = true;
    }, 3000);
  }

  #start() {
    this.#app.ticker.add((dt) => this.#Loop(dt));
  }

  #createBounds() {
    const top = Matter.Bodies.rectangle(this.#width / 2, -16, this.#width, 8, {
      isStatic: true,
    });

    const left = Matter.Bodies.rectangle(
      -16,
      this.#height / 2,
      8,
      this.#height,
      {
        isStatic: true,
      }
    );
    const right = Matter.Bodies.rectangle(
      this.#width,
      this.#height / 2,
      32,
      this.#height,
      {
        isStatic: true,
      }
    );
    const bottom = Matter.Bodies.rectangle(
      this.#width / 2,
      this.#height,
      this.#width,
      32,
      {
        isStatic: true,
      }
    );

    Matter.Composite.add(this.physicsEngine.world, top);
    Matter.Composite.add(this.physicsEngine.world, bottom);
    Matter.Composite.add(this.physicsEngine.world, right);
    Matter.Composite.add(this.physicsEngine.world, left);
  }

  #createMap(gameMap: GameMap) {
    const WALL = 'x';
    const BARREL = 'b';

    const mapArr = gameMap.map.map((row) => row.split(''));
    let count = 0;
    mapArr.forEach((row, y) =>
      row.forEach((col, x) => {
        if (col === WALL) {
          this.walls.push(
            new Wall(
              count++,
              this.#app,
              this.physicsEngine.world,
              PIXI.Sprite.from(this.loader.resources['wall'].texture!),
              x,
              y
            )
          );
        } else if (col === BARREL) {
          this.walls.push(
            new Barrel(
              count++,
              this.#app,
              this.physicsEngine.world,
              PIXI.Sprite.from(this.loader.resources['barrel'].texture!),
              x,
              y
            )
          );
        }
      })
    );
  }
}
