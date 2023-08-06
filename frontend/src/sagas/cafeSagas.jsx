// sagas/cafeSagas.js
import { put, takeEvery, call } from 'redux-saga/effects';
import { fetchCafesSuccess, fetchCafesFailure, updateCafeSuccess, deleteCafeSuccess } from '../reducers/cafeReducer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.BACKEND_API_PORT || 2000

function* fetchCafes() {
  try {
    const response = yield call(axios.get, `http://localhost:${PORT}/cafes/`);
    yield put(fetchCafesSuccess(response.data));
  } catch (error) {
    yield put(fetchCafesFailure(error.message));
  }
}

function* deleteCafeSaga(cafeData) {
  try {
    // Make an API call to delete the cafe
    const cafeId = cafeData.payload;
    const deletedCafe = yield call(axios.delete, `http://localhost:${PORT}/cafes/${cafeId}`);
    // Dispatch an cafeId to delete the cafe data in the store 
    yield put(deleteCafeSuccess(deletedCafe));
  } catch (error) {
    // If there's an error, dispatch an action to handle the failure
    console.log(error)
    // yield put(deleteCafeFailure(error.message));
  }
}

function* createOrUpdateCafeSaga(cafeData) {
  console.log(JSON.stringify(cafeData))
  const cafePayload = cafeData.payload;
  try {
    if (cafePayload.id) {
      const updatedCafe = yield call(axios.put, `http://localhost:${PORT}/cafes/${cafePayload.id}`, cafePayload);
      yield put(updateCafeSuccess(updatedCafe)); 
    } else {
      cafePayload.id = `C-${uuidv4()}`
      const createdCafe = yield call(axios.post, `http://localhost:${PORT}/cafes`, cafePayload);
      yield put(updateCafeSuccess(createdCafe))
    }
  } catch (error) {
    console.log(error)
  }
}

export function* watchCafeActions() {
  yield takeEvery('cafes/fetchCafes', fetchCafes);
}

export function* watchDeleteCafeActions() {
  yield takeEvery('DELETE_CAFE_REQUEST', deleteCafeSaga);
}

export function* watchCreateOrUpdateCafeActions() {
  yield takeEvery('CREATE_CAFE_REQUEST', createOrUpdateCafeSaga);
  yield takeEvery('UPDATE_CAFE_REQUEST', createOrUpdateCafeSaga);
}
