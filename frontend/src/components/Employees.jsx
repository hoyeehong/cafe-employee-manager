// src/components/Employees.js
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteEmployee } from '../actions/employeesActions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useDispatch } from 'react-redux';
import Buttons from './Buttons';

const Employees = ({ employees, cafeName="" }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log(`id: ${id}`)
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
      window.location.reload()
    }
  };

  const columnDefs = [
    { headerName: 'Employee ID', field: 'id', width: 150 },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email Address', field: 'email_address' },
    { headerName: 'Phone Number', field: 'phone_number' },
    { headerName: 'Cafe Name', field: 'cafe_name' },
    {
      headerName: 'Actions',
      field: 'id',
      width: 120,
      cellRenderer: ({ data }) => (
        <div>
          <Link to={`/edit-employee/${data.id}`}>Edit</Link>
          <button onClick={() => handleDelete(data.id) }>Delete</button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  return (
    <div className="page">
      <h1>Employees {cafeName && (`under `+cafeName)}</h1> 
      
      <Buttons redirect={"/add-employee"} text={"Add New Employee"}/>
      <div className="ag-theme-alpine" style={{ height: 500, width: 1300 }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default Employees;
