import { combineReducers } from 'redux';

import errorReducer from './error';
import loadingReducer from './loading';
import mapReducer from './map';
import positionReducer from './position';
import markersReducer from './markers';

const rootReducer = combineReducers({
  error: errorReducer,
  loading: loadingReducer,
  map: mapReducer,
  position: positionReducer,
  markers: markersReducer
});

export default rootReducer;
