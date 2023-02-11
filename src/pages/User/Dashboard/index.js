import React from "react"
import { useEffect, useState } from "react"
import { getPerson } from "../utils/apiFunctions"
import Afiliado from "./Pages/ChooseAffiliate"
import { useNavigate, useOutletContext } from "react-router-dom"
import DashboardLogged from "./Pages/DashboardLogged"
import { getProducts, getMultiNivel, getMultiNivelTotal } from "../utils/apiFunctions"
import PendingOrder from "./Pages/PendingOrder"

export default function Dashboard() {
  const [accountType, people] = useOutletContext();
  const [personId, setPersonId] = useState('')
  const [productsApi, setProductsApi] = useState();

  async function getAllProducts() {
    const response = await getProducts()

    setProductsApi(response?.data.result)
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <>
      {accountType === "invalido" && (
        <Afiliado id={people.wallet.id} productsApi={productsApi} />
      )}
      {accountType === "valido" && (
        <DashboardLogged />
      )}
      {accountType === "pagamento" && (
        <PendingOrder />
      )}
    </>
  )
}
