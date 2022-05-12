import Entity from '../entities/Entity';

function Collision(a: Entity, b: Entity): boolean {
  let aHitBox = a.sprite.getBounds();
  let bHitBox = b.sprite.getBounds();

  //Collision works but only for x and y of b entity
  //Will fix later!!!
  return (
    aHitBox.x + aHitBox.width > bHitBox.x &&
    aHitBox.x < bHitBox.x &&
    aHitBox.y + aHitBox.height > bHitBox.y &&
    aHitBox.y < bHitBox.y
  );
}

export default Collision;
