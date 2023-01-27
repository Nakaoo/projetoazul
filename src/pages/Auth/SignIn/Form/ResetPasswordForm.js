import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { AiOutlineLock } from 'react-icons/ai'
import { useForm, Controller } from "react-hook-form";

import '../styles.css'
import logo_principal from '../../../../assets/img/logo_myhart.png'
import { resetPassword } from '../../Signup/utils/apiFunctions'
import { LoadingOutlined } from "@ant-design/icons";
import { NumericFormat } from 'react-number-format';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { Spin } from 'antd';
import { globalImg } from '../../../../utils/globalImg';
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 90,
        }}
        spin
    />
);

const ResetPasswordForm = () => {
    const logoImg = globalImg.logo
    let navigate = useNavigate();
    const [visibleError, setVisibleError] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const { token } = useParams();
    const location = useLocation();

    function redirect() {
        setTimeout(() => {
            navigate('/login')
        }, 5200);
    }

    const onKeyDownEnter = e => {
        if (e.key === "Enter") {
            document.getElementById("proximo").click();
        }
    }

    const onKeyDownConfirmPassword = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("confirm").focus();
        }
    }

    async function handleResetPassword() {
        try {
            if (formData.password != formData.confirmPassword) {
                setVisibleError(true)
                setErrMessage("Senha e confirmação de senha diferentes")
                return 0;
            }

            if (formData.password.length != 6) {
                setVisibleError(true)
                setErrMessage("A senha deve conter seis digitos")
                return 0;
            }

            const data = {
                password: formData.password
            }

            setLoading(true)
            let recover = await resetPassword(token, data)

            setStep(1)
            setVisibleError(false)
            setErrMessage('')
            redirect()
        } catch (err) {
            setVisibleError(true)
            setErrMessage("Token invalido")
            setLoading(false)
        }
    }

    return (
        <div className="__signin_container">
            <div className="__signin_content">
                <div className="__signin_padding">
                    <div className="__signin_header">
                        <img src={logoImg} alt="Logo principal ESGTECH" width="350px" />
                    </div>
                    <div className="__signin_content_form">
                        {step == 0 && (
                            <form onSubmit={e => { e.preventDefault(); }}>
                                <div className="form_group_signin">
                                    <div className="__signin_content_title">
                                        <span>Recuperação de Senha</span>
                                        <span className='__signin_content_subtitle_explanation'>Digite uma nova senha para a sua conta</span>
                                    </div>

                                    <div className="form_group_signin">
                                        <label for="email">Senha</label>
                                        <div className="form_group_input">
                                            <NumericFormat
                                                className="form_group_input_"
                                                isAllowed={({ value }) =>
                                                    value?.toString().length <= 6 || value === undefined
                                                }
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                onKeyDown={onKeyDownConfirmPassword}
                                            />
                                            <div className="form_group_input_email">
                                                <AiOutlineLock className="form_group_input_email_icon" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form_group_signin">
                                        <label for="email">Confirme a sua senha</label>
                                        <div className="form_group_input">
                                            <NumericFormat
                                                className="form_group_input_"
                                                isAllowed={({ value }) =>
                                                    value?.toString().length <= 6 || value === undefined
                                                }
                                                type="password"
                                                id="confirm"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                onKeyDown={onKeyDownEnter}
                                            />
                                            <div className="form_group_input_email">
                                                <AiOutlineLock className="form_group_input_email_icon" />
                                            </div>
                                        </div>
                                    </div>

                                    {visibleError && (
                                        <div className='__signin_error'>
                                            <span className='__signin_error_msg'>
                                                {errMessage}
                                            </span>
                                        </div>
                                    )}

                                    <div className="__signin_content_buttons">
                                        <button className="__signin_login" type="button" id="proximo" onClick={handleResetPassword}>
                                            {loading ? <LoadingOutlined /> : "Continuar"}
                                        </button>
                                        <div class="options_login">
                                            <div class="border-login">
                                                <div class="border-left"></div>
                                            </div>
                                            <div class="options_text">ou</div>
                                            <div class="border-login">
                                                <div class="border-right"></div>
                                            </div>
                                        </div>
                                        <button className="__signin_cadastro" type="button" onClick={() => navigate('/login')}>Voltar</button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {step == 1 && (
                            <div className='__signin_content_details'>
                                <span className='__signin_content_details_title'><b>Parabéns! Sua senha foi alterada com sucesso<br />Você será redirecionado para a tela de login</b></span>
                                <div className="__signin_content_details_animation">
                                    <Spin indicator={antIcon} />
                                </div>
                                <div className="__signin_content_details_helper">
                                    <span onClick={() => navigate('/login')}>Clique aqui para ser redirecionado automaticamente</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordForm