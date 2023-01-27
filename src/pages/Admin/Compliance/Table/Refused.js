import './index.css'
import {MdKeyboardArrowDown} from 'react-icons/md'

export default function Refused() {

    return (
        <div className='__admin_compliance'>
            <table className="__admin_compliance_table">
                <thead className='__admin_compliance_table_thead'>
                    <tr>
                    <h4 className='__admin_compliance_title'>Todas operações recusadas</h4>
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
                    <tr>
                        <td>Fulano de Tal</td>
                        <td>XXX.XXX.XXX-XX</td>
                        <td>14 horas</td>
                        <td>Saque</td>
                        <td>150 R$</td>
                        <td>3343</td>
                        <td><button className='__admin_compliance_table_body_button'>OPÇÃO <MdKeyboardArrowDown /></button>
                            <ul className='__admin_compliance_table_dropdown'>
                                <li>Analisar</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='__admin_compliance_table_filters'>
                <div className='__admin_compliance_table_filter_date'>
                    <div className='__admin_compliance_table_filter_date_element'>Hoje</div>
                    <div className='__admin_compliance_table_filter_date_element'>Ontem</div>
                    <div className='__admin_compliance_table_filter_date_element'>7 dias</div>
                    <div className='__admin_compliance_table_filter_date_element'>30 dias</div>
                    <div className='__admin_compliance_table_filter_date_element'>Mês</div>
                    <input type='date' className='__admin_compliance_table_filter_date_element_input'/>
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
    )
}