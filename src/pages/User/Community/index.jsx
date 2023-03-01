import './index.css'
import './index.scss'

// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from "react"
import { BsFillPersonFill } from 'react-icons/bs'
// import { useLocation } from "react-router-dom"
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
// import { BsCheck2Circle } from 'react-icons/bs'
// import { message } from "antd"
import { RiListSettingsFill } from 'react-icons/ri'
import graphic1 from '../../../assets/img/graphic-1.svg'
import graphic2 from '../../../assets/img/graphic-2.svg'
import viewMore from '../../../assets/img/viewMore.svg'
import { useOutletContext } from "react-router-dom"
import { getMultiNivel } from "../utils/apiFunctions"
import { formatCurrencyFront } from '../../../utils/removeMask'

const comunidade = function Community() {
  // eslint-disable-next-line
  const [accountType, people] = useOutletContext();
  // eslint-disable-next-line
  const [network, setNetword] = useState([])
  // const [setNetword, network] = useOutletContext([])


  // eslint-disable-next-line
  // const mult = await getMultiNivel();
  // setNetword(mult.data.result)

  // const [network] = useOutletContext();
  async function getNetwor() {
    const mult = await getMultiNivel();
    let data = mult.data.result;

    const trs = data.map(indic => {
      return (
        <tr className="__admin_dashboard_community_body_tr" key={indic.affiliate_id}>
          <td>{indic.name}</td>
          <td className='text-center'>{indic.email}</td>
          <td className='text-center'>{indic.phone}</td>
          <td className='text-center'>{indic.qtt}</td>
          <td className='text-center'>{indic.situacao === true ? 'Ativo' : 'Pendente'}</td>
        </tr>
      )
    })
    setNetword(trs)
  }
  // console.log('network', network);

  const callBackEffect = useCallback(async () => {
    await getNetwor();
  }, []);

  useEffect(() => {
    callBackEffect()
  }, [callBackEffect])

  // getNetwor();
  // console.log('network', network.data);

  return (
    <div className="__user_community_content">
      <aside className="__user_community_left">
        <div className="__admin_dashboard_cards_grid">
          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indicações</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value">{people?.indication?.total ? people?.indication?.total : 0}</span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value">{people?.active?.active ?? 0}</span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value">{people?.indication?.total > 0 ? people?.indication?.total - people?.active?.active : 0}</span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>


          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Novas mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value">0</span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Todas mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value">0</span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Bônus e cashback</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value">{formatCurrencyFront(people?.lockwallet?.balance)}</span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>
        </div>

        {/* {network ?? 'aff'} */}
        <div className="__community_table">
          <div className='__table_scroll'><div className="__admin_dashboard_community_header_title">
            <h4 className='__admin_dashboard_community_header_title'>Indicados</h4>
            <span className='__admin_dashboard_community_header_settings'>Filtrar <RiListSettingsFill /></span>
          </div><table className="__admin_dashboard_community_table">
              <thead className="__admin_dashboard_community_header">
                <tr className="__admin_dashboard_community_header_tr">
                  <th>Nome</th>
                  <th className='text-center'>Email</th>
                  <th className='text-center'>Telefone</th>
                  <th className='text-center'>Cashback</th>
                  <th className='text-center'>Situação</th>
                </tr>
              </thead>
              <tbody>
                {network}
              </tbody>
            </table>
          </div>
        </div>
      </aside>
      <aside className="__user_community_right">
        <div className="__cardRewards2">
          <div className="__rewards2">
            <div className="__rewardTitle">
              Recompensas
              <img src={viewMore} alt="" />
            </div>
            <h2></h2>
            <h3>Ultimos 30 dias</h3>
            <img src={graphic1} alt="" />
          </div>
          <div className="__incomeAmounts">
            Histórico de Recompensas
            <img src={graphic2} alt="" />
          </div>
        </div>
      </aside>
    </div >
  )
}

export default comunidade;