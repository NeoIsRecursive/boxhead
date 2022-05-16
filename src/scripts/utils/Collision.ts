import { Graphics } from 'pixi.js';
import Entity from '../entities/Entity';
import Hitbox from '../player/Hitbox';

function Collision(a: Hitbox, b: Entity): boolean {
  let aHitBox = a.hitbox;
  let bHitBox = b.sprite.getBounds();
  return (
    aHitBox.x + aHitBox.width > bHitBox.x &&
    aHitBox.x < bHitBox.x + bHitBox.width &&
    aHitBox.y + aHitBox.height > bHitBox.y &&
    aHitBox.y < bHitBox.y + bHitBox.height
  );
}

export default Collision;
