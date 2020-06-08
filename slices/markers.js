import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  markers: []
};

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    setMarkers: (state, markers) => {
      state.markers = markers;
    },
    resetMarkers: (state) => {
      state.markers =[];
    }
  }
});

const {
  setMarkers,
  resetMarkers
} = markersSlice.actions;

export const markersSelector = state => {
  return state.markers;
};

export default markersSlice.reducer;

export function setGlobalMarkers(activities) {

  if (activities === null) {
    return dispatch => {
      dispatch(resetMarkers());
    };

  }

  let markers=[];

  if (activities) {
    activities.map(activity => {

      if (activity.lon && activity.lat) {

        const mark = {
          identifier: activity.uid,
          latlng: {latitude: parseFloat(activity.lat), longitude: parseFloat(activity.lon)},
          title: activity.item,
          description: activity.details.overview
        };

        if (!markers.includes(mark)) {
          markers.push(mark);
        }

      }
    });
  }

  return dispatch => {
    dispatch(setMarkers(markers));
  };

}

export function resetGlobalMarkers() {

  return dispatch => {
    dispatch(resetMarkers());
  };

}
