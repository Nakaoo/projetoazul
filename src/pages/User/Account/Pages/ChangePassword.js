import { Input } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Col, Row } from "antd";
import InputNumberOnly from "../../../../components/InputNumberOnly";

export const ChangePassword = ({ handleCancel, isModalVisible }) => {

    const schema = Yup.object().shape({
        actualPassword: Yup.string().required("Campo obrigatório"),
        password: Yup.string().required("Campo obrigatório"),
        confirmPassword: Yup.string()
            .required("Campo obrigatório")
            .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
    });

    const {
        register,
        handleSubmit,
        control,
        getValues,
        watch,
        formState: { errors },
    } = useForm({ mode: "all", resolver: yupResolver(schema) });

    const onSubmit = async () => {
        console.log("Olá mundo")
    }

    return (
        <Modal
            title="Alterar senha"
            reset={true}
            onCancel={handleCancel}
            open={isModalVisible}
            okText="Alterar"
            footer={null}
        >
            <form className="__account_change_password" onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={16} className="__account_row">
                    <Col className="__account_col">
                        <InputNumberOnly
                            label="Senha atual"
                            placeholder="Digite a senha atual"
                            control={control}
                            name="actualPassword"
                            required
                            isAllowed={({ value }) =>
                                value?.toString().length <= 6 || value === undefined
                            }
                            error={errors.password?.message}
                            type="password"
                        />
                    </Col>
                    <Col className="__account_col">
                        <InputNumberOnly
                            label="Nova senha"
                            placeholder="Digite a nova senha"
                            control={control}
                            name="password"
                            required
                            isAllowed={({ value }) =>
                                value?.toString().length <= 6 || value === undefined
                            }
                            error={errors.password?.message}
                            type="password"
                        />
                    </Col>
                    <Col className="__account_col">
                        <InputNumberOnly
                            label="Confirmação de senha"
                            placeholder="Digite a confirmação da nova senha"
                            control={control}
                            name="confirmPassword"
                            required
                            isAllowed={({ value }) =>
                                value?.toString().length <= 6 || value === undefined
                            }
                            error={errors.password?.message}
                            type="password"
                        />
                    </Col>
                    <Col className="__account_col">
                        <button type="submit" />
                    </Col>
                </Row>
            </form>
        </Modal>
    )
}