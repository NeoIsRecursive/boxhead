import { Vector } from 'p5js-vector-standalone';
import Entity from '../entities/Entity';

class FlowField {
  constructor(height: number, width: number, res: number) {
    this.#grid = this.#generateGrid(height, width, res);
  }
  #grid: Vector[][];

  #generateGrid(height: number, width: number, res: number) {
    const grid: Vector[][] = [];
    const cols = width / res;
    const rows = height / res;
    // console.log(grid);
    for (let x = 0; x < rows; x++) {
      grid.push([]);
      for (let y = 0; y < cols; y++) {
        grid[x].push(new Vector(0));
      }
    }

    return grid;
  }

  getGrid() {
    return this.#grid;
  }

  update(entities: Entity[]) {}
}

export default FlowField;
