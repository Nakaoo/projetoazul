import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import '../styles.css'
import logo_principal from '../../../../assets/img/logo_myhart.png'
import { recoverPassword } from '../../Signup/utils/apiFunctions'
import { LoadingOutlined } from "@ant-design/icons";

const RecoverPasswordForm = () => {

    let navigate = useNavigate();
    const [visibleError, setVisibleError] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [email, setEmail] = useState('')
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [emailExihibit, setEmailExihibit] = useState('')

    const onKeyDownEnter = e => {
        if (e.key === "Enter") {
            document.getElementById("proximo").click();
        }
    }

    async function handleRecoverPassword() {
        try {
            const data = {
                email: email
            }
            setLoading(true)
            let recover = await recoverPassword(data)

            setEmailExihibit(recover?.config.data.email)
            setStep(1)
        } catch (err) {
            setVisibleError(true)
            setErrMessage("E-mail ou CPF inexistente")
            setLoading(false)
        }
    }

    return (
        <div className="__signin_container">
            <div className="__signin_content_recover">
                <div className="__signin_padding">
                    <div className="__signin_header">
                        <img src='https://dsm01pap008files.storage.live.com/y4mzMjHpa7Hd8VLeaXN4S3r3NoyUL_WiAYk6_YWLvpWu3bW3NtXTivWADQIRTQk65tb6tQ5tF5dJ0JwcnCuFaT_QPZeQWABJuIB78YZDgh-gWyTN-25Ax3IMEEzng9ernRJCiReriD7s5gHdYVfA7dPD4swh_QcjkHrxfZM3GfYjAktaW8l7AnFXFMnWJ7WMZXn?width=400&height=98&cropmode=none' alt="Logo principal BeLuck" width="350px" />
                    </div>
                    <div className="__signin_content_form">
                        {step == 0 && (
                            <form onSubmit={e => { e.preventDefault(); }}>
                                <div className="form_group_signin">
                                    <div className="__signin_content_title">
                                        <span>Recuperação de Senha</span>
                                        <span className='__signin_content_subtitle_explanation'>Recupere a sua senha com o e-mail ou CPF</span>
                                    </div>

                                    <div className="form_group_signin">
                                        <label for="email">Email ou CPF</label>
                                        <div className="form_group_input">
                                            <input type="text" placeholder="Digite o seu e-mail ou CPF" className="form_group_input_" onChange={(e) => setEmail(e.target.value)} onKeyDown={onKeyDownEnter}></input><div className="form_group_input_email"><AiOutlineMail className="form_group_input_email_icon" /></div>
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
                                        <button className="__signin_login" type="button" id="proximo" onClick={handleRecoverPassword}>
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
                                <span className='__signin_content_details_title'>Foi enviado um email de redefinição de senha para: <b>{email}</b></span>
                                <span className='__signin_content_details_subtitle'>Verifique sua caixa de SPAM</span>
                                <div className="__signin_content_buttons">
                                    <button className="__signin_login" type="button" id="proximo" onClick={() => navigate('/login')}>Fazer Login</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecoverPasswordForm