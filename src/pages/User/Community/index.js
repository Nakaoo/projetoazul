import React from "react"
import { useEffect, useState } from "react"
import { BsFillPersonFill } from 'react-icons/bs'
import { useLocation } from "react-router-dom"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'
import { message } from "antd"
import './index.css'
import { RiListSettingsFill } from 'react-icons/ri'
import graphic1 from '../../../assets/img/graphic-1.svg'
import graphic2 from '../../../assets/img/graphic-2.svg'
import viewMore from '../../../assets/img/viewMore.svg'
export default function Community() {
  const location = useLocation();

  useEffect(() => {

  }, [location.search.split("=")[1]])

  return (
    <div className="__user_community_content">
      <aside className="__user_community_left">
        <div className="__admin_dashboard_cards_grid">
          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indicações</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>


          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Novas mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Todas mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card_grid">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Bônus e cashback</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>
        </div>

        <div className="__community_table">
            <div className='__table_scroll'><div className="__admin_dashboard_community_header_title">
              <h4 className='__admin_dashboard_community_header_title'>Comunidade</h4>
              <span className='__admin_dashboard_community_header_settings'>Filtrar <RiListSettingsFill /></span>
            </div><table className="__admin_dashboard_community_table">
                <thead className="__admin_dashboard_community_header">
                  <tr className="__admin_dashboard_community_header_tr">
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Cashback</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="__admin_dashboard_community_body_tr">

                  </tr>
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
            <h2>R$1,750.23</h2>
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