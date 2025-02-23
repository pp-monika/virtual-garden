import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const popUpHerb = () => {
    const  navigate = useNavigate();
    const location = useLocation(); 

    const goToHomePage = () => {
        navigate('/');
    }

    

}