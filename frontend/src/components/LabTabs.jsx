import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from 'react-router-dom';

export default function LabTabs() {
  const [value, setValue] = useState("cafes");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} >
            <Tab label="Cafes" value="cafes" component={Link} to={"/cafes"}/>
            <Tab label="Employees" value='employees' component={Link} to={"/employees"} />
          </TabList>
        </Box>
        <TabPanel value="Cafes" >Cafes</TabPanel>
        <TabPanel value="Employees" >Employees</TabPanel>
      </TabContext>
    </Box>
  );
}