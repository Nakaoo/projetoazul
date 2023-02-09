import React from "react"
import { useEffect, useState } from "react"
import { BsFillPersonFill } from 'react-icons/bs'
import { useLocation } from "react-router-dom"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { BsCheck2Circle } from 'react-icons/bs'
import { message } from "antd"
import './index.css'

export default function Community() {
  const location = useLocation();

  useEffect(() => {

  }, [location.search.split("=")[1]])

  return (
    <div className="__user_community_content">
      <aside className="__user_community_left">
        <div className="__admin_dashboard_cards">
          <div className="__admin_dashboard_card">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Total de indicações</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações aprovadas</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__admin_dashboard_card">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Indicações pendentes</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>


          <div className="__admin_dashboard_card">
            <div className="__admin_dashboard_card_addon"><p className="__admin_dashboard_card_addon_title">Mensagens</p><span className="__admin_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__admin_dashboard_card_value"></span>
            <div className="__admin_dashboard_last_addon"><span className="__admin_dashboard_last_addon_percentage"></span><span className="__admin_dashboard_card_explanation">que o mês passado</span></div>
          </div>
        </div>
      </aside>
      <aside className="__user_community_right">
        <div className="__user_community_right_graphic1">

        </div>
        <div className="__user_community_right_graphic2">

        </div>
      </aside>
    </div >
  )
}