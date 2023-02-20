import React from "react"
import { useEffect, useState } from "react"
import { BsFillPersonFill } from 'react-icons/bs'
import Approved from "./Table/Approved"
import './AdminFinance.css'
import Pending from "./Table/Pending"
import { useLocation } from "react-router-dom"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'
import { approveFinancial, getFinancial } from "../utils/apiFunctions"
import { message } from "antd"

export default function AdminFinance() {
    // eslint-disable-next-line
    const [menu, setMenu] = useState(false)
    const [page, setPage] = useState('pending')
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(true)
    // eslint-disable-next-line
    const [orderNumber, setOrderNumber] = useState()
    // eslint-disable-next-line
    const [person, setPerson] = useState()
    const [personalDetails, setPersonalDetails] = useState(true)
    const [contactDetails, setContactDetails] = useState(true)
    const [addressDetails, setAddressDetails] = useState(true)
    const [transactionDetails, setTransactionDetails] = useState(true)
    const [documentDetails, setDocumentDetails] = useState(true)
    const [complianceOrders, setComplianceOrders] = useState([])
    // eslint-disable-next-line
    const [complianceOrder, setComplianceOrder] = useState([])
    const [filterds, setFilterds] = useState([])
    // eslint-disable-next-line
    const [dateSearch, setDateSearch] = useState([])
    const [approvedOrders, setApprovedOrders] = useState([])
    const [search, setSearch] = useState()
    const [actualValue, setActualValue] = useState('');
    const [openedMenu, setOpenedMenu] = useState(false);
    const location = useLocation();
    // eslint-disable-next-line
    let sum;

    useEffect(() => {
        setComplianceOrders(null)
        setLoading(true)
        setSearch()
        let actualPage = location.search.split("=")[1]
        setPage(actualPage)
        handleTableExihibition(actualPage);
    }, [location.search.split("=")[1]])

    async function handleTableExihibition(actualPage) {
        setLoading(true)
        if (actualPage === 'pending') {
            let orders = await getFinancial(1)
            let approvedOrders = await getFinancial(3)
            setComplianceOrders(orders.data.result)
            setApprovedOrders(approvedOrders.data.result)
        }
        else if (actualPage === 'approved') {
            let orders = await getFinancial(3)
            setComplianceOrders(orders.data.result)
        }
        setLoading(false)
    }

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

    // eslint-disable-next-line
    function handleDocumentDetails() {
        if (documentDetails) {
            setDocumentDetails(false)
        } else {
            setDocumentDetails(true)
        }
    }

    function handleBackButton() {
        setActualValue(null)
        setStep(0)
    }

    // eslint-disable-next-line
    function handleRefuseButton() {

    }

    function handleSearchName(e) {

        setSearch(e)
        let array = []

        complianceOrders.filter((item) => {
            if (item?.person?.first_name.toLowerCase().includes(search.toLowerCase())) {
                array.push(item)
            }
        });


        setFilterds(array)

        if (!search)
            setFilterds([])
    }


    function handleSearchCpf(e) {

        setSearch(e)
        let array = []

        complianceOrders.filter((item) => {
            if (item?.person?.doc_fiscal.toLowerCase().includes(search.toLowerCase())) {
                array.push(item)
            }
        });


        setFilterds(array)

        if (!search)
            setFilterds([])
    }

    // function handleSearchCpf(e) {

    //     setSearch(e)
    //     let array = []

    //     complianceOrders.filter((item) => {
    //         if (item?.person?.doc_fiscal.toLowerCase().includes(search.toLowerCase())) {
    //             array.push(item)
    //         }
    //     });


    //     setFilterds(array)

    //     if (!search)
    //         setFilterds([])
    // }

    function handleSearchOrder(e) {

        setSearch(e)
        let array = []

        complianceOrders.filter((item) => {
            if (item?.uuid.toLowerCase().includes(search.toLowerCase())) {
                array.push(item)
            }
        });


        setFilterds(array)

        if (!search)
            setFilterds([])
    }

    function clearFilter() {
        setFilterds([])
        setSearch()
    }

    async function handleAcceptButton() {
        setLoading(true)
        let order = await approveFinancial(actualValue?.uuid)


        if (order.status === 200) {
            setStep(2)
        } else {
            message.error("Houve um erro no pagamento.")
        }

        setLoading(false)
    }

    // eslint-disable-next-line
    function handleEditButton() {

    }

    function handleNextPerson(person) {
        setComplianceOrder(person)
        setActualValue(person)
        setStep(1)
    }

    function handleActualValue(val) {
        if (actualValue?.uuid !== val?.uuid) {
            setActualValue(val)
            setOpenedMenu(true)
        }
        else if (actualValue.uuid === val.uuid) {
            setOpenedMenu(false)
            setActualValue()
        } else if (actualValue.length <= 0) {
            setOpenedMenu(true)
            setActualValue(val)
        }
        else {
            setActualValue(val)
            setOpenedMenu(true)
        }
    }
    return (

        <div className="__admin_dashboard_content">
            {step === 0 && (
                <><div className="__admin_dashboard_cards">
                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Solicitações abertas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">{complianceOrders?.length}</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                    </div>

                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Solicitações concluídas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">{approvedOrders?.length}</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                    </div>

                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Valor pendente</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value"></span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
                    </div>
                </div><div className="__admin_compliance_table_">
                        <div className="__admin_compliance_table">
                            {page === 'approved' && (
                                <Approved
                                    complianceOrders={complianceOrders}
                                    handleNextPerson={handleNextPerson}
                                    handleActualValue={handleActualValue}
                                    openedMenu={openedMenu}
                                    loading={loading}
                                    actualValue={actualValue}
                                    filterds={filterds}
                                    handleSearchName={handleSearchName}
                                    handleSearchCpf={handleSearchCpf}
                                    handleSearchOrder={handleSearchOrder}
                                    clearFilter={clearFilter}
                                    search={search}
                                />
                            )}
                            {page === 'pending' && (
                                <Pending
                                    complianceOrders={complianceOrders}
                                    handleNextPerson={handleNextPerson}
                                    handleActualValue={handleActualValue}
                                    openedMenu={openedMenu}
                                    loading={loading}
                                    actualValue={actualValue}
                                    filterds={filterds}
                                    handleSearchName={handleSearchName}
                                    handleSearchCpf={handleSearchCpf}
                                    handleSearchOrder={handleSearchOrder}
                                    clearFilter={clearFilter}
                                    search={search}
                                />
                            )}
                        </div>
                    </div></>
            )}
            {step === 1 && (
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
                                                <span>Nome Completo: {actualValue.person.first_name} {actualValue.person.last_name}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Data de Nascimento: {actualValue.person.birhtdate}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Estado Civil: </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>CPF: {actualValue.person.doc_fiscal}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Sexo: {actualValue.person.sex}</span>
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
                                                <span>Telefone: {actualValue.person.celular1}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>E-mail:  {actualValue.person.email}</span>
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
                                                <span>CEP: {actualValue.person.postcode}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Estado: {actualValue.person.state}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Cidade: {actualValue.person.city} </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Bairro: {actualValue.person.neighborhood}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Rua: {actualValue.person.address_1}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Número: {actualValue.person.number}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Complemento: {actualValue.person.complement}</span>
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
                                                <span>Valor: {actualValue.amount}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Tarifa: {actualValue.fee} </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Subtotal: R$ {actualValue.total} </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Método da operação: Saque </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Data da operação: {actualValue.created_at} </span>
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
                                {page === 'pending' && (
                                    <><button className="__admin_information_content_button_refuse">Reprovar</button><button className="__admin_information_content_button_approve" onClick={() => handleAcceptButton(actualValue.uuid)}>Aprovar</button></>
                                )}
                                {page === 'approved' && (
                                    <><button className="__admin_information_content_button_edit">Editar</button></>
                                )}
                                {page === 'refused' && (
                                    <><button className="__admin_information_content_button_approve" onClick={() => handleAcceptButton(actualValue.uuid)}>Aprovar</button></>
                                )}
                            </div>
                        </div>
                    </div>


                    {page === 'approved' && (
                        <div className="__admin_information_account_content">
                            <div className="__admin_information_account">
                                <div className="__admin_information_account_title">Dados da conta</div>
                                <div className="__admin_information_account_details">
                                    <div className="__admin_information_account_content_row">
                                        <div className="__admin_information_account_content_col">
                                            <span className="__admin_information_account_content_name">{actualValue.name}</span>
                                            <span className="__admin_information_account_content_title">Agência: 001</span>
                                            <span className="__admin_information_account_content_title">Conta: </span>
                                        </div>
                                        <div className="__admin_information_account_content_col_space">
                                            <span className="__admin_information_account_content_operation"><div className="operational approved"></div>Operação</span>
                                            <span className="__admin_information_account_content_community">Energy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {step === 2 && (
                <div className="__admin_dashboard_compliance_status">
                    <div className="__admin_dashboard_compliance_status_content">
                        <div className="__admin_dashboard_compliance_status_content_header">
                            <BsCheck2Circle />
                            <span className="__admin_dashboard_compliance_status_content_header_title">Saque Aprovado</span>
                            <p>Pedido finalizado</p>
                        </div>
                        <div className="__admin_dashboard_compliance_">
                            <button onClick={handleBackButton}>Finalizar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}