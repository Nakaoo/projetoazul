import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getAllStates, getAllCities, getStateCities } from "easy-location-br";
import { Form, Select, Input, Upload, message, Button, Row, Col, Typography } from "antd";
import { removeMask } from "../../../../utils/removeMask";
import { ChangePassword } from "./ChangePassword";

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
    const [isModalVisible, setIsModalVisible] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = async () => {
        console.log("Olá mundo")
    }

    return (
        <div className="__account_allPage">
            <div className="__account-title">
                <h4 className="__account-h4">Meu perfil</h4>
                <button className="__account-btn" onClick={showModal}>
                    Alterar senha
                </button>
            </div>
            <form className="__account_form" onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={16} className="__account_row">
                    <Col className="__account_col">

                    </Col>

                </Row>
            </form>

            <ChangePassword handleCancel={handleCancel} isModalVisible={isModalVisible} />
        </div>
    )
}