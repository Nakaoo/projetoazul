import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getAllStates, getAllCities, getStateCities } from "easy-location-br";
import { Form, Select, Upload, message, Button, Row, Col, Typography } from "antd";
import { removeMask } from "../../../../utils/removeMask";
import { ChangePassword } from "./ChangePassword";
import Input from "../../../../components/Input";
import InputDate from "../../../../components/InputDate";

export const FormUpdate = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [loadingForm, setLoadingForm] = useState(false);


    const onSubmit = async () => {
        console.log("Olá mundo")
    }

    return (
        <div className="__account_allPage">
            <form className="__account_form_personal" onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={16} className="__account_row">
                    <Col sm={16} className="__account_col">
                        <Input
                            label="Nome completo"
                            id="name"
                            readOnly
                        />
                    </Col>
                    <Col sm={16} className="__account_col">
                        <Input
                            label="CPF"
                            id="name"
                            name="cpf"
                            readOnly
                        />
                    </Col>
                    <Col sm={16} className="__account_col">
                        <Input
                            label="RG"
                            id="rg"
                            name="rg"
                        />
                    </Col>
                    <Col sm={16} className="__account_col">
                        <InputDate
                            label="Data de nascimento"
                            control={control}
                            name="birthDate"
                            id="dataAniversario"
                            minDate={new Date("1900")}
                            wrapperClassName="auth_datePicker"
                            readOnly
                        />
                    </Col>
                </Row>
            </form>

        </div>
    )
}