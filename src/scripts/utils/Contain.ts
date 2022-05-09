import Bounds from '../../types/Bounds';
import Entity from '../entities/Entity';

const Contain = (entity: Entity, bounds: Bounds) => {
  const collissions = {
    right: false,
    left: false,
    top: false,
    bottom: false,
  };
  if (entity.position.x < bounds.left) collissions.left = true;
  if (entity.position.x > bounds.right - entity.size.width)
    collissions.right = true;
  if (entity.position.y < bounds.top) collissions.top = true;
  if (entity.position.y > bounds.bottom - entity.size.height)
    collissions.bottom = true;
  return collissions;
};

export default Contain;
