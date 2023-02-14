import './CommunityTable.css'
import { RiListSettingsFill } from 'react-icons/ri'

export default function CommunityTable() {

    return (
        <>
        <div className='__table_scroll'><div className="__admin_dashboard_community_header_title">
            <h4 className='__admin_dashboard_community_header_title'>Comunidade</h4>
            <span className='__admin_dashboard_community_header_settings'>Filtrar <RiListSettingsFill /></span>
        </div><table className="__admin_dashboard_community_table">
                <thead className="__admin_dashboard_community_header">
                    <tr className="__admin_dashboard_community_header_tr">
                        <th>Nome</th>
                        <th>Id</th>
                        <th>Val. Comissão</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="__admin_dashboard_community_body_tr">
                        <td>Jorge Batista</td>
                        <td>22</td>
                        <td>R$ 1240,00</td>
                        <td><span className='__admin_dashboard_community_pay'>Pago</span></td>
                    </tr>
                </tbody>
            </table>
            </div></>
    )
}