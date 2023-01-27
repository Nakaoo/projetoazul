import React, { useState, useEffect } from "react"
import Community from "../Community/Pages/index"
import { getPerson } from "../utils/apiFunctions"


  export default function CommunityVerify(){
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
      <Community menu={menu}/>
    )}
  </>
    )
  }