import './index.css'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useState } from 'react';

export default function Pending({ step, setStep, complianceOrders, handleNextPerson, handleNextStep, actualValue, setActualValue, handleActualValue, openedMenu }) {


    return (
        <div className='__admin_compliance'>
            <div className='__scrol'>
                <table className="__admin_compliance_table">
                    <thead className='__admin_compliance_table_thead'>
                        <tr>
                            <h4 className='__admin_compliance_title'>Todas operações pendentes</h4>
                        </tr>
                        <tr className='__admin_compliance_table_thead_tr'>
                            <th>Nome</th>
                            <th>Cpf</th>
                            <th>Tempo de Aguardo</th>
                            <th>Operação realizada</th>
                            <th>Valor da operação</th>
                            <th>Id da operação</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className='__admin_compliance_table_body'>
                        {complianceOrders?.map((val, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{val.person.first_name} {val.person.last_name}</td>
                                    <td>{val.person.doc_fiscal}</td>
                                    <td></td>
                                    <td>Compra</td>
                                    <td>R$ {val.amount}</td>
                                    <td>{val.uuid}</td>
                                    <td><button className='__admin_compliance_table_body_button' onClick={() => handleActualValue(val)}>OPÇÃO <MdKeyboardArrowDown /></button>
                                        {openedMenu == true && (
                                            <ul className='__admin_compliance_table_dropdown'>
                                                <li onClick={() => handleNextPerson(val)}>Analisar</li>
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className='__admin_compliance_table_filters'>
                    <div className='__admin_compliance_table_filter_date'>
                        <div className='__admin_compliance_table_filter_date_element'>Hoje</div>
                        <div className='__admin_compliance_table_filter_date_element'>Ontem</div>
                        <div className='__admin_compliance_table_filter_date_element'>7 dias</div>
                        <div className='__admin_compliance_table_filter_date_element'>30 dias</div>
                        <div className='__admin_compliance_table_filter_date_element'>Mês</div>
                        <input type='date' className='__admin_compliance_table_filter_date_element_input' />
                    </div>
                </div>
                <div className='__admin_compliance_table_filter_input'>
                    <div className='__admin_compliance_table_input'>
                        <label for="name">
                            Nome
                        </label>
                        <input type='text' placeholder="Pesquise por nome" />
                    </div>
                    <div className='__admin_compliance_table_input'>
                        <label for="cpf">
                            CPF
                        </label>
                        <input type='text' placeholder="Pesquise por CPF" />
                    </div>
                    <div className='__admin_compliance_table_input'>
                        <label for="cpf">
                            Número da operação
                        </label>
                        <input type='text' placeholder="Pesquise por número da transação" />
                    </div>

                    <div className='__admin_compliance_table_button'>
                        <button>Limpar filtro</button>
                    </div>
                </div>
            </div>
        </div>
    )
}