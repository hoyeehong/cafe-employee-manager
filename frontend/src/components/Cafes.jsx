// src/components/Cafes.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteCafe } from '../actions/cafesActions';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchCafes } from '../reducers/cafeReducer';
import { useDispatch } from 'react-redux';
import Buttons from './Buttons';

const Cafes = ({ cafes }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this cafe?')) {
      dispatch(deleteCafe(id));
      window.location.reload()
    }
  };
  
  const onCellClicked = (event) => {
    // Check if the clicked column is the one you want to trigger the navigation
    if (event.colDef.field === 'employees') {
      // Get the clicked cafe name from the row data
      const cafeName = event.data.name;
      <Link to={`/employees`} state={{ cafeName: cafeName }} />
    }
  };

  const columnDefs = [
    { headerName: 'Name', field: 'name', width: 100 },
    { headerName: 'Description', field: 'description', width: 230 },
    { headerName: 'Employees', field: 'employees', width: 150,
      cellRenderer: ({ data }) => (
        <div>
          <Link to={`/employees`} state={ {cafeName:data.name} }> {data.employees} </Link>
        </div>
      ),
    }, 
    { headerName: 'Location', field: 'location' },
    {
      headerName: 'Actions',
      field: 'id',
      width: 120,
      cellRenderer: ({ data }) => (
        <div>
          <Link to={`/edit-cafe/${data.id}`}>Edit</Link>  
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
      <h1>Cafes</h1>
      <Buttons redirect={"/add-cafe"} text={"Add New Cafe"}/>
      
      <div className="ag-theme-alpine" style={{ height: 500, width: 1300 }}>
        <AgGridReact
          rowData={cafes}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellClicked={onCellClicked}
        />
      </div>
    </div>
  );
};

export default Cafes;
