import React from "react"
import { useEffect, useState } from "react"
import { getPerson } from "../utils/apiFunctions"
import Afiliado from "./Pages/ChooseAffiliate"
import { useNavigate } from "react-router-dom"
import DashboardLogged from "./Pages/DashboardLogged"
import { getProducts, getMultiNivel, getMultiNivelTotal } from "../utils/apiFunctions"

export default function Dashboard() {
  const [accountType, setAccountType] = useState('')
  const [personId, setPersonId] = useState('')
  const [productsApi, setProductsApi] = useState();

  async function getAllProducts() {
    const response = await getProducts()

    console.log(response)

    setProductsApi(response?.data.result)
  }

  async function getPersonConfig() {

    let person = await getPerson()
    setPersonId(person?.data.result.id)
    if (person?.data.result.purchase_active < 1) {
      setAccountType('invalido')
    } else {
      setAccountType('valido')
    }
  }

  useEffect(() => {
    getPersonConfig()
    getAllProducts();
  }, [])

  return (
    <>
      {accountType === "invalido" && (
        <Afiliado id={personId} productsApi={productsApi} />
      )}
      {accountType === "valido" && (
        <DashboardLogged />
      )}
    </>
  )
}
