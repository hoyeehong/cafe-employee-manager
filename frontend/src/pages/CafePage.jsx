// src/pages/CafePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCafes } from '../reducers/cafeReducer';
import Cafes from '../components/Cafes';

const CafePage = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.data);

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  return (
    <div>
      <Cafes cafes={cafes} />
    </div>
  );
};

export default CafePage;
