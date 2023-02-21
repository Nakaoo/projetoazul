import React from "react"
// eslint-disable-next-line
import { useEffect, useState } from "react"
import '../index.css'
import Card from "../Card/Card"
import Resumo from "../Card/Resumo"
import HistoricRewards from "../Table/HistoricRewards"
import './DashboardLogged.css'
import { useOutletContext } from "react-router-dom"

export default function DashboardLogged() {
  // eslint-disable-next-line
  const [accountType, people] = useOutletContext();

  return (
    <div className="__contentDashBoard">
      <div className="__card">
        <div className="__cardCommunity">
          <Card pessoa={people} />
        </div>

        <div className="__cardHistoric">
          <HistoricRewards />
        </div>
      </div>
      <div className="__card">
        <Resumo pessoa={people} />
      </div>
    </div>
  )
}