import { createSlice } from '@reduxjs/toolkit';

export const initialState ={
  hideComponents: false
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    hideComponents: (state) => {
      state.hideComponents = true;
    },
    revealComponents: (state) => {
      state.hideComponents = false;
    }
  }
});

const {
  hideComponents,
  revealComponents
} = mapSlice.actions;

export const mapSelector = state => {

  return state.map;
};

export default mapSlice.reducer;

export function hideMapComponents() {

  return dispatch => {
    dispatch(hideComponents());
  };
}

export function revealMapComponents() {

  return dispatch => {
    dispatch(revealComponents());
  };
}