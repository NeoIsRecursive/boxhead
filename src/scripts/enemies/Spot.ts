import { Vector } from 'p5js-vector-standalone';

export default class Spot {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  x: number;
  y: number;
  vec: Vector = new Vector(0);
  f = 0;
  g = 0;
  h = 0;
  previos?: Spot;
  neighbors: Spot[] = [];

  setNeighbors(grid: Spot[][]) {
    if (this.x > 0) this.neighbors.push(grid[this.x - 1][this.y]);
    if (this.x + 1 < grid.length) this.neighbors.push(grid[this.x + 1][this.y]);
    if (this.y > 0) this.neighbors.push(grid[this.x][this.y - 1]);
    if (this.y + 1 < grid[0].length)
      this.neighbors.push(grid[this.x][this.y + 1]);
  }
}
