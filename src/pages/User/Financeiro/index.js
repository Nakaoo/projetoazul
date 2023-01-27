import React, { useState, useEffect } from "react"
import Financeiro from "../Financeiro/Pages/index"
import { getPerson } from "../utils/apiFunctions"

  export default function FinanceiroVerify(){
    const [accountType, setAccountType] = useState('')
    const [menu, setMenu] = useState(false)

    async function getPersonConfig() {

  let person = await getPerson()

  if (person?.data.result.purchase_active < 1) {
    setAccountType('invalido')
    setMenu(false)
  } else {
    setAccountType('valido')
    setMenu(true)
  }
}

  useEffect(() => {
    getPersonConfig()
  }, [])

    return (
    <>
    {accountType === "valido" && (
      <Financeiro menu={menu}/>
    )}
  </>
    )
  }