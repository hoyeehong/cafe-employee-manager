// reducers/cafeReducer.js
import { createSlice } from '@reduxjs/toolkit';

const cafeSlice = createSlice({
  name: 'cafes',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    fetchCafes: () => {},
    fetchCafesSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCafesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCafeSuccess: (state, action) => {
      const updatedCafe = action.payload;
      // Find the index of the cafe to be updated in the state
      const updatedIndex = state.cafes.data.findIndex((cafe) => cafe.id === updatedCafe.id);

      if (updatedIndex !== -1) {
        // If the cafe exists in the state, update it
        const updatedCafes = [...state.cafes];
        updatedCafes[updatedIndex] = updatedCafe;

        // Return the updated state with the new cafe data
        return {
          ...state,
          cafes: updatedCafes,
        };
      }
      return state;
    },
    deleteCafeSuccess: (state, action) => {
      // const cafeId = action.payload;
      // state.data = state.data.filter((cafe) => cafe.id !== cafeId);
      const deletedCafeIndex = state.data.findIndex((cafe) => cafe.id === action.payload);

      // If the cafe is found in the state data array, remove it from the array
      if (deletedCafeIndex !== -1) {
        state.data.splice(deletedCafeIndex, 1);
      }

      state.loading = false;
      state.error = null;
    },
  },
});

export const { fetchCafes, fetchCafesSuccess, fetchCafesFailure, updateCafeSuccess, deleteCafeSuccess } = cafeSlice.actions;
export const cafeReducer = cafeSlice.reducer;
