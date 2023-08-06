// pages/AddEditEmployeePage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createEmployee, updateEmployee } from '../actions/employeesActions';

function AddEditEmployeePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeeToEdit = useSelector((state) => state.employees.data.find((employee) => employee.id === id));
  // const cafes = useSelector((state) => state.cafes.data);
  
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email_address: '',
    phone_number: '',
    gender: '',
    cafe_name: '',
    start_date: ''
  });

  useEffect(() => {
    if (employeeToEdit) {
      setEmployeeData(employeeToEdit);
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeToEdit) {
      dispatch(updateEmployee(employeeData));
    } else {
      dispatch(createEmployee(employeeData));
    }
    navigate('/employees');
    navigate(0)
  };

  return (
    <div className="page">
      <h2>{employeeToEdit ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={employeeData.name} onChange={handleChange} />
        </label>
        <label>
          Email Address
          <input type="email" name="email_address" value={employeeData.email_address} onChange={handleChange} />
        </label>
        <label>
          Phone Number 
          <input type="tel" name="phone_number" pattern="[8-9][0-9]{7}" value={employeeData.phone_number} onChange={handleChange} />
        </label>
        <label>
          <input type="radio" name="gender" value="Male" checked={employeeData.gender === "Male"} onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" checked={employeeData.gender === "Female"} onChange={handleChange} />
          Female
        </label>
        <label>
           Start Date
          <input type="date" name="start_date" value={employeeData.start_date} onChange={handleChange} />
        </label>
        <label></label>

        <button type="submit">{employeeToEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default AddEditEmployeePage;
