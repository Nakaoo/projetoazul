import { useRef } from "react";
import './Proof.css'
import './SucessfulWithdrawal.css'
import { useReactToPrint } from "react-to-print";
import { globalImg } from '../../../../utils/globalImg';
import { dateToFront } from "../../../../utils/removeMask";

export default function SucessfulWithdrawal({ watch, idOperacao, confirmPage, setConfirmPage, uuid }) {
    let dateWithdrawal = new Date().toISOString().substring(0, 10);
    let logo = globalImg.logo;
    let logoBlack = globalImg.logo_black;

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <><div className="__withdraw_form_content" ref={componentRef}>
            <div className="__withdraw_form_header">
                <div className="__withdraw_print_logo">
                    <img src={logo} className="logo_white" alt="Logo normal ESGTECH" />
                    <img src={logoBlack} className="logo_black" alt="Logo monocromático ESGTECH" />
                </div>
                <div className="__withdraw_form_header_title">
                    <div className="__withdraw_form_header_bar"></div>Comprovante da Solicitação
                </div>
            </div>
            <div className="__withdraw_form_body">
                <h3>Informações da solicitação</h3>

                {watch('withdrawWay') === "PIX" ? (
                    <><div className="__withdraw_form_body_information">
                        <p>Valor</p>
                        <span>{`${watch('amount')}`}</span>
                    </div><div className="__withdraw_form_body_information">
                            <p>Tipo</p>
                            <span>{watch('withdrawWay')}</span>
                        </div><div className="__withdraw_form_body_information">
                            <p>Tipo de Chave</p>
                            <span></span>
                        </div><div className="__withdraw_form_body_information">
                            <p>Chave</p>
                            <span>{watch('keyPix')}</span>
                        </div><div className="__withdraw_form_body_information">
                            <p>Operação</p>
                            <span>{idOperacao}</span>
                        </div><div className="__withdraw_form_body_information">
                            <p>Data</p>
                            <span>{dateWithdrawal}</span>
                        </div>
                        <div className="__observation">OBS: A solicitação poderá levar até 7 dias úteis</div>
                        </>
                ) : (
                    <>
                        <div className="__withdraw_form_body_information">
                            <p>Valor</p>
                            <span>{`${watch('amount')}`}</span>
                        </div>
                        <div className="__withdraw_form_body_information">
                            <p>Tipo</p>
                            <span>{watch('withdrawWay')}</span>
                        </div><div className="__withdraw_form_body_information">
                            <p>Banco</p>
                            <span>{watch('bank')}</span>
                        </div><div className="__withdraw_form_body_information">
                            <p>Agência</p>
                            <span>{watch('agency')}</span>
                        </div>
                        <div className="__withdraw_form_body_information">
                            <p>Conta (com dígito)</p>
                            <span>{watch('account')}</span>
                        </div>
                        <div className="__withdraw_form_body_information">
                            <p>Operação</p>
                            <span>{idOperacao}</span>
                        </div>
                        <div className="__withdraw_form_body_information">
                            <p>Data</p>
                            <span>{dateToFront(dateWithdrawal)}</span>
                        </div>
                        <div className="__observation">OBS: A solicitação poderá levar até 7 dias úteis</div>
                        </>
                )}

            </div>

            <div className="withdraw_form_print">
                <center><h5>Autentificação</h5></center>
                {uuid}
            </div>

        </div><div className="__withdraw_form_buttons">
                <button className="__withdraw_form_button_secondary" onClick={() => setConfirmPage(false)}>Voltar</button>
                <button className="__withdraw_form_button_primary" type="button" onClick={handlePrint}>Imprimir</button>
            </div></>
    )
}