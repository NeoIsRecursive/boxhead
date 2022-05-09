import Entity from '../entities/Entity';

function Collision(a: Entity, b: Entity): boolean {
  let aHitBox = a.sprite.getBounds();
  let bHitBox = b.sprite.getBounds();

  return aHitBox.x + aHitBox.width > bHitBox.x;
}

export default Collision;
