
import { React, useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

// Páginas da aplicação 
import SignIn from "../pages/Auth/SignIn";
import Signup from "../pages/Auth/Signup";
import FormAtivacao from "../pages/Auth/Signup/Form/FormAtivacao";
import RecoverPasswordForm from "../pages/Auth/SignIn/Form/RecoverPasswordForm";
import ResetPasswordForm from "../pages/Auth/SignIn/Form/ResetPasswordForm";

const AuthRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path={'/login'} element={<SignIn />}></Route>
                    <Route path='/cadastro' element={<Signup />}></Route>
                    <Route path='/activation/:token' element={<FormAtivacao />}></Route>
                    <Route path='/recover-password' element={<RecoverPasswordForm />}></Route>
                    <Route path='/reset-password/:token' element={<ResetPasswordForm />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AuthRoutes;