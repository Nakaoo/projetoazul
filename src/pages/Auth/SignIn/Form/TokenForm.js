import { useEffect, useState, useRef } from 'react'
import { AiOutlineLock } from 'react-icons/ai'
import { generateRandomKeyword } from '../../Signup/utils/apiFunctions'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { message } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";
import VerificationInput from 'react-verification-input'

const TokenForm = ({ botaoTimer, name, onSubmit, loading, setLoading, setToken, token, visibleError, errMessage, loginSubmit }) => {
    let tokenImg = 'https://dsm01pap008files.storage.live.com/y4mPE1ijmV6WwQ03B9FnB-cYdvoEUbN8AQBQef6EJvPuBGymP3ujPRnhPl8r2siDQ6QpcvBtLOV1ozg9AdZa0oubASuFHKw88pCzt57o-6qyt0sjPCh1CQRE6_iTp4yvw4y5MKxAgK93R0kYOd606LoCbDUx85wNKIIwHeJRoHluapRTZW2oZB689pwY4rAQoGw?width=148&height=148&cropmode=none'

    useEffect(() => {
        botaoTimer()
    }, [])

    return (
        <>
            <div className="__signin_content_title">
                <span>Olá, {name}</span>
                <span>Confirme o seu TOKEN enviado por email</span>
            </div>

            <div className='__signin_content_logo'>
                <img src={tokenImg} className="__signin_content_logo_img" />
            </div>

                <VerificationInput
                    classNames={{
                        container: "__verifcation_container",
                        character: "__verification_character",
                        characterInactive: "__verification_character--inactive",
                        characterSelected: "__verification_character--selected",
                    }}
                    validChars="0-9"
                    inputProps={{type: "tel"}}
                    length={4}
                    placeholder=''
                    onChange={(val) => setToken(val)}
                />

            {visibleError && (
                <div className='__signin_error'>
                    <span className='__signin_error_msg'>
                        {errMessage}
                    </span>
                </div>
            )}

            <div className="__signin_content_buttons">
                <button className="__signin_login" onClick={onSubmit} type="submit">
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
                <button className="__signin_cadastro" id="reenviar"  type="button" onClick={loginSubmit}>Reenviar Token</button>
            </div>
        </>
    )
}

export default TokenForm