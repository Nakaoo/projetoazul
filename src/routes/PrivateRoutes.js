import React , {useEffect} from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const user = localStorage.getItem('tk-user')
    const role = localStorage.getItem('tk-user')
    const navigate = useNavigate();
    let location = useLocation();

    if (!user && role != 'admin') {
        return null;
    }else{
        return children;
    }

};

export default PrivateRoutes;