// reducers/employeeReducer.js
import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    fetchEmployees: () => {},
    fetchEmployeesSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEmployeeSuccess: (state, action) => {
      const updatedEmployee = action.payload;
      // Find the index of the employee to be updated in the state
      const updatedIndex = state.employees.data.findIndex((employee) => employee.id === updatedEmployee.id);
      if (updatedIndex !== -1) {
        // If the employee exists in the state, update it
        const updatedEmployees = [...state.employees];
        updatedEmployees[updatedIndex] = updatedEmployee;

        // Return the updated state with the new employee data
        return {
          ...state,
          cafes: updatedEmployees,
        };
      }
      return state;
    },
    deleteEmployeeSuccess: (state, action) => {
      const deletedEmployeeIndex = state.data.findIndex((employee) => employee.id === action.payload);

      // If the employee is found in the state data array, remove it from the array
      if (deletedEmployeeIndex !== -1) {
        state.data.splice(deletedEmployeeIndex, 1);
      }
      state.loading = false;
      state.error = null;
      // const employeeId = action.payload;
      // state.data = state.data.filter((employee) => employee.id !== employeeId);
    },
  },
});

export const { fetchEmployees, fetchEmployeesSuccess, fetchEmployeesFailure, updateEmployeeSuccess, deleteEmployeeSuccess } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
