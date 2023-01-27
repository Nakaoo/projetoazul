import React, { useState, useEffect, useRef } from "react";
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import InputMask from '../../../../components/InputMask'
import InputSelect from "../../../../components/InputSelect";
import BiArrowBack, { BiAbacus } from 'react-icons/bi'
import { Row, Col, Form, Select } from "antd";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const FormPersonal = (
    { register, control, errors, onNext, setFocus, loading }
) => {
    const { Option } = Select;
    const calendarRef = useRef();
    const selectRef = useRef();
    const inputRef = useRef(null);
    const navigate = useNavigate();


    const onKeyDown = (e) => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.querySelector(".react-datepicker").style["visibility"] = "hidden";
            document.getElementById("name").focus();

            let event = new KeyboardEvent('keydown', { 'keyCode': 32, 'which': 32 });
            console.log(event);
            document.dispatchEvent(event);

            e.preventDefault();
        }
    };

    const onKeyDownHandlerBirth = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("dataAniversario").focus();
        }
    };

    const onKeyDownName = e => {
        if (e.key === "Enter") {
            document.getElementById("gender").focus();

        }
    }

    const onKeyDownEnter = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("proximo").click();
        }
    }

    const date = new Date().setFullYear(new Date().getFullYear() - 18)


    return (
        <div key="formPersonal">
            <div className="__signup_subtitle">
                <span className="__signup_span_subtitle">Para começar, precisamos dos seus dados pessoais: </span>
            </div>
            <Row gutter={16} className="__signup_row">
                <Col sm={10} className="__signup_col">
                    <InputMask
                        name="cpf"
                        id="cpf"
                        type="tel"
                        control={control}
                        label="CPF"
                        placeholder="Digite o seu CPF"
                        onKeyDown={onKeyDownHandlerBirth}
                        required
                        mask="999.999.999-99"
                        error={errors.cpf?.message}
                    />
                </Col>
                <Col sm={10}>
                    <InputDate
                        label="Data de nascimento"
                        placeholder="Digite sua data de nascimento"
                        control={control}
                        required
                        name="birthDate"
                        id="dataAniversario"
                        onKeyDown={onKeyDown}
                        maxDate={date}
                        ref={calendarRef}
                        minDate={new Date("1900")}
                        error={errors.birthDate?.message}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <Input
                        label="Nome completo"
                        placeholder="Digite o seu nome completo"
                        register={register("name")}
                        id="name"
                        onKeyDown={onKeyDownName}
                        required
                        error={errors.name?.message}
                    />
                </Col>
                <Col sm={10}>
                    <InputSelect
                        control={control}
                        label="Gênero"
                        placeholder="Selecione o seu gênero"
                        name="gender"
                        ref={selectRef}
                        onKeyDown={onKeyDownEnter}
                        required
                        options={[
                            { label: "Masculino", value: 0 },
                            { label: "Feminino", value: 1 },
                            { label: "Outros", value: 2 },
                        ]}
                        error={errors.gender?.message}
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
                            id="voltar"
                            onClick={() => navigate('/login')}
                        >
                            {loading ? <LoadingOutlined /> : "Voltar"}
                        </button>
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

export default FormPersonal