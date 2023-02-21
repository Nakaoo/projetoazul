
import { React } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

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
import Community from "../pages/User/Community/index";
import OrderConfirmation from "../pages/User/ConfirmPayment/OrderConfirmation/OrderVerify";
import OrderPlaced from "../pages/User/ConfirmPayment/OrderPlaced/OrderPlacedVerify";

// Páginas de Admin
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminCompliance from "../pages/Admin/Compliance/AdminCompliance";
import AdminFinance from "../pages/Admin/Finance/AdminFinance";
import AdminProduto from "../pages/Admin/Produto/AdminProduto";
import ContainerAdmin from "../components/Layout/ContainerAdmin";
import Withdraw from "../pages/User/Withdraw";

const AppRoutes = () => {

    const logged = localStorage.getItem('tk-user')

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
                    <Route
                        path="/withdraw"
                        element={<Withdraw />}
                    />
                </Route>

                <Route element={<ContainerAdmin />}>
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route
                        path="/admin/finance"
                        element={<AdminFinance />}
                    />
                    <Route
                        path="/admin/compliance"
                        element={<AdminCompliance />}
                    />
                    <Route
                        path="/admin/produto"
                        element={<AdminProduto />}
                    />
                </Route>
            </Routes>

        </BrowserRouter >
    )
}

export default AppRoutes;