import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('tk-user')
    const navigate = useNavigate();
    let location = useLocation();

    if (!user) {
        return null;
    }else{
        return children;
    }

};

export default ProtectedRoute;