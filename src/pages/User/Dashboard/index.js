import React from "react"
import { useEffect, useState } from "react"
import { getPerson } from "../utils/apiFunctions"
import Afiliado from "./Pages/ChooseAffiliate"
import { useNavigate } from "react-router-dom"
import DashboardLogged from "./Pages/DashboardLogged"

export default function Dashboard() {
  const [accountType, setAccountType] = useState('')

  async function getPersonConfig() {

    let person = await getPerson()

    if (person?.data.result.purchase_active < 1) {
      setAccountType('invalido')
    } else {
      setAccountType('valido')
    }
  }

    useEffect(() => {
      getPersonConfig()
    }, [])

    return (
      <>
        {accountType === "invalido" && (
          <Afiliado />
        )}
        {accountType === "valido" && (
          <DashboardLogged />
        )}
      </>
    )
  }
