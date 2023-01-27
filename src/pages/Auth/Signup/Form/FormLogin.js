import React, { useState, useEffect, useRef } from "react";
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import InputMask from '../../../../components/InputMask'
import InputSelect from "../../../../components/InputSelect";
import BiArrowBack, { BiAbacus } from 'react-icons/bi'
import { Row, Col, Form, Select } from "antd";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";


const FormLogin = (
    { register, control, errors, onNext, onPrevious, loading }
) => {

    const onKeyDownEmail = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("confemail").focus();
        }
    }

    const onKeyDownConfirmEmail = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("login").focus();
        }
    }

    const onKeyDownEnter = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("proximo").click();
        }
    }
    return (
        <div key="formLogin">
            <div className="__signup_subtitle">
                <span className="__signup_span_subtitle">Preencha os seus dados de login para poder acessar a plataforma: </span>
            </div>
            <Row gutter={16} className="__signup_row">
                <Col sm={10} className="__signup_col">
                    <Input
                        name="email"
                        type="email"
                        label="E-mail"
                        placeholder="Digite o seu E-mail"
                        register={register("email")}
                        onKeyDown={onKeyDownEmail}
                        error={errors.email?.message}
                        required
                        auto={true}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <Input
                        id="confemail"
                        name="confemail"
                        type="email"
                        control={control}
                        label="Confirmação de Email"
                        register={register("confemail")}
                        onKeyDown={onKeyDownConfirmEmail}
                        placeholder="Digite a confirmação do seu E-mail"
                        error={errors.confemail?.message}
                        required
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <Input
                        id="login"
                        label="Login"
                        placeholder="Digite o seu login"
                        onKeyDown={onKeyDownEnter}
                        register={register("login")}
                        required
                        error={errors.login?.message}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
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

export default FormLogin