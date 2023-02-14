
export default function SolicitacoesTable() {
    return (
        <div className='__admin_compliance'>
            <div className='__scrol'>
                <table className="__admin_compliance_table">
                    <thead className='__admin_compliance_table_thead'>
                        <tr>
                            <h4 className='__admin_compliance_title'>Todas operações aprovadas</h4>
                        </tr>
                        <tr className='__admin_compliance_table_thead_tr'>
                            <th>Solicitação</th>
                            <th>Meio de pagamento</th>
                            <th>Nº Operação</th>
                            <th>Valor</th>
                            <th>Situação</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody className='__admin_compliance_table_body'>
                        {/* {filterds.length <= 0 && !search ?
                        (
                            complianceOrders?.map((val, index) => {
                                return (
                                    <tr key={index + 1}>
                                        <td>{val.person.first_name} {val.person.last_name}</td>
                                        <td>{cpfToFront(val.person.doc_fiscal)}</td>
                                        <td></td>
                                        <td>Compra</td>
                                        <td>R$ {val.amount}</td>
                                        <td>{val.uuid}</td>
                                        <td><button className='__admin_compliance_table_body_button' onClick={() => handleActualValue(val)}>OPÇÃO <MdKeyboardArrowDown /></button>
                                            {openedMenu == true && actualValue?.uuid == val?.uuid && (
                                                <ul className='__admin_compliance_table_dropdown'>
                                                    <li onClick={() => handleNextPerson(val)}>Analisar</li>
                                                </ul>
                                            )}
                                        </td>
                                    </tr>
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
                                            {openedMenu == true && actualValue?.uuid == val?.uuid && (
                                                <ul className='__admin_compliance_table_dropdown'>
                                                    <li onClick={() => handleNextPerson(val)}>Analisar</li>
                                                </ul>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    } */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
