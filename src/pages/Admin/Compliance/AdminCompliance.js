import React from "react"
import { useEffect, useState } from "react"
import { BsFillPersonFill } from 'react-icons/bs'
import Approved from "./Table/Approved"
import './AdminCompliance.css'
import Pending from "./Table/Pending"
import Refused from "./Table/Refused"
import { useLocation } from "react-router-dom"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'
import { approveOrder, getOrderDetails, getOrders, refusalOrder } from "../utils/apiFunctions"
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd"
import { useOutletContext } from "react-router-dom"

export default function AdminCompliance() {
    const [page, setPage] = useState('pending')
    const [step, setStep] = useState(2)
    const [loading, setLoading] = useState(true)
    const [personalDetails, setPersonalDetails] = useState(true)
    const [contactDetails, setContactDetails] = useState(true)
    const [addressDetails, setAddressDetails] = useState(true)
    const [transactionDetails, setTransactionDetails] = useState(true)
    const [documentDetails, setDocumentDetails] = useState(true)
    const [complianceOrders, setComplianceOrders] = useState([])
    const [complianceOrder, setComplianceOrder] = useState([])
    const [filterds, setFilterds] = useState([])
    const [dateSearch, setDateSearch] = useState([])
    const [search, setSearch] = useState()
    const [actualValue, setActualValue] = useState('');
    const [openedMenu, setOpenedMenu] = useState(false);
    const [complianceStatus, setComplianceStatus] = useState();
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [approvedPage, setApprovedPage] = useState(true);
    const [people] = useOutletContext()
    const location = useLocation();

    useEffect(() => {
        setComplianceOrders(null)
        setLoading(true)
        setSearch()
        setStep(0)
        let actualPage = location.search.split("=")[1]
        setPage(actualPage)
        handleTableExihibition(actualPage);
    }, [location.search.split("=")[1]])

    async function handleTableExihibition(actualPage) {
        setLoading(true)
        if (actualPage === 'pending') {
            let orders = await getOrders(3)
            console.log(orders.data.result)
            setComplianceOrders(orders.data.result)
        }
        else if (actualPage === 'approved') {
            let orders = await getOrders(6)
            setComplianceOrders(orders.data.result)
        }
        else if (actualPage === 'refused') {
            let orders = await getOrders(2)
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
        setComplianceStatus()
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

    async function handleRefusalButton() {
        let order = await refusalOrder(actualValue?.uuid)

        if (order?.status === 200) {
            setStep(2)
            setApprovedPage(false)
            message.success("Pedido rejeitado com sucesso")
        } else {
            message.error("Houve um erro no pagamento.")
        }

        setLoading(false)
    }

    async function handleAcceptButton() {
        setLoading(true)
        let order = await approveOrder(actualValue?.uuid)

        console.log(order)

        if (order?.status === 200) {
            setStep(2)
            setApprovedPage(true)
            message.success("Pedido aprovado com sucesso")
        } else {
            message.error("Houve um erro no pagamento.")
        }

        setLoading(false)
    }

    // eslint-disable-next-line
    function handleEditButton() {

    }

    // async function handleAcceptButton(){
    //     setLoading(true)

    //     try{
    //         // eslint-disable-next-line
    //         let order = await approveOrder(actualValue.uuid)

    //         message.success("Pedido aprovado com sucesso")
    //         setStep(2)
    //         setLoading(false)
    //     }catch(err){
    //         message.error(err)
    //         setLoading(false)
    //     }
    // }

    async function handleNextPerson(person) {
        setLoadingOrder(true)

        try {
            document.body.style.cursor = 'wait'

            let order = await getOrderDetails(person.uuid)

            setComplianceOrder(order.data.result[0])
            setActualValue(order.data.result[0])
            setStep(1)
            setLoadingOrder(false)

            document.body.style.cursor = 'auto'
        } catch (err) {
            message.error("Erro ao carregar. Tente novamente mais tarde")
            console.log(err)
            setLoadingOrder(false)
            document.body.style.cursor = 'auto'
        }
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
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indica????es</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">{people?.active[0]?.count + people?.active[1]?.count}</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o m??s passado</span></div>
                    </div>

                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indica????es aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">{people?.active[0]?.count}</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o m??s passado</span></div>
                    </div>

                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indica????es pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">{people?.active[1]?.count}</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o m??s passado</span></div>
                    </div>


                    <div className="__admin_dashboard_card">
                        <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
                        <span className="__admin_dashboard_card_value">0</span>
                        <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o m??s passado</span></div>
                    </div>
                </div><div className="__admin_compliance_table_">
                        <div className="__admin_compliance_table">
                            {page === 'approved' && step === 0 && (
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
                            {page === 'pending' && step === 0 && (
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
                            {page === 'refused' && step === 0 && (
                                <Refused
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
                                        Informa????es pessoais
                                    </span>
                                    {personalDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                        onClick={handlePersonalDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handlePersonalDetails} />}
                                </div>

                                {personalDetails && (
                                    <div className="__adin_information_content_card_container">
                                        <div className="__admin_information_content_card_form">
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Nome Completo: {actualValue?.person?.first_name} {actualValue?.person?.last_name}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Data de Nascimento: {actualValue.person?.birhtdate}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Estado Civil: </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>CPF: {actualValue?.person?.doc_fiscal}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Sexo: {actualValue?.person?.sex}</span>
                                            </div>
                                        </div>

                                    </div>
                                )}

                            </div>

                            <div className="__admin_information_content_card">
                                <div className="__admin_information_content_card_title">
                                    <span className="__admin_information_content_card_title_span">
                                        Informa????es de contato
                                    </span>
                                    {contactDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                        onClick={handleContactDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleContactDetails} />}
                                </div>

                                {contactDetails && (
                                    <div className="__adin_information_content_card_container">
                                        <div className="__admin_information_content_card_form">
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Telefone: {actualValue?.person?.celular1}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>E-mail:  {actualValue?.person?.email}</span>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>

                            <div className="__admin_information_content_card">
                                <div className="__admin_information_content_card_title">
                                    <span className="__admin_information_content_card_title_span">
                                        Informa????es de endere??o
                                    </span>
                                    {addressDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                        onClick={handleAddressDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleAddressDetails} />}
                                </div>

                                {addressDetails && (
                                    <div className="__adin_information_content_card_container">
                                        <div className="__admin_information_content_card_form">
                                            <div className="__admin_information_content_card_form_content">
                                                <span>CEP: {actualValue?.person?.postcode}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Estado: {actualValue?.person?.state}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Cidade: {actualValue?.person?.city} </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Bairro: {actualValue?.person?.neighborhood}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Rua: {actualValue?.person?.address_1}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>N??mero: {actualValue?.person?.number}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Complemento: {actualValue?.person?.complement}</span>
                                            </div>
                                        </div>


                                    </div>
                                )}
                            </div>


                            <div className="__admin_information_content_card">
                                <div className="__admin_information_content_card_title">
                                    <span className="__admin_information_content_card_title_span">
                                        Informa????es da opera????o
                                    </span>
                                    {transactionDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                        onClick={handleTransactionDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleTransactionDetails} />}
                                </div>

                                {transactionDetails && (
                                    <div className="__adin_information_content_card_container">
                                        <div className="__admin_information_content_card_form">
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Valor: {actualValue?.amount}</span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>M??todo da opera????o: Pix </span>
                                            </div>
                                            <div className="__admin_information_content_card_form_content">
                                                <span>Data da opera????o: {actualValue?.created_at} </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="__admin_information_content_card">
                                <div className="__admin_information_content_card_title">
                                    <span className="__admin_information_content_card_title_span">
                                        Comprovante de Pagamento
                                    </span>
                                    {documentDetails ? <MdKeyboardArrowUp className="__admin_information_content_card_title_icon"
                                        onClick={handleDocumentDetails} /> : <MdKeyboardArrowDown className="__admin_information_content_card_title_icon" onClick={handleTransactionDetails} />}
                                </div>

                                {documentDetails && (
                                    <div className="__adin_information_content_card_container">
                                        <div className="__admin_information_content_card_form_img">
                                            <a href={actualValue?.payment?.proof} target="_blank"><embed src={actualValue?.payment?.proof} target="__blank" /></a>
                                            <div className="__admin_information_content_card_form_buttons">
                                                <button className="__admin_information_content_card_form_buttons_refusal">Reprovar</button>
                                                <button className="__admin_information_content_card_form_buttons_approve">Aprovar</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="__admin_information_content_buttons">
                            <div className="__admin_information_content_button_back">
                                <button onClick={handleBackButton}>Voltar</button>
                            </div>
                            <div className="__admin_information_content_buttons_end">
                                {page === 'pending' && (
                                    <>{loading ? <LoadingOutlined /> : <><button className="__admin_information_content_button_refuse" onClick={() => handleRefusalButton(actualValue?.uuid)}>Reprovar</button><button className="__admin_information_content_button_approve" onClick={() => handleAcceptButton(actualValue.uuid)}>Aprovar</button></>}</>
                                )}
                                {page === 'approved' && (
                                    <>{loading ? <LoadingOutlined /> : <button className="__admin_information_content_button_edit">Editar</button>}</>
                                )}
                                {page === 'refused' && (
                                    <>{loading ? <LoadingOutlined /> : <button className="__admin_information_content_button_approve" onClick={() => handleAcceptButton(actualValue?.uuid)}>Aprovar</button>}</>
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
                                            <span className="__admin_information_account_content_title">Ag??ncia: 001</span>
                                            <span className="__admin_information_account_content_title">Conta: </span>
                                        </div>
                                        <div className="__admin_information_account_content_col_space">
                                            <span className="__admin_information_account_content_operation"><div className="operational approved"></div>Opera????o</span>
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
                <>
                    {approvedPage ? (
                        <div className="__admin_dashboard_compliance_status">
                            <div className="__admin_dashboard_compliance_status_content">
                                <div className="__admin_dashboard_compliance_status_content_header">
                                    <BsCheck2Circle className="__adm_dashboard_compliance_status_icon" size={62} />
                                    <span className="__admin_dashboard_compliance_status_content_header_title">Compliance Aprovado</span>
                                </div>
                                <div className="__admin_dashboard_compliance_">
                                    <button onClick={() => handleBackButton()}>Finalizar</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="__admin_dashboard_compliance_status">
                            <div className="__admin_dashboard_compliance_status_content">
                                <div className="__admin_dashboard_compliance_status_content_header">
                                    <BsCheck2Circle className="__adm_dashboard_compliance_status_icon" size={62} />
                                    <span className="__admin_dashboard_compliance_status_content_header_title">Compliance Rejeitado</span>
                                </div>
                                {/* <div className="__admin_dashboard_compliance_status_content_body">
                            <p>O compliance foi aprovado e enviado para o financeiro para que eles possam efetuar o pagamento</p>
                        </div> */}
                                <div className="__admin_dashboard_compliance_">
                                    <button onClick={() => handleBackButton()}>Finalizar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}