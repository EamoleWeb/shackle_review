import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    resetLoading: (state) => {
      state.loading = false;
    }
  }

});

const {
  setLoading,
  resetLoading
} = loadingSlice.actions;

export const loadingSelector = state => {
  state.loading;

  return state.loading;

};

export default loadingSlice.reducer;

export function setLoadingScreen() {

  return dispatch => {
    dispatch(setLoading());
  };
}

export function finshedLoading() {

  return dispatch => {
    dispatch(resetLoading());
  };
}