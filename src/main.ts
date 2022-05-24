import * as PIXI from 'pixi.js';
import Player, { newPlayer } from './scripts/player/Player';
import Wall from './scripts/entities/Wall';
import setUpKeys from './scripts/player/Controller';
import Zombie from './scripts/enemies/Zombie';
import Hitbox from './scripts/player/Hitbox';
import Collision from './scripts/utils/Collision';
import { RandomEvenPos } from './scripts/utils/RandomCol';

setUpKeys();

class Game {
  constructor() {
    PIXI.Loader.shared
      .add('player', './assets/player/player.json')
      .load(this.setup);
  }
  players: Player[] = [];
  enemies: Zombie[] = [];
  walls: Wall[] = [];

  #width = 640;
  #height = 480;
  #res = 32;

  app = new PIXI.Application({
    width: this.#width,
    height: this.#height,
    backgroundColor: 0xfafafa,
  });

  setup() {
    console.log(newPlayer(1, this.app));
    this.players = [newPlayer(1, this.app)];
    this.players[0].draw();

    for (let index = 0; index < 100; index++) {
      this.walls.push(new Wall(index, this.app));
    }

    for (let index = 0; index < 10; index++) {
      this.enemies.push(new Zombie(index, this.app, this.walls));
      const pos = RandomEvenPos(this.#width, this.#height, this.#res);
      this.enemies[index].position.set(pos.x, pos.y);
    }

    game.start();
  }

  #Loop(dt: number) {
    const entities = [...this.players, ...this.enemies];

    entities.forEach((entity) => {
      entity.update(dt, this.players);
    });

    [...entities, ...this.walls].forEach((entity) => {
      entity.draw();
    });
  }

  start() {
    this.app.ticker.add(this.#Loop);
  }
}

const game = new Game();

document.getElementById('app')!.appendChild(game.app.view);
