import React, { useState, useEffect } from "react";
import { Row, Col, Form, Select, Modal } from "antd";
import { useParams } from "react-router-dom";
import { validaConta } from "../utils/apiFunctions";
import Skeleton from "../../../../components/Skeleton";
import { useNavigate } from "react-router-dom";

const FormAtivacao = () => {
    const [ativado, setAtivado] = useState()
    const [loading, setLoading] = useState(false)
    const verificao = useState()
    const navigate = useNavigate();
    let logo_principal = 'https://dsm01pap008files.storage.live.com/y4mzMjHpa7Hd8VLeaXN4S3r3NoyUL_WiAYk6_YWLvpWu3bW3NtXTivWADQIRTQk65tb6tQ5tF5dJ0JwcnCuFaT_QPZeQWABJuIB78YZDgh-gWyTN-25Ax3IMEEzng9ernRJCiReriD7s5gHdYVfA7dPD4swh_QcjkHrxfZM3GfYjAktaW8l7AnFXFMnWJ7WMZXn?width=400&height=98&cropmode=none'
    let { token } = useParams();

    async function verificarToken() {
        setLoading(true)

        let user = await validaConta(token)

        if (user.data.error === true) {
            setAtivado(false)
        } else {
            setAtivado(true)
            setTimeout(() => {
                navigate('/login')
            }, 5000);
        }

        setLoading(false)
    }

    useEffect(() => {
        verificarToken()
    }, [])

    return (
        <div className="__signup_container">
            <div className="__signup_content">
                <div className="__signup_header">
                    <div className="__signup_logo">
                        <img src={logo_principal} alt="Logo principal MyHart" width="350px" />
                    </div>
                    <div className="__signup_title">
                        <h3 className="__signup_span_title">Cadastre-se na pré-venda e tenha acesso a
                            um universo de novas possibilidades</h3>
                    </div>
                    {loading == true && (
                        <Skeleton />
                    )}
                    {loading == false && ativado == false && (
                        <><div className="__signup_subtitle">
                            <span className="__signup_span_subtitle">Token Invalido!!</span>
                        </div><div className="__signup_subtitle">
                                <span className="__signup_span_subtitle">O token informado encontra-se invalido. Efetue o cadastro novamente, em caso de dúvidas, <br /> <a href="mailto:email@provedor.com.br">Clique aqui para falar conosco</a></span>
                            </div></>
                    )}
                    {loading == false && ativado == true && (
                        <><div className="__signup_subtitle">
                            <span className="__signup_span_subtitle">CONTA ATIVADA COM SUCESSO</span>
                        </div><div className="__signup_form_information_content">
                                <p>Parabéns, a sua conta foi ativada, </p>
                                <span className="__signup_form_information_span">Clique no botão abaixo para ser redirecionado ao login ou aguarde cinco segundos</span>
                            </div><Row gutter={16} className="__signup_buttons_end">
                                <div className="__signup_button_proximo2">
                                    <button
                                        type="submit"
                                    >LOGAR</button>
                                </div>
                            </Row></>
                    )}
                </div>
            </div>
        </div>
    )

}


export default FormAtivacao