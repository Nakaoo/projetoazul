import { getPerson } from "../../utils/apiFunctions"
import OrderPlaced from "./Page/OrderPlaced"
import React, { useState, useEffect } from "react"

export default function OrderverifyConfi(){
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

    return(
        <>
        {accountType === "invalido" && (
          <OrderPlaced menu={menu}/>
        )}
      </>
    )
}