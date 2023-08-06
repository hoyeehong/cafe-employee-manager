// pages/AddEditCafePage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createCafe, updateCafe } from '../actions/cafesActions';
import { fetchCafes } from '../reducers/cafeReducer';

function AddEditCafePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cafeToEdit = useSelector((state) => state.cafes.data.find((cafe) => cafe.id === id));
  
  const [cafeData, setCafeData] = useState({
    name: '',
    description: '',
    logo: '',
    location: '',
  });
  
  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  useEffect(() => {
    if (cafeToEdit) {
      setCafeData(cafeToEdit);
    }
  }, [cafeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCafeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cafeToEdit) {
      dispatch(updateCafe(cafeData));
    } else {
      dispatch(createCafe(cafeData));
    }
    navigate("/cafes")
    navigate(0)
  };

  const handleClick = () => {
    navigate("/cafes");
  };

  return (
    <div className="page">
      <h2>{cafeToEdit ? 'Edit Cafe' : 'Add New Cafe'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={cafeData.name} onChange={handleChange} />
        </label>
        <label>
          Description
          <input type="text" name="description" value={cafeData.description} onChange={handleChange} />
        </label>
        <label>
          Location 
          <input type="text" name="location" value={cafeData.location} onChange={handleChange} />
        </label>
        
        <button type="submit">{cafeToEdit ? 'Update' : 'Create'}</button>
        <button type="cancel" onClick={handleClick}>Cancel</button>
      </form>
    </div>
  );
}

export default AddEditCafePage;
