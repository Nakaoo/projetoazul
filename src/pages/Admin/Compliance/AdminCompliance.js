import React from "react"
import { useEffect, useState, useContext, useNavigate } from "react"
import Navbar from "../../../components/Navbar/Navbar"
import MenuBarAdmin from "../../../components/MenuBarAdmin"
import { UserContext } from "../../../hooks/UserContext"
import { HiMenu } from "react-icons/hi"
import { BsFillPersonFill } from 'react-icons/bs'
import Approved from "./Table/Approved"
import './AdminCompliance.css'
import Pending from "./Table/Pending"
import Refused from "./Table/Refused"
import { useLocation } from "react-router-dom"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'

export default function AdminCompliance() {
    const [accountType, setAccountType] = useState('')
    const [menu, setMenu] = useState(false)
    const tkUser = localStorage.getItem('tk-user')
    const { value, setValue } = useContext(UserContext)
    const [page, setPage] = useState('pending')
    const [step, setStep] = useState(1)
    const [orderNumber, setOrderNumber] = useState()
    const [person, setPerson] = useState()
    const [personalDetails, setPersonalDetails] = useState(true)
    const [contactDetails, setContactDetails] = useState(true)
    const [addressDetails, setAddressDetails] = useState(true)
    const [transactionDetails, setTransactionDetails] = useState(true)
    const [documentDetails, setDocumentDetails] = useState(true)

    const location = useLocation();

    useEffect(() => {
        let page = location.search.split("=")[1]
        setPage(page)
    }, [location.search.split("=")[1]])

    function handlePersonalDetails() {
        if (personalDetails) {
            setPersonalDetails(false)
        } else {
            setPersonalDetails(true)
        }
    }

    function handleContactDetails() {
        if (contactDetails) {
            setContactDetails(false)
        } else {
            setContactDetails(true)
        }
    }

    function handleAddressDetails() {
        if (addressDetails) {
            setAddressDetails(false)
        } else {
            setAddressDetails(true)
        }
    }

    function handleTransactionDetails() {
        if (transactionDetails) {
            setTransactionDetails(false)
        } else {
            setTransactionDetails(true)
        }
    }

    function handleDocumentDetails() {
        if (documentDetails) {
            setDocumentDetails(false)
        } else {
            setDocumentDetails(true)
        }
    }

    function handleBackButton() {
        setStep(0)
    }

    function handleRefuseButton() {

    }

    function handleAcceptButton() {

    }

    function handleEditButton() {

    }

    return (
        <div className="__admin_dashboard_container">

            <MenuBarAdmin />
            
            <aside className="__admin_dashboard_aside">
                <Navbar title={"Compliance"} subtitle={"Painel de controle"} />
                <div className="__admin_dashboard_content">
                    {step == 0 && (
                        <><div className="__admin_dashboard_cards">
                            <div className="__admin_dashboard_card">
                                <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indicações</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                                <span className="__admin_dashboard_card_value">5</span>
                                <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                            </div>

                            <div className="__admin_dashboard_card">
                                <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                                <span className="__admin_dashboard_card_value">8</span>
                                <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                            </div>

                            <div className="__admin_dashboard_card">
                                <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                                <span className="__admin_dashboard_card_value">3</span>
                                <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                            </div>


                            <div className="__admin_dashboard_card">
                                <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                                <span className="__admin_dashboard_card_value">40</span>
                                <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                            </div>
                        </div><div className="__admin_compliance_table_">
                                <div className="__admin_compliance_table">
                                    {page == 'approved' && (
                                        <Approved step={step} setStep={setStep} />
                                    )}
                                    {page == 'pending' && (
                                        <Pending step={step} setStep={setStep} />
                                    )}
                                    {page == 'refused' && (
                                        <Refused step={step} setStep={setStep} />
                                    )}
                                </div>
                            </div></>
                    )}
                    {step == 1 && (
                        <div className="admin_dashboard_information_content">
                            <div className="__admin_information_content_principal">
                                <div className="__admin_information_content_cards">
                                    <div className="__admin_information_content_card">
                                        <div className="__admin_information_content_card_title">
                                            <span className="__admin_information_content_card_title_span">
                                                Informações pessoais
                                            </span>
                                            {personalDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                                onClick={handlePersonalDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handlePersonalDetails} />}
                                        </div>

                                        {personalDetails && (
                                            <div className="__adin_information_content_card_container">
                                                <div className="__admin_information_content_card_form">
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Nome Completo: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Data de Nascimento: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Estado Civil: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>CPF: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Sexo: </span>
                                                    </div>
                                                </div>

                                                <div className="__admin_information_content_card_form_checkbox">
                                                    <input type="checkbox" name="confirmationInformation" />
                                                    <label htmlFor="confirmationInformation">Verificar se todos os dados estão corretos</label>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                    <div className="__admin_information_content_card">
                                        <div className="__admin_information_content_card_title">
                                            <span className="__admin_information_content_card_title_span">
                                                Informações de contato
                                            </span>
                                            {contactDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                                onClick={handleContactDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleContactDetails} />}
                                        </div>

                                        {contactDetails && (
                                            <div className="__adin_information_content_card_container">
                                                <div className="__admin_information_content_card_form">
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Telefone: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>E-mail: </span>
                                                    </div>
                                                </div>

                                                <div className="__admin_information_content_card_form_checkbox">
                                                    <input type="checkbox" name="confirmationInformation" />
                                                    <label htmlFor="confirmationInformation">Verificar se todos os dados estão corretos</label>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="__admin_information_content_card">
                                        <div className="__admin_information_content_card_title">
                                            <span className="__admin_information_content_card_title_span">
                                                Informações de endereço
                                            </span>
                                            {addressDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                                onClick={handleAddressDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleAddressDetails} />}
                                        </div>

                                        {addressDetails && (
                                            <div className="__adin_information_content_card_container">
                                                <div className="__admin_information_content_card_form">
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>CEP: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Estado: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Cidade: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Bairro: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Rua: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Número: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Complemento: </span>
                                                    </div>
                                                </div>

                                                <div className="__admin_information_content_card_form_checkbox">
                                                    <input type="checkbox" name="confirmationInformation" />
                                                    <label htmlFor="confirmationInformation">Verificar se todos os dados estão corretos</label>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                    <div className="__admin_information_content_card">
                                        <div className="__admin_information_content_card_title">
                                            <span className="__admin_information_content_card_title_span">
                                                Informações da operação
                                            </span>
                                            {transactionDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                                onClick={handleTransactionDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleTransactionDetails} />}
                                        </div>

                                        {transactionDetails && (
                                            <div className="__adin_information_content_card_container">
                                                <div className="__admin_information_content_card_form">
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Valor: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Método da operação: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Data da operação: </span>
                                                    </div>
                                                </div>

                                                <div className="__admin_information_content_card_form_checkbox">
                                                    <input type="checkbox" name="confirmationInformation" />
                                                    <label htmlFor="confirmationInformation">Verificar se todos os dados estão corretos</label>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* <div className="__admin_information_content_card">
                                        <div className="__admin_information_content_card_title">
                                            <span className="__admin_information_content_card_title_span">
                                                Documentos
                                            </span>
                                            {documentDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                                onClick={handleDocumentDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleTransactionDetails} />}
                                        </div>

                                        {documentDetails && (
                                            <div className="__adin_information_content_card_container">
                                                <div className="__admin_information_content_card_form">
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Valor: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Método da operação: </span>
                                                    </div>
                                                    <div className="__admin_information_content_card_form_content">
                                                        <span>Data da operação: </span>
                                                    </div>
                                                </div>

                                                <div className="__admin_information_content_card_form_checkbox">
                                                    <input type="checkbox" name="confirmationInformation" />
                                                    <label htmlFor="confirmationInformation">Verificar se todos os dados estão corretos</label>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}

                                </div>

                                <div className="__admin_information_content_buttons">
                                    <div className="__admin_information_content_button_back">
                                        <button onClick={handleBackButton}>Voltar</button>
                                    </div>
                                    <div className="__admin_information_content_buttons_end">
                                        <button className="__admin_information_content_button_refuse">Reprovar</button>
                                        <button className="__admin_information_content_button_approve">Aprovar</button>
                                    </div>
                                </div>
                            </div>


                            {page == 'approved' && (
                                <div className="__admin_information_account_content">
                                    <div className="__admin_information_account">
                                        <div className="__admin_information_account_title">Dados da conta</div>
                                        <div className="__admin_information_account_details">
                                            <div className="__admin_information_account_content_row">
                                                <div className="__admin_information_account_content_col">
                                                    <span className="__admin_information_account_content_name">Lucas Pontin</span>
                                                    <span className="__admin_information_account_content_title">Agência: </span>
                                                    <span className="__admin_information_account_content_title">Conta: </span>
                                                </div>
                                                <div className="__admin_information_account_content_col_space">
                                                    <span className="__admin_information_account_content_operation"><div className="operational approved"></div>Operação</span>
                                                    <span className="__admin_information_account_content_community">Starter</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {step == 2 && (
                        <div className="__admin_dashboard_compliance_status">
                            <div className="__admin_dashboard_compliance_status_content">
                                <div className="__admin_dashboard_compliance_status_content_header">
                                    <BsCheck2Circle />
                                    <span className="__admin_dashboard_compliance_status_content_header_title">Compliance Aprovado</span>
                                    <p>O compliance foi aprovado e enviado para o financeiro para que eles possam efetuar o pagamento</p>
                                </div>
                                <div className="__admin_dashboard_compliance_">
                                    <button>Finalizar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    )
}