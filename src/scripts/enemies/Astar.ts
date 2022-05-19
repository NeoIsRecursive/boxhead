import { Vector } from 'p5js-vector-standalone';
import Spot from './Spot';
import * as PIXI from 'pixi.js';

export default class Astar {
  constructor(res: number, app: PIXI.Application) {
    this.#res = res;
    this.#grid = this.#generateGrid(app.screen.width, app.screen.height);
    this.#path = new PIXI.Graphics();
    app.stage.addChild(this.#path);
  }
  #path: PIXI.Graphics;
  #grid: Spot[][];
  #res: number;

  #colFromPos = (x: number) => Math.floor(x / this.#res);

  getPath(zombie: Vector, goal: Vector) {
    const grid = [...this.#grid];
    let openSet: Spot[] = [];
    const closedSet: Spot[] = [];

    console.log(this.#colFromPos(zombie.x), this.#colFromPos(zombie.y));
    let start = grid[this.#colFromPos(zombie.x)][this.#colFromPos(zombie.y)];
    let end = grid[this.#colFromPos(goal.x)][this.#colFromPos(goal.y)];

    openSet.push(start);

    while (openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < openSet.length - 1; i++) {
        if (openSet[i].f <= openSet[winner].f) {
          winner = i;
        }
      }

      let current = openSet[winner];

      if (current == end) {
        console.log('end');
        let temp = current;
        const path = [current];
        while (temp.previos) {
          let xvel = temp.x - temp.previos.x;
          let yvel = temp.y - temp.previos.y;
          temp.vec.set(xvel, yvel);
          path.push(temp.previos);
          temp = temp.previos;
        }
        path.pop();
        this.#draw(path);
        return path.pop()!.vec;
      }
      openSet = openSet.filter((item) => item !== current);
      closedSet.push(current);
      current.neighbors.forEach((neighbor) => {
        if (!closedSet.includes(neighbor)) {
          const tempG = current.g + 1;
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          neighbor.h = Vector.dist(
            new Vector(neighbor.x, neighbor.y),
            new Vector(end.x, end.y)
          );
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previos = current;
        }
      });
    }
    return new Vector(0, 0);
  }

  #draw(spots: Spot[]) {
    spots = [...spots];
    this.#path.clear();
    const first = spots.shift();
    this.#path.lineStyle(5, 0x000000).moveTo(first!.x * 32, first!.y * 32);
    spots.forEach((spot) => {
      this.#path.lineTo(spot.x * 32, spot.y * 32);
    });
    this.#path.endFill();
  }

  #generateGrid(height: number, width: number) {
    const grid: Spot[][] = [];
    const cols = width / this.#res;
    const rows = height / this.#res;
    for (let x = 0; x < rows; x++) {
      grid.push([]);
      for (let y = 0; y < cols; y++) {
        grid[x].push(new Spot(x, y));
      }
    }

    grid.forEach((x) => x.forEach((g) => g.setNeighbors(grid)));

    return grid;
  }
}
