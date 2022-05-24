import { Vector } from 'p5js-vector-standalone';
import Spot from './Spot';
import * as PIXI from 'pixi.js';
import Entity from '../entities/Entity';

export default class Astar {
  constructor(res: number, obstacles: Entity[], app: PIXI.Application) {
    this.#res = res;
    this.#grid = this.#generateGrid(
      obstacles,
      app.screen.width,
      app.screen.height
    );
    this.#path = new PIXI.Graphics();
    app.stage.addChild(this.#path);
  }
  #path: PIXI.Graphics;
  #grid: Spot[][];
  #res: number;
  #emptyVec = new Vector(0);

  #colFromPos = (x: number) => Math.floor(x / this.#res);

  getPath(zombie: Vector, goal: Vector) {
    const grid = [...this.#grid];
    let openSet: Spot[] = [];
    const closedSet: Spot[] = [];
    let start = grid[this.#colFromPos(zombie.x)][this.#colFromPos(zombie.y)];
    let end = grid[this.#colFromPos(goal.x)][this.#colFromPos(goal.y)];

    if (start === end) {
      return this.#emptyVec;
    }
    openSet.push(start);

    while (openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < openSet.length - 1; i++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }

      let current = openSet[winner];

      if (current === end) {
        let temp = current;
        const path = [current];
        let count = 0;
        while (temp.previos) {
          let xvel = temp.x - temp.previos.x;
          let yvel = temp.y - temp.previos.y;
          temp.vec.set(xvel, yvel);
          path.push(temp.previos);
          if (temp.previos.previos === temp || temp.previos === temp) {
            temp.previos = undefined;
          } else {
            temp = temp.previos;
            if (count++ > 30) {
              console.log('what');
              break;
            }
          }
        }
        //this.#draw(path);
        return path[path.length - 2].vec;
      }
      openSet = openSet.filter((item) => item !== current);
      closedSet.push(current);
      current.neighbors.forEach((neighbor) => {
        if (!closedSet.includes(neighbor) && neighbor.walkable) {
          const tempG = current.g + 1;
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          /*           neighbor.h = Vector.dist(
            new Vector(neighbor.x, neighbor.y),
            new Vector(end.x, end.y)
          ); */
          neighbor.h =
            Math.abs(end.x - neighbor.x) + Math.abs(end.y - neighbor.y);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previos = current;
        }
      });
    }
    return this.#emptyVec;
  }

  #draw(spots: Spot[]) {
    spots = [...spots];
    this.#path.clear();
    const first = spots.shift();
    this.#path
      .lineStyle(5, 0x000000)
      .moveTo(first!.x * 32 + 16, first!.y * 32 + 16);
    spots.forEach((spot) => {
      this.#path.lineTo(spot.x * 32 + 16, spot.y * 32 + 16);
    });
    this.#path.endFill();
  }

  #generateGrid(obstacles: Entity[], height: number, width: number) {
    const grid: Spot[][] = [];
    const cols = width / this.#res;
    const rows = height / this.#res;
    for (let x = 0; x < rows; x++) {
      grid.push([]);
      for (let y = 0; y < cols; y++) {
        grid[x].push(new Spot(x, y));
      }
    }

    obstacles.forEach((wall) => {
      grid[this.#colFromPos(wall.position.x)][
        this.#colFromPos(wall.position.y)
      ].walkable = false;
    });

    grid.forEach((x) => x.forEach((g) => g.setNeighbors(grid)));
    return grid;
  }
}
