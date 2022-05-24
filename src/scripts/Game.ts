import * as PIXI from 'pixi.js';
import Player, { newPlayer } from './player/Player';
import Wall from './entities/Wall';
import Zombie from './enemies/Zombie';
import { RandomEvenPos } from './utils/RandomCol';

export default class Game {
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

    this.#start();
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

  #start() {
    this.app.ticker.add(this.#Loop);
  }
}
