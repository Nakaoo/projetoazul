import React from "react";
import iconHistory1 from "../../../../assets/img/iconHistory-1.svg";
import "./index.css";
import graphic from "../../../../assets/img/graphic-3.svg";
import MenuBar from "../../../../components/MenuBar";
import { HiMenu } from "react-icons/hi";
import { useContext } from "react";
import { UserContext } from "../../../../hooks/UserContext";
import { useState, useEffect } from "react";
import apitest from "../../../../services/apitest";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";

export default function Financeiro({ menu }) {
  const [products, setProducts] = useState();
  const [balanceUser, setBalanceUser] = useState();
  const [viewbalance, setViewbalance] = useState(true);

  let totalcash = 0;
  let totalcdi = 0;
  const totalIndicacoes = products?.map((item) => totalcdi + item.cdi);
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

  useEffect(() => {
    LoadProducts();
    LoadBalance();
  }, []);

  return (
    <div className="__container">
      <div className="__cardBalanceIncome">
        <div className="__myBalance">
          <div className="_myBalance">
            <div className="__titleMyBalance">Meu Saldo</div>
            <div className="__balance">
              <div className="__communityStart">
                <h1>Comunidade: </h1>
                <h1>Rendimento: </h1>
              </div>
              <div className="__currentBalanceFinancial">
                <h1>Saldo Atual</h1>
                <div className="balanceFinancial">
                  <div className="__valueFinancial">
                    <h2>R$</h2>
                    {viewbalance == true ? (
                      <>
                        <h2>{balanceUser}</h2>
                        <div className="icon-eye">
                          <BsEyeFill
                            size={25}
                            color="#197BBD"
                            onClick={() => setViewbalance(false)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <h2>*****</h2>
                        <div className="icon-eye">
                          <BsEyeSlashFill
                            size={25}
                            onClick={() => setViewbalance(true)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="__communityIncome">
                <h1>Rendimentos COMUNIDADE</h1>
                <div className="__valueFinancial">
                  <h2>R$</h2>
                  <h2>{totalcdi}</h2>
                </div>
              </div>
              <div className="__cashBackFinancial">
                <h1>Cashback</h1>
                <div className="__valueFinancial">
                  <h2>R$</h2>
                  <h2>{totalcash}</h2>
                </div>
              </div>
              <div className="__buttonFinancial">
                <button>
                  <h1>SOLICITAÇÕES</h1>
                </button>
                <button>
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
        </div>
        <div className="__myIncome">
          <div className="__titleMyIncome">
            <h1>Meus Rendimentos</h1>
          </div>
          <div className="__investedExprectation">
            <div className="__totalInvested">
              <h1>Total Investido</h1>
              <div className="__valueInvested">
                <h1>R$ 35.000,00</h1>
                <h3>2.3%</h3>
              </div>
              <h2>Valor disponivel para Saque: R$ 22.000,00</h2>
            </div>

            <div className="__yieldExpectation">
              <div className="_yieldExpectation">
                <h1>Expectativa de Rendimento a.m</h1>
                <h1>Comunidade</h1>
                <h1>CDI</h1>
              </div>
              <div className="__valueInvested">
                <h1>R$ 1.350,00</h1>
                <h2>2.3%</h2>
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
        </div>
      </div>
    </div>
  )
}
