// src/pages/EmployeePage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchEmployees } from '../reducers/employeeReducer';
import Employees from '../components/Employees';
import { fetchFilteredEmployees } from '../actions/employeesActions';

const EmployeePage = () => {
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.employees.data);
  const [cafeState, setCafeState] = useState(false)
  let { state } = useLocation();
 
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (state !== null){
      setCafeState(true)
    }
  }, [state]);

  useEffect(() => {
    if (cafeState === true){
      dispatch(fetchFilteredEmployees(state.cafeName))
      setCafeState(false)
    }
  }, [dispatch, cafeState, state]);

  return (
    <div>
      <Employees employees={employees} cafeName={ state ? state.cafeName : null }/>
    </div>
  );
};

export default EmployeePage;
