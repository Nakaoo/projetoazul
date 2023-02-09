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


  async function getMultiNivelValue() {
    try {
      let multinivel = await getMultiNivel();
      let arr = []

      multinivel.data.result.forEach(element => {
        arr.push(element)
      });

      setMultiNivel(arr)
    } catch (err) {
      console.log(err);
    }
  }

  async function getMultiNivelTotalValue() {
    try {
      let multinivel = await getMultiNivelTotal();
      let arr = []
      let sum = 0;

      multinivel.data.result.forEach((element, index) => {
        arr.push(element)
        sum += element.total
      });

      console.log(arr, 'arr2')
      setSumMultiNivel(sum)
      setMultiNivelTotal(arr)
    } catch (err) {
      console.log(err);
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
