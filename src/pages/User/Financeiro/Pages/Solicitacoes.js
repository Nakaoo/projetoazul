import './Solicitacoes.css'
// eslint-disable-next-line
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
// eslint-disable-next-line
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { globalImg } from "../../../../utils/globalImg";
import { dateToFront } from "../../../../utils/removeMask";

// eslint-disable-next-line
export default function Solicitacoes({ setStep, openedMenu, actualValue, step, filterds, withdrawals, withdraw, handleActualValue, handleNextPerson, handleSearchOrder }) {
  let logo = globalImg.logo;
  let logoBlack = globalImg.logo_black;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {step === 0 ? (
        <><input placeholder="Digite aqui para procurar" onChange={(e) => handleSearchOrder(e.target.value)} className="input_search" /><div className='__admin_compliance'>
          <div className='__scrol'>
            <table className="__admin_compliance_table">
              <thead className='__admin_compliance_table_thead'>
                <tr>
                  <h4 className='__admin_compliance_title'>Histórico de saque</h4>
                </tr>
                <tr className='__admin_compliance_table_thead_tr'>
                  <th>Solicitação</th>
                  <th>Meio de pagamento</th>
                  <th>Nº Operação</th>
                  <th>Id operação</th>
                  <th>Valor</th>
                  <th>Situação</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody className='__admin_compliance_table_body'>
                {filterds.length <= 0 ?
                  (
                    withdrawals?.map((val, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>Saque</td>
                          <td>Via {!val.pix ? "TED" : "PIX"}</td>
                          <td>{val.id}</td>
                          <td>{val.uuid}</td>
                          <td>R$ {val.amount}</td>
                          <td>{!val.user_aprovation_id ? "Pendente" : "Aprovado"}</td>
                          <td><button className='__admin_compliance_table_body_button' onClick={() => handleActualValue(val)}>OPÇÃO <MdKeyboardArrowDown /></button>
                            {openedMenu === true && actualValue?.uuid === val?.uuid && (
                              <ul className='__admin_compliance_table_dropdown'>
                                <li onClick={() => handleNextPerson(val)}>Analisar</li>
                              </ul>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) :
                  (
                    filterds?.map((val, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>Saque</td>
                          <td>{!val.pix ? "TED" : "PIX"}</td>
                          <td>{val.id}</td>
                          <td>{val.uuid}</td>
                          <td>R$ {val.amount}</td>
                          <td>{!val.user_aprovation_id ? "Pendente" : "Aprovado"}</td>
                          <td><button className='__admin_compliance_table_body_button' onClick={() => handleActualValue(val)}>OPÇÃO <MdKeyboardArrowDown /></button>
                            {openedMenu === true && actualValue?.uuid === val?.uuid && (
                              <ul className='__admin_compliance_table_dropdown'>
                                <li onClick={() => handleNextPerson(val)}>Analisar</li>
                              </ul>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
              </tbody>
            </table>
          </div>
        </div></>
      ) : (
        <><div className="__withdraw_form_all"><div className="__withdraw_form_content" ref={componentRef}>
          <div className="__withdraw_form_header">
            <div className="__withdraw_print_logo">
              <img src={logo} className="logo_white" alt="Logo" />
              <img src={logoBlack} className="logo_black" alt="LogoBlack" />
            </div>
            <div className="__withdraw_form_header_title">
              <div className="__withdraw_form_header_bar"></div>Comprovante da Solicitação
            </div>
          </div>
          <div className="__withdraw_form_body">
            <h3>Informações da solicitação</h3>
            {actualValue.key_pix ? (
              <><div className="__withdraw_form_body_information">
                <p>Valor</p>
                <span>R$ {actualValue.amount}</span>
              </div><div className="__withdraw_form_body_information">
                  <p>Tipo</p>
                  <span>PIX</span>
                </div><div className="__withdraw_form_body_information">
                  <p>Tipo de Chave</p>
                  <span></span>
                </div><div className="__withdraw_form_body_information">
                  <p>Chave</p>
                  <span>{actualValue.key_pix}</span>
                </div><div className="__withdraw_form_body_information">
                  <p>Operação</p>
                  <span>{actualValue.id}</span>
                </div><div className="__withdraw_form_body_information">
                  <p>Data</p>
                  <span>{dateToFront(actualValue.created_at)}</span>
                </div></>
            ) : (
              <>
                <div className="__withdraw_form_body_information">
                  <p>Valor</p>
                  <span>R$ {actualValue.amount}</span>
                </div>
                <div className="__withdraw_form_body_information">
                  <p>Tipo</p>
                  <span>TED</span>
                </div><div className="__withdraw_form_body_information">
                  <p>Banco</p>
                  <span>{actualValue.bank}</span>
                </div><div className="__withdraw_form_body_information">
                  <p>Agência</p>
                  <span>{actualValue.agency}</span>
                </div>
                <div className="__withdraw_form_body_information">
                  <p>Conta (com dígito)</p>
                  <span>{actualValue.account}</span>
                </div>
                <div className="__withdraw_form_body_information">
                  <p>Operação</p>
                  <span>{actualValue.id}</span>
                </div>
                <div className="__withdraw_form_body_information">
                  <p>Data</p>
                  <span>{dateToFront(actualValue.created_at)}</span>
                </div></>
            )}
            <div className="withdraw_form_print">
              <center><h5>Autentificação</h5></center>
              {actualValue.uuid}
            </div>
          </div>
        </div><div className="__withdraw_form_buttons_2">
            <button className="__withdraw_form_button_secondary" onClick={() => setStep(0)}>Voltar</button>
            <button className="__withdraw_form_button_primary" type="button" onClick={handlePrint}>Imprimir</button>
          </div>
        </div></>
      )}
    </>
  )
}
