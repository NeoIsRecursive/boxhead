import Entity from '../entities/Entity';

function Collision(collidingEntity: Entity, entity: Entity): boolean {
  const collider = { ...collidingEntity.position, ...collidingEntity.size };
  const obstacle = { ...entity.position, ...entity.size };
  return (
    collider.x + collider.width > obstacle.x &&
    collider.x < obstacle.x + obstacle.width &&
    collider.y + collider.height > obstacle.y &&
    collider.y < obstacle.y + obstacle.height
  );
}

export default Collision;
