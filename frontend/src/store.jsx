// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { cafeReducer } from './reducers/cafeReducer';
import { employeeReducer } from './reducers/employeeReducer';
import { watchCafeActions, watchCreateOrUpdateCafeActions, watchDeleteCafeActions } from './sagas/cafeSagas';
import { watchEmployeeActions, watchFilteredEmployeeActions, watchCreateOrUpdateEmployeeActions, watchDeleteEmployeeActions } from './sagas/employeeSagas';

function* rootSaga() {
  yield all([
    watchCafeActions(),
    watchDeleteCafeActions(),
    watchEmployeeActions(),
    watchCreateOrUpdateCafeActions(),
    watchFilteredEmployeeActions(),
    watchCreateOrUpdateEmployeeActions(),
    watchDeleteEmployeeActions()
  ]); 
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cafes: cafeReducer,
    employees: employeeReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
