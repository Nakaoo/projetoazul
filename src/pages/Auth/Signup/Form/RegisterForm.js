import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useRef } from "react";
import { cpf } from "cpf-cnpj-validator";
import {
    Form,
    // eslint-disable-next-line
    Input,
    // eslint-disable-next-line
    Modal,
    // eslint-disable-next-line
    Row,
    // eslint-disable-next-line
    Col,
    message,
    // eslint-disable-next-line
    Select,
    // eslint-disable-next-line
    Switch,
    // eslint-disable-next-line
    Button,
    // eslint-disable-next-line
    Collapse,
    // eslint-disable-next-line
    Checkbox,
    // eslint-disable-next-line
    Tabs,
} from "antd";
import { formatISO } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line
import { removeMask, dateToBack } from '../../../../utils/removeMask';
import { createAccount, getUserByCpf, getUserByEmail, getUserByLogin, getUserByPhone } from '../utils/apiFunctions';
import { useLocation } from 'react-router-dom';

// Pages for register
import FormPersonal from './FormPersonal';
import FormLogin from './FormLogin';
import FormContact from './FormContact';
import FormAddress from './FormAddress';
import FormSecurity from './FormSecurity';
import FormTerms from './FormTerms';
import FormDetails from './FormDetails';
import FormInformation from './FormInformation';

const RegisterForm = ({ step, setStep, routeProps }) => {
    // eslint-disable-next-line
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState(null);
    const [id, setId] = useState()
    const formContainer = useRef(null);
    const scrollToRef = (ref) => ref.current.scrollTo(0, ref.current);
    const location = useLocation();

    useEffect(() => {
        let id = location.search.split("=")[1]
        setId(id)
    }, [])

    const digitsOnly = (value) => /^\d+$/.test(value)
    
    const schemaFields = {
        personal: {
            cpf: Yup.string()
                .required("Campo obrigat??rio")
                .test("validTaxId", "Insira um CPF v??lido", (value) =>
                    cpf.isValid(value)
                ),
            name: Yup.string()
                .required("Campo obrigat??rio")
                .test(
                    "surname",
                    "Insira o nome completo",
                    (value) => String(value).trim().split(" ").length > 1
                ),
            birthDate: Yup.string().required("Campo obrigat??rio").nullable(),
            gender: Yup.string().required("Campo obrigat??rio").nullable(),
        },
        complement: {
            email: Yup.string().required("Campo obrigat??rio"),
            confemail: Yup.string()
                .required("Campo obrigat??rio")
                .oneOf([Yup.ref("email"), null], "E-mail de confirma????o e e-mail devem ser iguais"),
            login: Yup.string().required("Campo obrigat??rio").min(6, "Login menor que seis caracteres").max(15, "Login maior que quinze caracteres")
        },
        contact: {
            mobile1: Yup.string().min(15, "N??mero invalido").required("Campo obrigat??rio")
        },
        address: {
            cep: Yup.string().required("Campo obrigat??rio"),
            neighborhood: Yup.string().required("Campo obrigat??rio"),
            street: Yup.string().required("Campo obrigat??rio"),
            number: Yup.string().required("Campo obrigat??rio"),
            // complement: Yup.string().required("Campo obrigat??rio"),
        },
        agreement: {
            terms: Yup.boolean().oneOf([true], "?? necess??rio aceitar os termos e condi????es de uso"),
            politic: Yup.boolean().oneOf([true], "?? necess??rio aceitar a politica de privacidade"),
        },
        security: {
            password: Yup.string().required("Campo obrigat??rio").test(
                "passwordError",
                "Insira apenas n??meros",
                (value) => value !== 1
            ),
            confirmPassword: Yup.string()
                .required("Campo obrigat??rio")
                .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
        },
    }

    const schema = Yup.object().shape({
        ...schemaFields.personal,
        ...schemaFields.complement,
        ...schemaFields.contact,
        ...schemaFields.address,
        ...schemaFields.agreement,
        ...schemaFields.security,
    });

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setError,
        setValue,
        setFocus,
        watch,
        // eslint-disable-next-line
        reset,
        formState: { errors },
    } = useForm({ mode: "all", resolver: yupResolver(schema) });

    const renderForm = () => {
        if (step === 0) {
            return (
                <FormPersonal
                    setValue={setValue}
                    register={register}
                    control={control}
                    errors={errors}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    setFocus={setFocus}
                    loading={loading}
                />
            );
        }
        if (step === 1) {
            return (
                <FormLogin
                    setValue={setValue}
                    register={register}
                    control={control}
                    errors={errors}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    setFocus={setFocus}
                    loading={loading}
                />
            );
        }
        if (step === 2) {
            return (
                <FormContact
                    setValue={setValue}
                    register={register}
                    control={control}
                    errors={errors}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    loading={loading}
                />
            );
        }
        if (step === 3) {
            return (
                <FormAddress
                    setValue={setValue}
                    register={register}
                    control={control}
                    errors={errors}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    loading={loading}
                    setLoading={setLoading}
                />
            );
        }
        if (step === 4) {
            return (
                <FormSecurity
                    setValue={setValue}
                    register={register}
                    control={control}
                    errors={errors}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    loading={loading}
                />
            );
        }
        if (step === 5) {
            return (
                <FormTerms
                    setValue={setValue}
                    register={register}
                    control={control}
                    errors={errors}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    loading={loading}
                />
            );
        }
        if (step === 6) {
            return (
                <FormDetails
                    setValue={setValue}
                    register={register}
                    control={control}
                    errors={errors}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    loading={loading}
                    watch={watch}
                />
            );
        }
        if (step === 7) {
            return (
                <FormInformation
                    watch={watch}
                />
            );
        }
    };

    const changeStep = async (value) => {
        // eslint-disable-next-line
        const values = getValues();

        if (value !== step) {
            if (value > step) {
                const valid = await validateStep();
                scrollToRef(formContainer);
                if (valid === false) return false;
            }

            const length = Object.keys(routeProps).length;
            setStep(value < 0 ? 0 : value > length ? length : value);
        }
    };

    async function validateStep() {
        const values = getValues();
        const sc = schemaFields[routeProps[step].route];
        const stepSchema = Yup.object().shape(sc);
        let valid = false;
        let validBackFields = false;

        try {
            await stepSchema.validate(values, { abortEarly: false });
            valid = true;
            validBackFields = await validateBackFields();
        } catch (error) {
            const errorsYup = {};

            if (error instanceof Yup.ValidationError) {
                error.inner.forEach((err) => {
                    setError(err.path, { message: err.message }, { shouldFocus: true });
                    errorsYup[err.path] = err.message;
                });
            }
        }

        return validBackFields && valid;
    }

    async function validateBackFields() {
        const values = getValues();
        let validBack = false;
        let validEmail = false;
        // eslint-disable-next-line
        let validLogin = false;

        if (step === 0 && values.cpf) {
            try {
                const response = await getUserByCpf({ 'cpf': removeMask(values.cpf) })

                console.log('resposta', response)

                if(response.status === 200){
                    setError(
                        "cpf",
                        {
                            message: "J?? existe uma conta cadastrada com esse CPF",
                        },
                        { shouldFocus: true }
                    );  
                }else{
                    throw new Error('')
                }
            } catch (err) {
                validBack = true;
            }
        }
        else if (step === 1 && values.email) {
            try {
                const response = await getUserByEmail({ 'email': values.email })

                if(response.status === 200){
                    setError(
                        "email",
                        {
                            message: "J?? existe uma conta cadastrada com esse e-mail",
                        },
                        { shouldFocus: true }
                    );
                }else{
                    throw new Error('')
                }
            } catch (err) {
                validEmail = true
            }
            if (validEmail === true) {
                try {
                    const response = await getUserByLogin({ 'login': values.login })

                    if(response.status === 200){
    
                        setError(
                            "login",
                            {
                                message: "J?? existe uma conta cadastrada com esse login",
                            },
                        );
                    }else{
                        throw new Error('')
                    }
                } catch (err) {
                    validBack = true;
                }
            }
        }
        else if (step === 1 && values.login) {
            try {
                const response = await getUserByLogin({ 'login': values.login })

                if(response.status === 200){
                    if (validEmail === false) {
                        setError(
                            "email",
                            {
                                message: "J?? existe uma conta cadastrada com esse e-mail",
                            },
                        );
                    }
    
                    setError(
                        "login",
                        {
                            message: "J?? existe uma conta cadastrada com esse login",
                        },
                    );
                }else{
                    throw new Error('')
                }
            } catch (err) {
                if (validEmail === true) {
                    validBack = true
                }
            }
        }
        else if (step === 2 && values.mobile1) {

            try{
                const response = await getUserByPhone({ 'phone': values.mobile1 })

                if(response.status === 200){
                    setError(
                        "mobile1",
                        {
                            message: "J?? existe uma conta cadastrada com esse celular",
                        },
                        { shouldFocus: true }
                    );
                }else{
                    throw new Error('')
                }
            }catch(err){
                validBack = true
            }
        }
        else {
            validBack = true;
        }
        return validBack;
    }


    async function onSubmit(values) {

        setLoading(true)


        const data = {
            name: values.name,
            doc_fiscal: removeMask(values.cpf),
            email: values.email,
            password: values.password,
            nickname: values.login,
            celular1: values?.mobile1,
            birthday: formatISO(new Date(values.birthDate), {
                representation: "date",
            }),
            gender: values.gender,
            street: values.street,
            number: values.number,
            neighborhood: values.neighborhood,
            city: values.city,
            state: values.state,
            cep: values.cep,
            sponsor_id: !id ? 1 : id
        };

        try {
            await createAccount(data)

            changeStep(step + 1)

            message.success("Sua conta foi criada com sucesso")
        } catch (err) {
            message.error("Erro na cria????o de conta")
        }

        setLoading(false);
    }

    async function onNext() {
        setLoading(true);

        const validSteps = await validateStep();

        console.log(validSteps)

        setLoading(false);

        if (validSteps) {
            changeStep(step + 1);
        }
    }

    function onPrevious() {
        changeStep(step - 1);
    }

    return (
        <>
            <form
                ref={formContainer}
                className="__auth-form __auth-form-signup"
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderForm()}
            </form>
        </>
    )
}

export default RegisterForm