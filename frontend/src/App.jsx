// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CafePage from './pages/CafePage';
import EmployeePage from './pages/EmployeePage';
import AddEditCafePage from './pages/AddEditCafePage';
import AddEditEmployeePage from './pages/AddEditEmployeePage';
import LabTabs from './components/LabTabs'

const App = () => {
  return (
    
      <div>
        <LabTabs />
        <Routes>
          <Route path="/" element={<CafePage/> } />
          <Route path="/cafes" element={<CafePage/>} />
          <Route path="/employees" element={<EmployeePage/>} errorElement={<p>Oops! /employees</p>}/>
          <Route path="/add-cafe" element={<AddEditCafePage />} errorElement={<p>Oops! /add-cafe</p>}/>
          <Route path="/add-employee" element={<AddEditEmployeePage />} errorElement={<p>Oops! /add-employee</p>}/>
          <Route path="/edit-cafe/:id" element={<AddEditCafePage />} errorElement={<p>Oops! /edit-cafe/:id</p>}/>
          <Route path="/edit-employee/:id" element={<AddEditEmployeePage />} errorElement={<p>Oops! /edit-employee/:id</p>}/>
          
          <Route path="/employees/:cafeName" element={<EmployeePage />} errorElement={<p>Oops! /employee/:cafeName</p>}/>
        </Routes>
      </div>
   
  );
};

export default App;
