import { createSlice } from '@reduxjs/toolkit';

export const initialState ={
  position: {}
};

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setPosition: (state, currentPosition) => {
      state.position = currentPosition;
    }
  }
});

const {
  setPosition
} = positionSlice.actions;

export const positionSelector = state => {

  return state.position;
};

export default positionSlice.reducer;

export function setCurrentPosition(position) {

  return dispatch => {
    dispatch(setPosition(position));
  };
}
