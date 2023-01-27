import React, { useState, useEffect, useRef } from "react";
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import InputMask from '../../../../components/InputMask'
import InputSelect from "../../../../components/InputSelect";
import InputCheckbox from "../../../../components/InputCheckbox";
import BiArrowBack, { BiAbacus } from 'react-icons/ai'
import { Row, Col, Form, Select, Modal } from "antd";
import { formatISO } from "date-fns";
import { dateToFront } from "../../../../utils/removeMask";
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import countStar from "../utils/countStar";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
const FormDetails = (
    { register, control, errors, onNext, onPrevious, watch, loading }
) => {
    let navigate = useNavigate();
    
    const [showModal, setShowModal] = useState(false)
    const [showModalPolitic, setShowModalPolitic] = useState(false)
    const [passwordShow, setPasswordShow] = useState('password')

    let data = formatISO(new Date(watch("birthDate")), {
        representation: "date",
    })

    function handleStarsPassword() {
        if (passwordShow == "password")
            setPasswordShow('stars');
        else
            setPasswordShow('password');
    }

    return (
        <div key="formDetails">
            <div className="__signup_subtitle">
                <span className="__signup_span_subtitle">Revise os seus dados, se estiverem corretos clique no botão de cadastrar </span>
            </div>
            <div className="__signup_form_details_content">
                <div className="__signup_form_details_content_row">
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Nome completo</span>: {watch("name")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">CPF</span>:  {watch("cpf")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Data de nascimento</span>: {dateToFront(data)} </p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Gênero</span>: {watch("gender") == "0" ? "Masculino" : watch("gender") == "1" ? "Feminino" : "Outros"}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Celular</span>: {watch("mobile1")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Email</span>: {watch("email")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Nome de usuário</span>: {watch("login")}</p>
                    </div>
                </div>
                <div className="__signup_form_details_content_row">
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Cep</span>: {watch("cep")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Estado</span>: {watch("state")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Cidade</span>: {watch("city")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Bairro</span>: {watch("neighborhood")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Rua</span>: {watch("street")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Número</span>: {watch("number")}</p>
                    </div>
                    <div className="__signup_form_details_content_row_item">
                        <p><span class="__signup_form_details_content_row_item_bold">Senha</span>: {passwordShow == "password" ? countStar(watch("password")) :  watch("password")} {passwordShow == "password" ? <VscEye className="simple_icon" onClick={handleStarsPassword} /> : <VscEyeClosed className="simple_icon" onClick={handleStarsPassword} />}</p>
                    </div>
                </div>
            </div>
            <Row className="__signup_buttons">
                <Col sm={10}>
                    <div className="__signup_button_anterior">
                        <button
                            type="button"
                            onClick={onPrevious}
                        >Voltar</button>
                    </div>
                </Col>
                <Col sm={10}>
                    <div className="__signup_button_proximo">
                        <button
                            type="submit"
                            id="proximo"
                        >
                            {loading ? <LoadingOutlined /> : "Cadastrar"}
                        </button>
                    </div>
                </Col>
            </Row>
        </div>

    )

}


export default FormDetails