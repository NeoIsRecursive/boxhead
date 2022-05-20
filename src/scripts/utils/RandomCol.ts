import { Vector } from 'p5js-vector-standalone';

const RandomEvenPos = (width: number, height: number, res: number) => {
  return {
    x: Math.floor(Math.floor(Math.random() * width) / res) * res,
    y: Math.floor(Math.floor(Math.random() * height) / res) * res,
  };
};

const EvenPos = (vec: Vector, res: number) => {
  return {
    x: Math.floor(Math.floor(vec.x / res)) * res,
    y: Math.floor(Math.floor(vec.x / res)) * res,
  };
};

export { RandomEvenPos, EvenPos };
