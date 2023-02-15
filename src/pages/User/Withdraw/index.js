import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import { message, Modal, Button, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom"
import InputSelect from './components/InputSelect'
import './index.css'
import InputNumber from "./components/InputNumber";
import Input from "./components/Input";
import banks from "../../../utils/banks";
import InputGrid from "./components/InputGrid";
import withdraw from "./utils/apifunction";
import SucessfulWithdrawal from "./components/SucessfulWithdrawal";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Withdraw() {
    const formRef = useRef(null);
    const selectRef = useRef(null);
    const navigate = useNavigate();
    const [accountType, people] = useOutletContext();
    const [emergencyFee, setEmergencyFee] = useState(0);
    const [confirmPage, setConfirmPage] = useState(false);
    const [idOperacao, setIdOperacao] = useState();
    const [uuid, setUuid] = useState();
    const [loading, setLoading] = useState();

    const selectBank = banks.map((b) => ({
        label: `${b.COMPE} - ${b.LongName}`,
        value: b.COMPE,
    }));

    const schema = Yup.object().shape({
        bank: Yup.string().when("withdrawWay", {
            is: "TED",
            then: Yup.string().required("Insira o banco"),
        }),
        agency: Yup.string().when("withdrawWay", {
            is: "TED",
            then: Yup.string().required("Insira a agência"),
        }),
        account: Yup.string().when("withdrawWay", {
            is: "TED",
            then: Yup.string().required("Insira o número da conta"),
        }),
        keyPix: Yup.string().when("withdrawWay", {
            is: "PIX",
            then: Yup.string().required("Insira a chave pix"),
        }),
        withdrawWay: Yup.string().required("Campo obrigatório"),
        amount: Yup.string().required("Insira o valor do saque")
            .test("amount", "A sua conta não possui saldo suficiente", (value, context) => {
                const amount = parseFloat(value?.replace(/\D/g, "") / 100);
                return amount.toFixed(2) <= (parseFloat(people?.wallet?.balance));
            }),
    });

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setError,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({ mode: "all", resolver: yupResolver(schema) });

    async function onSubmit() {
        const {
            bank,
            agency,
            account,
            amount,
            keyPix,
            withdrawWay,
            emergency_fee,
        } = getValues();

        setLoading(true);

        let value = (parseInt(amount.replace(/\D/g, '')) / 100).toFixed(2);

        if (withdrawWay === "PIX") {
            const data = {
                amount: Number(value),
                walletid: people?.wallet.id,
                doc_fiscal_owner: people?.user.doc_fiscal,
                owner_name: people?.user.name,
                key_pix: keyPix,
                bank: "",
                account: "",
                account_div: "",
                agency: "",
                emergencyFee: emergencyFee
            }

            try {
                let withdrawCreate = await withdraw(data)

                if (withdrawCreate?.data?.error === false) {
                    setConfirmPage(true)
                    setLoading(false)
                    setIdOperacao(withdrawCreate?.data?.id)
                    setUuid(withdrawCreate?.data?.uuid)
                }
            } catch (err) {
                message.error("Erro na solicitação de saque. Entre em contato com o nosso suporte")
                setLoading(false)
            }

            setLoading(false);
        }
        else if (withdrawWay === "TED") {
            // Tratar caso o usuario coloque '-'
            let accountF = account.replace("-", "")

            const data = {
                amount: Number(value),
                walletid: people?.wallet.id,
                doc_fiscal_owner: people?.user.doc_fiscal,
                owner_name: people?.user.name,
                bank: bank,
                account: accountF.slice(0, -1),
                account_div: account.charAt(account.length - 1),
                agency: agency,
                emergencyFee: emergencyFee,
                key_pix: ""
            }
            try {
                let withdrawCreate = await withdraw(data)

                if (withdrawCreate?.data?.error === false) {
                    setConfirmPage(true)
                    setLoading(false)
                    setIdOperacao(withdrawCreate?.data?.result.id)
                    setUuid(withdrawCreate?.data?.uuid)
                }
            } catch (err) {
                message.error("Erro na solicitação de saque. Entre em contato com o nosso suporte")
                setLoading(false)
            }
        }
    }

    function handleEmergencyFee() {
        if (emergencyFee == 0)
            setEmergencyFee(1)
        else
            setEmergencyFee(0)
    }

    return (
        <div className="__withdraw_component">
            <form className="__withdraw_form" onSubmit={handleSubmit(onSubmit)}>
                {!confirmPage ? (
                     <><div className="__withdraw_form_content">
                        <div className="__withdraw_form_header">
                            <div className="__withdraw_form_header_title">
                                <div className="__withdraw_form_header_bar"></div>Saque
                            </div>
                            <div className="__withdraw_form_header_information">
                                <div className="__withdraw_form_header_information_title">Disponivel para saque</div>
                                <div className="__withdraw_form_header_information_value">R$ {people?.wallet?.balance} <div className="__withdraw_form_header_information_value_icon"><AiOutlineDollarCircle /></div></div>
                                <div className="__withdraw_form_header_information_description">Todo período</div>
                            </div>
                        </div>
                        <div className="__withdraw_form_body">
                            <h4>Informações de saque</h4>
                            <Col>
                                <InputSelect
                                    control={control}
                                    label="Forma de saque"
                                    placeholder="Selecione uma opção de saque"
                                    name="withdrawWay"
                                    ref={selectRef}
                                    required
                                    type={"row"}
                                    options={[
                                        { label: "Pix", value: "PIX" },
                                        { label: "Ted", value: "TED" },
                                    ]}
                                    error={errors.withdrawWay?.message} />
                            </Col>
                            <Col>
                                <InputNumber
                                    name="amount"
                                    control={control}
                                    error={errors.amount?.message}
                                    label="Valor a ser sacado"
                                    placeholder="Digite o valor que vai ser sacado"
                                    decimalScale={2}
                                    mode="decimal"
                                    fixedDecimalScale
                                    valueAsNumber
                                    allowNegative={false} />
                            </Col>
                            {watch('withdrawWay') === "PIX" && (
                                <>
                                    {/* <Col>
            <div className="pix_keytype">
                <label>Tipo de chave</label>
                <div className="keys">
                    <div className="__keyGroup">
                        <input type="radio"></input>
                        <label>Email</label>
                    </div>
                    <div className="__keyGroup">
                        <input type="radio"></input>
                        <label>Celular</label>
                    </div>
                    <div className="__keyGroup">
                        <input type="radio"></input>
                        <label>Aleatória</label>
                    </div>
                    <div className="__keyGroup">
                        <input type="radio"></input>
                        <label>CPF</label>
                    </div>
                </div>
            </div>
        </Col> */}
                                    <Col>
                                        <Input
                                            label="Chave Pix"
                                            placeholder="Digite a sua chave pix"
                                            register={register("keyPix")}
                                            error={errors.keyPix?.message}
                                            name="keyPix" />
                                    </Col>
                                </>
                            )}
                            {watch('withdrawWay') === "TED" && (
                                <><Col>
                                    <InputSelect
                                        className="__transfer-scroll-select"
                                        label="Banco"
                                        placeholder="Selecione o banco"
                                        name="bank"
                                        control={control}
                                        options={selectBank}
                                        register={register("bank")}
                                        error={errors.bank?.message}
                                        type={"col"} />
                                </Col><Col className="__col_flex">
                                        <InputGrid
                                            label="Agência"
                                            placeholder="Digite a sua agência"
                                            register={register("agency")}
                                            error={errors.agency?.message}
                                            name="agency"
                                            col="col" />
                                        <InputGrid
                                            label="Conta"
                                            placeholder="Digite a sua conta"
                                            register={register("account")}
                                            error={errors.account?.message}
                                            name="account"
                                            col="col" />
                                    </Col></>
                            )}
                            <div className="__withdraw_form_check">
                                <input type="checkbox" name="emergency_fee" onClick={(e) => handleEmergencyFee()} /> Saque emergencial (Taxa de 12 reais)
                            </div>
                        </div>
                    </div><div className="__withdraw_form_buttons">
                            <button className="__withdraw_form_button_secondary" onClick={() => navigate('/dashboard')}>Cancelar</button>
                            <button className="__withdraw_form_button_primary" type="submit">
                                {loading ? <LoadingOutlined /> : "Solicitar"}
                            </button>
                        </div></>
                ) : (
                    <SucessfulWithdrawal watch={watch} idOperacao={idOperacao} confirmPage={confirmPage} setConfirmPage={setConfirmPage} uuid={uuid}/>
                )}
            </form>
        </div>
    )
}