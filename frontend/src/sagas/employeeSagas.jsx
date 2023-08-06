// sagas/employeeSagas.js
import { put, takeEvery, call } from 'redux-saga/effects';
import { fetchEmployeesSuccess, fetchEmployeesFailure, updateEmployeeSuccess, deleteEmployeeSuccess } from '../reducers/employeeReducer';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.BACKEND_API_PORT || 2000

function* fetchEmployees() {
  try {
    const response = yield call(axios.get, `http://localhost:${PORT}/employees`);
    yield put(fetchEmployeesSuccess(response.data));
  } catch (error) {
    yield put(fetchEmployeesFailure(error.message));
  }
}

function* fetchFilteredEmployees(cafeName) {
  try {
    const response = yield call(axios.get, `http://localhost:${PORT}/employees?cafe_name=${cafeName.payload}`);
    yield put(fetchEmployeesSuccess(response.data));
  } catch (error) {
    yield put(fetchEmployeesFailure(error.message));
  }
}

function* createOrUpdateEmployeeSaga(employeeData) {
  const employeePayload = employeeData.payload;
  try {
    if (employeePayload.id) {
      const updatedEmployee = yield call(axios.put, `http://localhost:${PORT}/employees/${employeePayload.id}`, employeePayload);
      yield put(updateEmployeeSuccess(updatedEmployee)); 
    } else 
    {
      employeePayload.id = `E-${uuidv4()}`
      const createdEmployee = yield call(axios.post, `http://localhost:${PORT}/employees`, employeePayload);
      yield put(updateEmployeeSuccess(createdEmployee))
    }
  } catch (error) {
    console.log(error)
  }
}

function* deleteEmployeeSaga(employeeData) {
  try {
    // Make an API call to delete the employee
    const employeeId = employeeData.payload;
    const deletedEmployee = yield call(axios.delete, `http://localhost:${PORT}/employees/${employeeId}`);
    // Dispatch an employeeId to delete the employee data in the store 
    yield put(deleteEmployeeSuccess(deletedEmployee));
  } catch (error) {
    // If there's an error, dispatch an action to handle the failure
    console.log(error)
    // yield put(deleteEmployeeFailure(error.message));
  }
}

export function* watchEmployeeActions() {
  yield takeEvery('employees/fetchEmployees', fetchEmployees);
}

export function* watchCreateOrUpdateEmployeeActions() {
  yield takeEvery('CREATE_EMPLOYEE_REQUEST', createOrUpdateEmployeeSaga);
  yield takeEvery('UPDATE_EMPLOYEE_REQUEST', createOrUpdateEmployeeSaga);
}

export function* watchFilteredEmployeeActions() {
  yield takeEvery('FETCH_FILTERED_EMPLOYEES_REQUEST', fetchFilteredEmployees);
}

export function* watchDeleteEmployeeActions() {
  yield takeEvery('DELETE_EMPLOYEE_REQUEST', deleteEmployeeSaga);
}
