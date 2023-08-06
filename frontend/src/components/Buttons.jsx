import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Buttons(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(props.redirect);
      };
    return (
        <Button 
            className="add-button" 
            variant="contained"
            size="small" 
            onClick={handleClick}>
                {props.text}
        </Button>
    );
}