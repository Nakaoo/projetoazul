import React, { useState, useEffect, useRef } from "react";
import InputNumberOnly from "../../../../components/InputNumberOnly";
import { Row, Col, Form, Select } from "antd";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { BsEye } from 'react-icons/bs'

const FormSecurity = (
    { register, control, errors, onNext, onPrevious, loading }
) => {

    const onKeyDownPasswordConfirm = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("confirmPassword").focus();

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
                <span className="__signup_span_subtitle">Crie uma senha com seis números para poder acessar a plataforma: </span>
            </div>
            <Row gutter={16} className="__signup_row">
                <Col sm={10} className="__signup_col">
                    <InputNumberOnly
                        label="Senha"
                        placeholder="Digite sua senha"
                        control={control}
                        name="password"
                        required
                        onKeyDown={onKeyDownPasswordConfirm}
                        isAllowed={({ value }) =>
                            value?.toString().length <= 6 || value === undefined
                        }
                        error={errors.password?.message}
                        type="password"
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <InputNumberOnly
                        label="Confirme sua senha"
                        placeholder="Digite sua senha novamente"
                        control={control}
                        name="confirmPassword"
                        required
                        onKeyDown={onKeyDownEnter}
                        isAllowed={({ value }) =>
                            value?.toString().length <= 6 || value === undefined
                        }
                        error={errors.confirmPassword?.message}
                        type="password"
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
                        <div className="__signup_button_anterior">
                            <button
                                type="button"
                                onClick={onPrevious}
                            >Voltar</button>
                        </div>
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

export default FormSecurity