import React from "react";
// eslint-disable-next-line
import iconHistory1 from "../../../../assets/img/iconHistory-1.svg";
import "./index.css";
import graphic from "../../../../assets/img/graphic-3.svg";
// eslint-disable-next-line
import MenuBar from "../../../../components/MenuBar";
// eslint-disable-next-line
import { HiMenu } from "react-icons/hi";
// eslint-disable-next-line
import { useContext } from "react";
// eslint-disable-next-line
import { UserContext } from "../../../../hooks/UserContext";
import { useState, useEffect } from "react";
import apitest from "../../../../services/apitest";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";
import { getWithdrawals } from "../../utils/apiFunctions";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { formatCurrencyFront } from "../../../../utils/removeMask";
import { useOutletContext } from "react-router-dom";
import Solicitacoes from "./Solicitacoes";

// eslint-disable-next-line
export default function Financeiro({ menu }) {
  const [accountType, people] = useOutletContext();
  const [products, setProducts] = useState();
  const [balanceUser, setBalanceUser] = useState();
  const [viewbalance, setViewbalance] = useState(true);
  const [solicitacoesPage, setSolicitacoesPage] = useState(false);
  const [withdrawals, setWithdrawals] = useState([])
  const [withdraw, setWithdraw] = useState([])
  const [filterds, setFilterds] = useState([])
  const [openedMenu, setOpenedMenu] = useState(false)
  const [actualValue, setActualValue] = useState()
  const [search, setSearch] = useState()
  const [step, setStep] = useState(0)

  let navigate = useNavigate();

  let totalcash = 0;
  let totalcdi = 0;
  // eslint-disable-next-line
  const totalIndicacoes = products?.map((item) => totalcdi + item.cdi);
  // eslint-disable-next-line
  const totalCashback = products?.map((item) => totalcash + item.cashback);

  async function LoadProducts() {
    await apitest
      .get(`product`)
      .then((response) => setProducts(response.data.result))
      .catch((error) => console.log(error));
  }

  /// Carregar saldo total do usuário
  async function LoadBalance() {
    await apitest
      .get(`wallet`)
      .then((response) => setBalanceUser(response.data.result.wallet.balance))
      .catch((error) => console.log(error));
  }
  async function getWithdrawalUser() {
    let withdrawals = await getWithdrawals()

    setWithdrawals(withdrawals?.data?.result)
  }


  function handleActualValue(val) {
    if (actualValue?.uuid !== val?.uuid) {
      setActualValue(val)
      setOpenedMenu(true)
    }
    else if (actualValue.uuid === val.uuid) {
      setOpenedMenu(false)
      setActualValue()
    } else if (actualValue.length <= 0) {
      setOpenedMenu(true)
      setActualValue(val)
    }
    else {
      setActualValue(val)
      setOpenedMenu(true)
    }
  }


  function handleSearchOrder(e) {

    setSearch(e)
    let array = []

    withdrawals.filter((item) => {
      if (item?.id.includes(search)) {
        return array.push(item)
      }
    });


    setFilterds(array)

    if (!search)
      setFilterds([])
  }

  function handleNextPerson(person) {
    setWithdraw(person)
    setActualValue(person)
    setStep(1)
  }

  function sumTotalIndicate(){
    people.map((val, index) => {
      console.log(val)
    })
  }
  useEffect(() => {
    console.log(people)
    LoadProducts();
    LoadBalance();
    getWithdrawalUser();
  }, []);

  return (
    <div className="__container_">
      <div className="__cardBalanceIncome">
        {!solicitacoesPage && (
          <><div className="__myBalance">
            <div className="_myBalance">
              <div className="__titleMyBalance">Meu Saldo</div>
              <div className="__balance">
                <div className="__currentBalanceFinancial">
                  <h1>Saldo Atual</h1>
                  <div className="balanceFinancial">
                    <div className="__valueFinancial">
                      {viewbalance === true ? (
                        <>
                          <h2>{formatCurrencyFront(balanceUser)}</h2>
                          <div className="icon-eye">
                            <BsEyeFill
                              size={25}
                              color="#197BBD"
                              onClick={() => setViewbalance(false)} />
                          </div>
                        </>
                      ) : (
                        <>
                          <h2>*****</h2>
                          <div className="icon-eye">
                            <BsEyeSlashFill
                              size={25}
                              onClick={() => setViewbalance(true)} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="__communityIncome">
                  <h1>Rendimentos Indicados</h1>
                  <div className="__valueFinancial">
                    <h2>R$</h2>
                    <h2>0,00</h2>
                  </div>
                </div>
                <div className="__cashBackFinancial">
                  <h1>Cashback</h1>
                  <div className="__valueFinancial">
                    <h2>{formatCurrencyFront(people?.lockwallet?.balance)}</h2>
                  </div>
                </div>
                <div className="__cashBackFinancial">
                  <h1>Indicados</h1>
                  <div className="__valueFinancial">
                    <h2>{formatCurrencyFront(people?.lockwallet?.balance)}</h2>
                  </div>
                </div>
                <div className="__buttonFinancial">
                  <button onClick={() => setSolicitacoesPage(true)}>
                    <h1>SOLICITAÇÕES</h1>
                  </button>
                  <button onClick={() => navigate('/withdraw')}>
                    <h1>SOLICITAR SAQUE</h1>
                  </button>
                </div>
              </div>
            </div>
            <div className="__financialMovements">
              <div className="__titleFinancial">
                <h1>Historico de Recompensas</h1>
              </div>
              <div className="_test">
                <table className="__tableFinancial">
                </table>
              </div>
            </div>
          </div><div className="__myIncome">
              <div className="__titleMyIncome">
                <h1>Meus Rendimentos</h1>
              </div>
              <div className="__investedExprectation">
                <div className="__totalInvested">
                  <h1>Total Investido</h1>
                  <div className="__valueInvested">
                    <h1>{formatCurrencyFront(people?.invertment) ?? 0}</h1>
                    <h3>0</h3>
                  </div>
                  <h2>Valor disponivel para Saque: {formatCurrencyFront(balanceUser)}</h2>
                </div>

                <div className="__yieldExpectation">
                  <div className="_yieldExpectation">
                    <h1>Expectativa de Rendimento a.m</h1>
                    <h1>Indicados</h1>
                    <h1>CDI</h1>
                  </div>
                  <div className="__valueInvested">
                    <h1>{formatCurrencyFront()}</h1>
                  </div>
                  <div className="__titleValueInvested">
                    <h1>
                      Esse valor é uma previsão que pode sofrer variação.
                    </h1>
                    <h2>Saiba Mais</h2>
                  </div>
                </div>
              </div>

              <img src={graphic} alt="" />
            </div></>
        )}
        {solicitacoesPage && (
          <Solicitacoes 
          step={step}
          setStep={setStep}
          filterds={filterds}
          withdrawals={withdrawals}
          handleActualValue={handleActualValue}
          handleSearchOrder={handleSearchOrder}
          handleNextPerson={handleNextPerson}
          openedMenu={openedMenu}
          setOpenedMenu={setOpenedMenu}
          actualValue={actualValue}
          withdraw={withdraw}
          />
        )}
      </div>
    </div>
  )
}
