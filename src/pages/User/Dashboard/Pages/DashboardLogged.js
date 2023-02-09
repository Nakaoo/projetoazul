import React from "react"
import { useEffect, useState } from "react"
import '../index.css'
import MenuBar from '../../../../components/MenuBar/index'
import { HiMenu } from "react-icons/hi"
import { useContext } from "react"
import { UserContext } from "../../../../hooks/UserContext"
import Card from "../Card/Card"
import Resumo from "../Card/Resumo"
import HistoricRewards from "../Table/HistoricRewards"
import { getUser } from "../../utils/apiFunctions"
import { Skeleton } from "antd"
import apitest from "../../../../services/apitest"
import Navbar from "../../../../components/Navbar/Navbar"
import './DashboardLogged.css'
import { getMultiNivel, getMultiNivelTotal } from "../../utils/apiFunctions"

export default function DashboardLogged() {
  const [pessoa, setPessoa] = useState()
  const [loadingTela, setLoadingTela] = useState()
  const tkUser = localStorage.getItem('tk-user')

  const [products, setProducts] = useState();
  const [balanceUser, setBalanceUser] = useState();
  const [multinivel, setMultiNivel] = useState([]);
  const [multiniveltotal, setMultiNivelTotal] = useState([]);
  const [sumMultiNivel, setSumMultiNivel] = useState();

  async function LoadProducts() {
    await apitest.get(`product`)
      .then((response) => setProducts(response.data.result))
      .catch(error => console.log(error))
  }

  /// Carregar saldo total do usuário
  async function LoadBalance() {
    await apitest.get(`wallet`)
      .then((response) => setBalanceUser(response.data.result.wallet.balance))
      .catch(error => console.log(error))
  }

  async function fetchUser() {
    setLoadingTela(true)

    if (tkUser) {
      const user = await getUser()
      setPessoa(user?.data.result.id)
    }

    setLoadingTela(false)
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
    fetchUser()
    LoadBalance();
    LoadProducts();
    getMultiNivelValue();
    getMultiNivelTotalValue();
  }, [])


  if (!loadingTela) {
    return (
      <div className="__contentDashBoard">
        <div className="__card">
          <div className="__cardCommunity">
            <Card pessoa={pessoa} products={products} balanceUser={balanceUser} />
          </div>

          <div className="__cardHistoric">
            <HistoricRewards />
          </div>
        </div>
        <div className="__card">
          <Resumo pessoa={pessoa} multinivel={multinivel} multiniveltotal={multiniveltotal} sumMultiNivel={sumMultiNivel} />
        </div>
      </div>
    )
  } else {
    <Skeleton />
  }
}