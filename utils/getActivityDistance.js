// TODO: use the signature below
// const getActivityDistance = (activity = {}, currentPosition) => {
import { getDistance } from 'geolib';

const getActivityDistance = (position, coordinates, units) => {

  const lat = coordinates.latitude;
  const lon = coordinates.longitude;

  let distance ='N/A';

  if (lat && lon && position.payload) {
    distance =getDistance({ latitude: position.payload.coords.latitude, longitude: position.payload.coords.longitude },
      { latitude: lat, longitude: lon });
  }

  switch (units) {
    case 'miles':
      distance = distance*0.00062137;
      distance = distance.toFixed(2);
      break;

    default:
      break;
  }

  return distance;
};

export default getActivityDistance;