import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  hasError: false,
  error: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, error) => {
      state.hasError = !!error;
      state.error = error;
    },
    resetError: (state) => {
      state.hasError = false;
      state.error = null;
    }
  }
});

const {
  setError,
  resetError
} = errorSlice.actions;

export const errorSelector = state => state.error;
export default errorSlice.reducer;

export function setSnackBarError(error) {
  return dispatch => {
    dispatch(setError(error));
  };
}

export function closeSnackBarError() {
  return dispatch => {
    dispatch(resetError());
  };
}
