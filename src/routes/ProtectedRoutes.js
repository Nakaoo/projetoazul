import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const user = localStorage.getItem('tk-user')
    let location = useLocation();

    if(!user) {
        return 
    }
 return children

};

export default ProtectedRoute;