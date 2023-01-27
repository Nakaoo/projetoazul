import { useEffect, useState } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import { generateRandomKeyword } from '../../Signup/utils/apiFunctions'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { message } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";


const PasswordForm = ({ senha, loginSubmit, setSenha, teclado, handlePreviousStep, loading, setLoading, tecladoLoading, visibleError, errMessage }) => {

    function handleClick() {
        message.error("Por favor utilize o teclado virtual abaixo")
    }

    function handleVirtualKey(e) {
        if (senha.length < 6) {
            // String concat
            let password = senha + e;
            setSenha(password)
        }
    }

    function handleDeleteVirtualKey() {
        if (senha.length > 0) {
            let lastPosition = senha.slice(0, -1)
            setSenha(lastPosition)
        }
    }

    return (
        <>
            <div className="__signin_content_title">
                <span>Olá,</span>
                <span>Utilize o teclado virtual abaixo</span>
            </div>

            <div className="form_group_signin">
                <label for="email">Senha</label>
                <div className="form_group_input">
                    <input type="password" className="form_group_input_" maxLength={6} readonly onClick={handleClick} value={senha}></input><div className="form_group_input_email"><AiOutlineLock className="form_group_input_email_icon" /></div>
                </div>
            </div>

            {visibleError && (
                <div className='__signin_error'>
                    <span className='__signin_error_msg'>
                        {errMessage}
                    </span>
                </div>
            )}

            {tecladoLoading && (
                <div className='__form_teclado_warning'>
                    <span>Carregando o teclado virtual...</span>
                </div>
            )}

            {!tecladoLoading && (
                <div class="teclado_senha">
                    {(teclado.map((tecla, i) => {
                        const [valor1, valor2] = tecla;
                        const index = i;

                        return (
                            <div
                                key={i}
                                onClick={(e) => handleVirtualKey(index)}
                                className="teclado_senha_item"
                            >
                                {valor1} ou {valor2}
                            </div>
                        );
                    }))}
                    <div
                        className="teclado_senha_item"
                        onClick={handleDeleteVirtualKey}
                    >
                        <RiDeleteBack2Line />
                    </div>
                </div>
            )}

            <div className="__signin_content_buttons">
                <button className="__signin_login" onClick={loginSubmit} type="button" disabled={loading ? true : false}>
                    {loading ? <LoadingOutlined /> : "Entrar"}
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
                <button className="__signin_cadastro" onClick={handlePreviousStep}>Voltar</button>
            </div>
        </>
    )
}

export default PasswordForm