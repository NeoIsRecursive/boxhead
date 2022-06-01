import * as PIXI from 'pixi.js';
import Player from './player/Player';
import Wall from './entities/Wall';
import Zombie from './enemies/Zombie';
import Matter from 'matter-js';
import type GameMap from '../types/GameMap';
import Barrel from './entities/Barrel';
import Weapon from './weapons/Weapon';
import Bullet from './weapons/Bullet';

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
  weapons: Weapon[] = [];
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
        { up: 'w', down: 's', left: 'a', right: 'd' }
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
        }
      )
    );

    this.weapons.push(new Weapon(this.#app, this.players[0]));

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

    this.bullets = this.weapons[0].fire(dt);

    for (let j = 0; j < this.bullets.length; j++) {
      for (let i = 0; i < this.enemies.length; i++) {
        if (
          (Matter as any).Collision.collides(
            this.bullets[j].body,
            this.enemies[i].body
          )
        ) {
          this.enemies[i].hitpoints -= this.bullets[j].damage;
          this.bullets[j].lifetime = 0;

          //We should probably use a linked list instead of an array when suddenly pulling stuff out but uwww maybe some other day!
          if (this.enemies[i].hitpoints <= 0) {
            this.enemies[i].die();
            this.enemies.splice(i, 1);
          }
        }
      }

      this.bullets[j].lifetime -= 1;
      if (this.bullets[j].lifetime <= 0) {
        this.bullets[j].damage = 0;
        Matter.World.remove(this.physicsEngine.world, this.bullets[j].body);
        this.#app.stage.removeChild(this.bullets[j].sprite!);
        this.bullets.splice(j, 1);
      }
    }

    [...entities, ...this.walls].forEach((entity) => {
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
