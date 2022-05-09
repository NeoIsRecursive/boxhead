class Vec {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(x: number = 0, y: number = 0) {
    this.x += x;
    this.y += y;
  }
}

export default Vec;
