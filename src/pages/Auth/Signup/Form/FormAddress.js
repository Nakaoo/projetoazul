import React, { useState, useEffect, useRef } from "react";
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import InputMask from '../../../../components/InputMask'
import InputSelect from "../../../../components/InputSelect";
import BiArrowBack, { BiAbacus } from 'react-icons/bi'
import { Row, Col, Form, Select } from "antd";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { getAllStates, getAllCities, getStateCities } from "easy-location-br";
import InputSelectAddress from "../../../../components/InputSelectAddress";

const FormAddress = (
    { register, control, errors, onNext, onPrevious, inputFunctions, setValue, loading, setLoading }
) => {
    const getState = getAllStates();
    const [state, setState] = useState("");
    const [cityFromState, setCityFromState] = useState(getAllCities());
    const [selectState, setSelectState] = useState([]);
    const [currentCountry, setCurrentCountry] = useState("");
    const [valueCity, setValueCity] = useState();
    const [endereco, setEndereco] = useState();
    const stateRef = useRef();

    useEffect(() => {
        const states = getAllStates().map((s) => ({ label: s.name, value: s.id }));
        setSelectState(states);
        setCurrentCountry("BR");
    }, []);

    async function getAddress(inputCep) {

        const cep = inputCep.toString().replace(/-/g, "");
        const cepValidation = /^[0-9]{8}$/;

        setEndereco("SP")
        if (cepValidation.test(cep)) {
            setLoading(true)
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`).then(
                (res) => res.json()
            );

            setValue("city", response.localidade)
            setValue("state", response.uf)
            setValue("neighborhood", response.bairro)
            setValue("street", response.logradouro)

            setLoading(false)
        }
    }

    function handleChangeState(e) {
        setState(e);
        setCityFromState(getStateCities(e.target.value));
    }

    const onKeyDownState = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("state").focus();

            e.preventDefault();
        }
    }

    const onKeyDownCity = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("city").focus();

            e.preventDefault();
        }
    }

    const onKeyDownNeighborhood = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("neighborhood").focus();

            e.preventDefault();
        }
    }

    const onKeyDownStreet = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("street").focus();

            e.preventDefault();
        }
    }

    const onKeyDownNumber = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("number").focus();

            e.preventDefault();
        }
    }

    const onKeyDownComplement = e => {
        if (e.key === "Tab" || e.key === "Enter") {
            document.getElementById("complement").focus();

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
                <span className="__signup_span_subtitle">Preencha os seus dados de endereço: </span>
            </div>
            <Row gutter={16} className="__signup_row">
                <Col sm={10} className="__signup_col">
                    <InputMask
                        key="cep"
                        type="tel"
                        label="CEP"
                        placeholder="Digite seu CEP"
                        control={control}
                        onKeyDown={onKeyDownState}
                        name="cep"
                        mask="99999-999"
                        maskChar={null}
                        required
                        error={errors.cep?.message}
                        onChange={({ target }) => getAddress(target.value)}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <InputSelectAddress
                        label="Estado"
                        placeholder="Selecione o seu estado"
                        name="state"
                        options={
                            getState.map((getState, index) => (
                                { label: getState.name, value: getState.id }
                            ))
                        }
                        setValueCity={setValueCity}
                        onKeyDown={onKeyDownCity}
                        register={register("state")}
                        required
                        error={errors.state?.message}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <InputSelectAddress
                        label="Cidade"
                        placeholder="Selecione a sua cidade"
                        name="city"
                        register={register("city")}
                        options={
                            cityFromState.map((getState, index) => (
                                { label: getState.name, value: getState.name }
                            ))
                        }
                        required
                        onKeyDown={onKeyDownNeighborhood}
                        error={errors.city?.message}
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <Input
                        name="neighborhood"
                        type="neighborhood"
                        label="Bairro"
                        placeholder="Digite o seu bairro"
                        onKeyDown={onKeyDownStreet}
                        register={register("neighborhood")}
                        error={errors.neighborhood?.message}
                        required
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <Input
                        name="street"
                        type="street"
                        label="Rua"
                        onKeyDown={onKeyDownNumber}
                        placeholder="Digite a sua rua"
                        register={register("street")}
                        error={errors.street?.message}
                        required
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <Input
                        name="number"
                        type="street"
                        label="Número"
                        placeholder="Digite o seu número"
                        register={register("number")}
                        onKeyDown={onKeyDownComplement}
                        error={errors.number?.message}
                        required
                    />
                </Col>
                <Col sm={10} className="__signup_col">
                    <Input
                        name="complement"
                        type="complement"
                        label="Complemento"
                        placeholder="Digite o seu complemento"
                        onKeyDown={onKeyDownEnter}
                        register={register("complement")}
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

export default FormAddress