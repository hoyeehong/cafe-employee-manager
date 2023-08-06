// actions/employeesActions.js
import api from '../services/api';

// Action Creators
export const createEmployee = (employeeData) => ({
  type: 'CREATE_EMPLOYEE_REQUEST',
  payload: employeeData,
});

export const fetchFilteredEmployees = (cafeData) => ({
  type: 'FETCH_FILTERED_EMPLOYEES_REQUEST',
  payload: cafeData,
});


export const fetchEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });

    const response = await api.get('/employees');
    const employees = response.data;

    dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: employees });
  } catch (error) {
    dispatch({ type: 'FETCH_EMPLOYEES_FAILURE', payload: error.message });
  }
};

export const updateEmployee = (employeeData) => ({
  type: 'UPDATE_EMPLOYEE_REQUEST',
  payload: employeeData,
});

export const deleteEmployee = (employeeId) => ({
  type: 'DELETE_EMPLOYEE_REQUEST',
  payload: employeeId,
});