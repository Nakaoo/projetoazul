
import { React, useContext, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    redirect
} from 'react-router-dom'

// Hooks
import useAuth from "../hooks/useAuth";

// Layout da aplicação
import ContainerUser from "../components/Layout/ContainerUser";

// Páginas da aplicação 
import Dashboard from "../pages/User/Dashboard";
import SignIn from "../pages/Auth/SignIn";
import FormAtivacao from "../pages/Auth/Signup/Form/FormAtivacao";
import Signup from "../pages/Auth/Signup";
import RecoverPasswordForm from "../pages/Auth/SignIn/Form/RecoverPasswordForm";
import ResetPasswordForm from "../pages/Auth/SignIn/Form/ResetPasswordForm";
import Financeiro from "../pages/User/Financeiro";
import { UserContext } from "../hooks/UserContext"
import { useState } from "react"
import Community from "../pages/User/Community/index";
import OrderConfirmation from "../pages/User/ConfirmPayment/OrderConfirmation/OrderVerify";
import OrderPlaced from "../pages/User/ConfirmPayment/OrderPlaced/OrderPlacedVerify";

// Páginas de Admin
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminCompliance from "../pages/Admin/Compliance/AdminCompliance";
import ProtectedRoute from "./ProtectedRoutes";
import ContainerAdmin from "../components/Layout/ContainerAdmin";

const AppRoutes = () => {

    const logged = localStorage.getItem('tk-user')
    const role = localStorage.getItem('role')
    const [value, setValue] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<SignIn />}></Route>
                <Route path='/cadastro' element={<Signup />}></Route>
                <Route path='/' element={logged ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}></Route>
                <Route path='/activation/:token' element={<FormAtivacao />}></Route>
                <Route path='/recover-password' element={<RecoverPasswordForm />}></Route>
                <Route path='/reset-password/:token' element={<ResetPasswordForm />}></Route>

                <Route element={<ContainerUser />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/financeiro"
                        element={<Financeiro />}
                    />
                    <Route
                        path="/community"
                        element={<Community />}
                    />
                    <Route
                        path="/orderConfirmation"
                        element={<OrderConfirmation />}
                    />
                    <Route
                        path="/orderPlaced"
                        element={<OrderPlaced />}
                    />
                </Route>

                <Route element={<ContainerAdmin />}>
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/compliance"
                        element={<AdminCompliance />}
                    />
                </Route>
            </Routes>

        </BrowserRouter >
    )
}

export default AppRoutes;