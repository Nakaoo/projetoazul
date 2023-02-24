import { getPerson } from "../../utils/apiFunctions"
import OrderConfirmation from "./Page/OrderConfirmation"
import React, { useState, useEffect, useCallback } from "react"

export default function OrderverifyConfi() {
  const [accountType, setAccountType] = useState('')
  // eslint-disable-next-line
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

  const callBackEffect = useCallback(async () => {
    await getPersonConfig()
  })

  useEffect(() => {
    callBackEffect()
  }, [callBackEffect])

  return (
    <>
      {accountType === "invalido" && (
        <OrderConfirmation />
      )}
    </>
  )
}