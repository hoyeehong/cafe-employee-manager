// actions/cafesActions.js
import api from '../services/api';

// Action Creators
export const createCafe = (cafeData) => ({
  type: 'CREATE_CAFE_REQUEST',
  payload: cafeData,
});

export const fetchCafes = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CAFES_REQUEST' });
    const response = await api.get('/cafes');
    const cafes = response.data;
    dispatch({ type: 'FETCH_CAFES_SUCCESS', payload: cafes });

  } catch (error) {
    dispatch({ type: 'FETCH_CAFES_FAILURE', payload: error.message });
  }
};

export const updateCafe = (cafeData) => ({
  type: 'UPDATE_CAFE_REQUEST',
  payload: cafeData,
});

export const deleteCafe = (cafeId) => ({
  type: 'DELETE_CAFE_REQUEST',
  payload: cafeId,
});

