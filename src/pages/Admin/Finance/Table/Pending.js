import './index.css'
import { MdKeyboardArrowDown } from 'react-icons/md'
// eslint-disable-next-line
import { useEffect, useState } from 'react';
// eslint-disable-next-line
import DatePicker, { registerLocale } from "react-datepicker";
import { cpfToFront } from '../../../../utils/removeMask';
import SkeletonTable from '../../../../components/Skeleton/SkeletonTable';

export default function Pending({
    search,
    filterds,
    handleSearchName,
    handleSearchCpf,
    handleSearchOrder,
    clearFilter,
    loading,
    complianceOrders,
    handleNextPerson,
    actualValue,
    handleActualValue,
    openedMenu }) {

    return (
        <div className='__admin_compliance'>
            <div className='__scrol'>
                <table className="__admin_compliance_table">
                    <thead className='__admin_compliance_table_thead'>
                        <tr>
                            <h4 className='__admin_compliance_title'>Solicitações de saques pendente</h4>
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

                        {filterds.length <= 0 && !search ?
                            (
                                complianceOrders?.map((val, index) => {
                                    return (
                                        <>
                                            {loading ? (
                                                <SkeletonTable />
                                            ) : (
                                                <tr key={index + 1}>
                                                    <td>{val.person.first_name} {val.person.last_name}</td>
                                                    <td>{cpfToFront(val.person.doc_fiscal)}</td>
                                                    <td></td>
                                                    <td>Saque</td>
                                                    <td>R$ {val.amount}</td>
                                                    <td>{val.uuid}</td>
                                                    <td><button className='__admin_compliance_table_body_button' onClick={() => handleActualValue(val)}>OPÇÃO <MdKeyboardArrowDown /></button>
                                                        {openedMenu === true && actualValue?.uuid === val?.uuid && (
                                                            <ul className='__admin_compliance_table_dropdown'>
                                                                <li onClick={() => handleNextPerson(val)}>Analisar</li>
                                                            </ul>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                            }
                                        </>
                                    )
                                })
                            ) :
                            (
                                filterds?.map((val, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>{val.person.first_name} {val.person.last_name}</td>
                                            <td>{cpfToFront(val.person.doc_fiscal)}</td>
                                            <td></td>
                                            <td>Compra</td>
                                            <td>R$ {val.amount}</td>
                                            <td>{val.uuid}</td>
                                            <td><button className='__admin_compliance_table_body_button' onClick={() => handleActualValue(val)}>OPÇÃO <MdKeyboardArrowDown /></button>
                                                {openedMenu === true && actualValue?.uuid === val?.uuid && (
                                                    <ul className='__admin_compliance_table_dropdown'>
                                                        <li onClick={() => handleNextPerson(val)}>Analisar</li>
                                                    </ul>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        }
                    </tbody>
                </table>

                <div className='__admin_compliance_table_filters'>
                    <div className='__admin_compliance_table_filter_date'>
                        <div className='__admin_compliance_table_filter_date_element'>Hoje</div>
                        <div className='__admin_compliance_table_filter_date_element'>Ontem</div>
                        <div className='__admin_compliance_table_filter_date_element'>7 dias</div>
                        <div className='__admin_compliance_table_filter_date_element'>30 dias</div>
                        <div className='__admin_compliance_table_filter_date_element'>Mês</div>
                        <DatePicker
                            className={'__admin_compliance_table_filter_date_element_input'}
                            onChange={(date) => {
                                // onChange && onChange(date);
                                // field.onChange(date);
                            }}
                            //   selected={field.value}
                            dateFormat="dd/MM/yyyy"
                            placeholderText='dd/mm/yyyy'
                            locale="pt-BR"
                        //   ref={ref}
                        //   onKeyDown={onKeyDown}
                        //   autoFocus={auto}
                        //   {...restProps}
                        />
                    </div>
                </div>
                <div className='__admin_compliance_table_filter_input'>
                    <div className='__admin_compliance_table_input'>
                        <label for="name">
                            Nome
                        </label>
                        <input type='text' placeholder="Pesquise por nome" onChange={(e) => handleSearchName(e.target.value)} />
                    </div>
                    <div className='__admin_compliance_table_input'>
                        <label for="cpf">
                            CPF
                        </label>
                        <input type='text' placeholder="Pesquise por CPF" onChange={(e) => handleSearchCpf(e.target.value)} />
                    </div>
                    <div className='__admin_compliance_table_input'>
                        <label for="cpf">
                            Número da operação
                        </label>
                        <input type='text' placeholder="Pesquise por número da transação" onChange={(e) => handleSearchOrder(e.target.value)} />
                    </div>

                    <div className='__admin_compliance_table_button'>
                        <button type="button" onClick={() => clearFilter()}>Limpar filtro</button>
                    </div>
                </div>
            </div>
        </div >
    )
}