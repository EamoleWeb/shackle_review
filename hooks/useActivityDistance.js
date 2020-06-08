import { useSelector } from 'react-redux';
import { positionSelector } from '../slices/position';
import getActivityDistance from '../utils/getActivityDistance';

export default (coordinates, units) => {

  const {
    position
  } = useSelector(positionSelector);

  const distance = getActivityDistance(position, coordinates, units);

  return distance;
};
