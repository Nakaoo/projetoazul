import React, { useState, useEffect, useRef } from "react";
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import InputMask from '../../../../components/InputMask'
import InputSelect from "../../../../components/InputSelect";
import BiArrowBack, { BiAbacus } from 'react-icons/bi'
import { Row, Col, Form, Select } from "antd";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";


const FormContact = (
    { register, control, errors, onNext, onPrevious, loading }
) => {

    const onKeyDownPhone = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("mobile2").focus();
        }
    };

    const onKeyDownMobile = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("phone1").focus();

            e.preventDefault();
        }
    }

    const onKeyDownPhone2 = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("phone2").focus();

            e.preventDefault();
        }
    }

    const onKeyDownEnter = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("proximo").click();
        }
    }

    return (
        <div key="formContact">
            <div className="__signup_subtitle">
                <span className="__signup_span_subtitle">Preencha os seus dados de contato: </span>
            </div>
            <Row gutter={16} className="__signup_row">
                <Col sm={10} className="__signup_col">
                    <InputMask
                        type="tel"
                        label="Celular 1"
                        placeholder="Digite seu número de celular"
                        control={control}
                        name="mobile1"
                        mask="(99) 99999-9999"
                        onKeyDown={onKeyDownPhone}
                        required
                        error={errors.mobile1?.message}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <InputMask
                        id="mobile2"
                        key="mobile2"
                        type="tel"
                        label="Celular 2"
                        onKeyDown={onKeyDownMobile}
                        placeholder="Digite seu segundo celular"
                        control={control}
                        name="mobile2"
                        mask="(99) 99999-9999"
                        maskChar={null}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <InputMask
                        id="phone1"
                        key="phone1"
                        type="tel"
                        label="Telefone residencial"
                        placeholder="Digite seu telefone residencial"
                        control={control}
                        onKeyDown={onKeyDownPhone2}
                        name="phone1"
                        mask="(99) 9999-9999"
                        maskChar={null}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <InputMask
                        key="phone2"
                        type="tel"
                        label="Telefone comercial"
                        placeholder="Digite seu telefone comercial"
                        control={control}
                        onKeyDown={onKeyDownEnter}
                        name="phone2"
                        mask="(99) 9999-9999"
                        maskChar={null}
                    />
                </Col>
                <Col sm={20} className="__signup_col">
                    <p className="__signup_campo"><span className="__signup_warning">*</span> - Campo obrigatório</p>
                </Col>
            </Row>

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
                            type="button"
                            id="proximo"
                            onClick={onNext}
                        >
                            {loading ? <LoadingOutlined /> : "Próximo"}
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FormContact