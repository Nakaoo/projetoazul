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
  const { value, setValue } = useContext(UserContext);
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
      {window.innerWidth <= "600" && value == true ? (
        <div className="__menuBar">
          <MenuBar menu={menu} />
        </div>
      ) : (
        <>
          {window.innerWidth <= "600" && value == false ? (
            <>
              <div className="__menuIsOpen">
                <HiMenu size={30} onClick={() => setValue(true)} />
              </div>
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
                    <table className="__cardTitleFinancial">
                      <td className="_titleFinancial">Origem</td>
                      <td className="_titleFinancial">Tipo</td>
                      <td className="_titleFinancial">Data</td>
                      <td className="_titleFinancial">Valor</td>
                    </table>
                    <div className="_test">
                      <table className="_imghistory">
                        <tr className="__imghistory">
                          <td className="_imgTest">
                            <img src={iconHistory1} alt="" />
                          </td>
                          <td className="_imgTest">
                            <img src={iconHistory1} alt="" />
                          </td>
                          <td className="_imgTest">
                            <img src={iconHistory1} alt="" />
                          </td>
                          <td className="_imgTest">
                            <img src={iconHistory1} alt="" />
                          </td>
                          <td className="_imgTest">
                            <img src={iconHistory1} alt="" />
                          </td>
                        </tr>
                      </table>
                      <table className="__tableFinancial">
                        <tr>
                          <td className="__originFinancial">
                            Fiorgio Restaurant
                          </td>
                          <td className="__originFinancial">
                            Fiorgio Restaurant
                          </td>
                          <td className="__originFinancial">
                            Fiorgio Restaurant
                          </td>
                          <td className="__originFinancial">
                            Fiorgio Restaurant
                          </td>
                          <td className="__originFinancial">
                            Fiorgio Restaurant
                          </td>
                        </tr>

                        <tr>
                          <td className="__typeFinancial">Marketplace</td>
                          <td className="__typeFinancial">Marketplace</td>
                          <td className="__typeFinancial">Marketplace</td>
                          <td className="__typeFinancial">Marketplace</td>
                          <td className="__typeFinancial">Marketplace</td>
                        </tr>

                        <tr>
                          <td className="__dateFinancial">15 Dec 2022</td>
                          <td className="__dateFinancial">15 Dec 2022</td>
                          <td className="__dateFinancial">15 Dec 2022</td>
                          <td className="__dateFinancial">15 Dec 2022</td>
                          <td className="__dateFinancial">15 Dec 2022</td>
                        </tr>
                        <tr>
                          <td className="__valueFinancial">R$140.99</td>
                          <td className="__valueFinancial">R$140.99</td>
                          <td className="__valueFinancial">R$140.99</td>
                          <td className="__valueFinancial">R$140.99</td>
                          <td className="__valueFinancial">R$140.99</td>
                        </tr>
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
            </>
          ) : (
            <>
              <div className="__menuBar">
                <MenuBar menu={menu} />
              </div>
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

                    <table class="table table-bordered table-dark table-hover">
                      <thead>
                        <tr className="__titleTableHistoric">
                          <th></th>
                          <th>Origem</th>
                          <th>Tipo</th>
                          <th>Data</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td className="__originhistory">Tesco Market</td>
                          <td className="__typehistory">Shopping</td>
                          <td className="__datehistory">13 Dec 2020</td>
                          <td className="__pricehistory">R$ 75.67</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td className="__originhistory">Tesco Market</td>
                          <td className="__typehistory">Shopping</td>
                          <td className="__datehistory">13 Dec 2020</td>
                          <td className="__pricehistory">R$ 75.67</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td className="__originhistory">Tesco Market</td>
                          <td className="__typehistory">Shopping</td>
                          <td className="__datehistory">13 Dec 2020</td>
                          <td className="__pricehistory">R$ 75.67</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td className="__originhistory">Tesco Market</td>
                          <td className="__typehistory">Shopping</td>
                          <td className="__datehistory">13 Dec 2020</td>
                          <td className="__pricehistory">R$ 75.67</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td className="__originhistory">Tesco Market</td>
                          <td className="__typehistory">Shopping</td>
                          <td className="__datehistory">13 Dec 2020</td>
                          <td className="__pricehistory">R$ 75.67</td>
                        </tr>
                      </tbody>
                    </table>
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
            </>
          )}
        </>
      )}
    </div>
  );
}
