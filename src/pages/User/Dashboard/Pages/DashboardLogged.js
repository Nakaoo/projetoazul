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
export default function DashboardLogged({ menu }) {
  const { value, setValue } = useContext(UserContext)
  const [pessoa, setPessoa] = useState()
  const [loadingTela, setLoadingTela] = useState()
  const tkUser = localStorage.getItem('tk-user')

  const [products, setProducts] = useState();
  const [balanceUser, setBalanceUser] = useState();

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

  useEffect(() => {
    fetchUser()
    LoadBalance();
    LoadProducts();
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
          <Resumo pessoa={pessoa} />
        </div>
      </div>
    )
  } else {
    <Skeleton />
  }
}