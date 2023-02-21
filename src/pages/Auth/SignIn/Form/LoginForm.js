import { AiOutlineMail } from 'react-icons/ai'
// eslint-disable-next-line
import Password from 'antd/es/input/Password'
// eslint-disable-next-line
import history from '../../../../services/history'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// eslint-disable-next-line
const LoginForm = ({ email, setEmail, handleNextStep, loading, setLoading, errMessage, setErrMessage, visibleError, toggle, setToggle }) => {
    let navigate = useNavigate();

    const onKeyDownEnter = e => {
        if (e.key === "Enter") {
            document.getElementById("proximo").click();
        }
    }

    function handleToggle() {
        if (toggle) {
            setToggle(false)
        }
        if (!toggle) {
            setToggle(true)
        }
    }

    useEffect(() => { 
        let email2 = localStorage.getItem('email')

        if (email2) {
            let emailFn = email2.substring(1, email2.length - 1)
            document.getElementById("customSwitch1").checked = true 
            document.getElementById("email").value = emailFn;
            setEmail(emailFn)
        }
    }, [])
    return (
        <>
            <div className="__signin_content_title">
                <span>Seja bem-vindo á ESGTech</span>
                <span>Entre ou registre-se</span>
            </div>

            <div className="form_group_signin">
                <label htmlFor="email">Email ou CPF</label>
                <div className="form_group_input">
                    <input type="text" className="form_group_input_" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={onKeyDownEnter}></input><div className="form_group_input_email"><AiOutlineMail className="form_group_input_email_icon" /></div>
                </div>
                <div className="input_addon">
                    <div className="savepassword">
                        <div className="custom-checkbox">
                            <input type="checkbox" name='salvar' className="custom-control-input"
                                id="customSwitch1" value="salvar" onClick={() => handleToggle} />
                        </div>
                        <label className="custom-control-label" htmlFor="customSwitch1">Lembrar
                            acesso?</label>
                    </div>
                    <div className="forgot_password">
                        <span onClick={() => navigate('/recover-password')}>Esqueceu a senha?</span>
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
                <button className="__signin_login" type="button" id="proximo" onClick={handleNextStep}>Entrar</button>
                <div className="options_login">
                    <div className="border-login">
                        <div className="border-left"></div>
                    </div>
                    <div className="options_text">ou</div>
                    <div className="border-login">
                        <div className="border-right"></div>
                    </div>
                </div>
                <button className="__signin_cadastro" type="button" onClick={() => navigate('/cadastro')}>Registrar</button>
            </div>
        </>
    )
}

export default LoginForm