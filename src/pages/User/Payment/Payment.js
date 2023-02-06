import "./Payment.css";
import check from "../../../assets/icons/checkbox.svg";
import edit from "../../../assets/icons/edit.svg";
import React, { useEffect, useState } from "react";
import ModalPix from "../Payment/Method/Pix/Pix";
import ModalTed from "../Payment/Method/Ted/Ted";
import ModalBoleto from "../Payment/Method/Boleto/Boleto";
import apitest from "../../../services/apitest";
import api from "../../../services/api";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { deleteOrder, generatePix } from "../utils/apiFunctions";

export default function Payment({
  productsInCart,
  setCartsVisibility,
  setModalProduct,
  id,
  product
}) {
  const [optionValue, setOptionValue] = useState("option1");
  const changeOption = (newState) => {
    setOptionValue(newState);
  };
  const [confirmPay, setConfirmPay] = useState(false);
  const [orderPayment, setOrderPayment] = useState();
  const [loading, setLoading] = useState(false);
  // atual função para criar order
  async function CreateOrder() {
    await api.
      post(`order`, {
        wallet: id,
        product: [{
          id: product.uuid,
          qtt: 1
        }]
      })
      .then(response => {
        setOrderPayment(response.data.result.data)
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    LoadDataShipping();
    CreateOrder();
  }, []);

  async function handleConfirmPay() {
    setLoading(true)

    if(optionValue == 'option1'){
      let pix = await generatePix(orderPayment.uuid);

      console.log("Pix", pix);
    }

    setConfirmPay(true)

    setLoading(false)
  }
  /// alterar dados
  const [editShippingName, setEditShippingName] = useState(false);
  const [editShippingCpf, setEditShippingCpf] = useState(false);
  const [editShippingAddress, setEditShippingAddress] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [changedName, setChangedName] = useState(false);
  const [changedLastName, setChangedLastName] = useState(false);
  const [changedCpf, setChangedCpf] = useState(false);
  const [changedLogradouro, setChangedLogradouro] = useState(false);
  const [changedNumber, setChangedNumber] = useState(false);
  const [changedCity, setChangedCity] = useState(false);
  const [updateShipping, setUpdateShipping] = useState();

  //update data shipping
  const data = JSON.stringify(updateShipping);
  async function UpdateShipping() {
    await api
      .post(`person`, data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  //load data shipping
  const dataShipping = {};
  async function LoadDataShipping() {
    await api
      .get(`person`, dataShipping)
      .then((response) => setDataUser(response.data.result))
      .catch((error) => console.log(error));
  }

  async function CloseModal() {
    setCartsVisibility(false);
    setModalProduct(false);
    await deleteOrder(orderPayment.uuid)
  }


  return (
    <>
      {optionValue == "option1" && confirmPay == true ? (
        <ModalPix OrderPayment={orderPayment}
          setConfirmPay={setConfirmPay}
          setCartsVisibility={setCartsVisibility}
          CloseModal={CloseModal}
        />
      ) : optionValue == "option2" && confirmPay == true ? (
        <ModalTed setConfirmPay={setConfirmPay} CloseModal={CloseModal} />
      ) : optionValue == "option3" && confirmPay == true ? (
        <ModalBoleto setConfirmPay={setConfirmPay} CloseModal={CloseModal} />
      ) : (
        <div className="__content-payment-">
          <div className="cart-payment">
            <div className="cart-payment-container">
              <div className="title-payment">
                <h1>
                  <b>Pagamento</b>
                </h1>
                <h2>
                  <b>Informações de Pagamento</b>
                </h2>
              </div>
              <div className="model-payment">
                <h1>Forma de Pagamento</h1>

                <select
                  className="__selectOption-payment"
                  onChange={(event) => changeOption(event.target.value)}
                  value={optionValue}
                >
                  <option value="">Selecione uma Opção</option>
                  <option value="option1">PIX</option>
                  <option value="option2">TED</option>
                  <option value="option3">BOLETO</option>
                </select>
              </div>
              <div className="description-payment">
                OBS:
                <h1>
                  Pagamentos via boleto levam até 3 dias utéis para ser
                  compensados
                </h1>
              </div>
              <div className="input-shipping-name">
                <div className="input-data-name">
                  <h1>Nome</h1>
                  {editShippingName == true ? (
                    <>
                      <div className="_form-update">
                        <input
                          className="__form-input-name"
                          onChange={(e) => {
                            setChangedName(true);
                            setUpdateShipping({
                              ...updateShipping,
                              shipping_first_name: e.target.value,
                            });
                            UpdateShipping();
                          }}
                        />
                        {changedName ? (
                          <>
                            <img src={check} />
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <form className="__form-data-name">
                      <div>{dataUser?.shipping_first_name}</div>
                      <div>
                        <img src={check} />{" "}
                        <img
                          src={edit}
                          onClick={() => setEditShippingName(true)}
                        />
                      </div>
                    </form>
                  )}
                </div>
                <div className="input-data-name">
                  <h1>Sobrenome</h1>
                  {editShippingName == true ? (
                    <>
                      <div className="_form-update">
                        <input
                          className="__form-payment-input"
                          onChange={(e) => {
                            setChangedLastName(true);
                            setUpdateShipping({
                              ...updateShipping,
                              shipping_last_name: e.target.value,
                            });
                            UpdateShipping();
                          }}
                        />

                        {changedLastName ? (
                          <>
                            <img src={check} />
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <form className="__form-data-name">
                      <div>{dataUser?.last_name}</div>
                      <div className="__validationShipping">
                        <img src={check} />{" "}
                        <img
                          src={edit}
                          onClick={() => setEditShippingName(true)}
                        />
                      </div>
                    </form>
                  )}
                </div>
              </div>
              <div className="input-payment-data">
                <h1>CPF</h1>
                {editShippingCpf == true ? (
                  <>
                    <div className="_form-update">
                      <input
                        className="__form-payment-input"
                        onChange={(e) => {
                          setChangedCpf(true);
                          setUpdateShipping({
                            ...updateShipping,
                            doc_fiscal: e.target.value,
                          });
                          UpdateShipping();
                        }}
                      />

                      {changedCpf ? (
                        <>
                          <img src={check} />
                        </>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <form className="__form-payment">
                    <div>{dataUser?.doc_fiscal}</div>
                    <div>
                      <img src={check} />{" "}
                      <img
                        src={edit}
                        onClick={() => setEditShippingCpf(true)}
                      />
                    </div>
                  </form>
                )}
              </div>
              <div className="input-shipping-address">
                <div className="input-address-data">
                  <h1>Logradouro</h1>
                  {editShippingAddress == true ? (
                    <>
                      <div className="_form-update">
                        <input
                          className="__form-input-address"
                          onChange={(e) => {
                            setChangedLogradouro(true);
                            setUpdateShipping({
                              ...updateShipping,
                              shipping_address_1: e.target.value,
                            });
                            UpdateShipping();
                          }}
                        />

                        {changedLogradouro ? (
                          <>
                            <img src={check} />
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <form className="__form-address_logradouro">
                      <div>{dataUser?.address_1}</div>
                      <div className="__validationShipping">
                        <img src={check} />{" "}
                        <img
                          src={edit}
                          onClick={() => setEditShippingAddress(true)}
                        />
                      </div>
                    </form>
                  )}
                </div>
                <div className="_input-address-data">
                  <div className="input-address-data">
                    <h1>Numero</h1>
                    {editShippingAddress == true ? (
                      <>
                        <div className="_form-update">
                          <input
                            className="__form-input-address"
                            onChange={(e) => {
                              setChangedNumber(true);
                              setUpdateShipping({
                                ...updateShipping,
                                shipping_number: e.target.value,
                              });
                              UpdateShipping();
                            }}
                          />

                          {changedNumber ? (
                            <>
                              <img src={check} />
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <form className="__form-address_number">
                        <div>{dataUser?.number}</div>
                        <div className="__validationShipping">
                          <img src={check} />{" "}
                          <img
                            src={edit}
                            onClick={() => setEditShippingAddress(true)}
                          />
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="input-address-data">
                    <h1>Cidade</h1>
                    {editShippingAddress == true ? (
                      <>
                        <div className="_form-update">
                          <input
                            className="__form-input-address"
                            onChange={(e) => {
                              setChangedCity(true);
                              setUpdateShipping({
                                ...updateShipping,
                                shipping_city: e.target.value,
                              });
                              UpdateShipping();
                            }}
                          />

                          {changedCity ? (
                            <>
                              <img src={check} />
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <form className="__form-address">
                        <div>{dataUser?.city}</div>
                        <div className="_formCheck">
                          <img src={check} />{" "}
                          <img
                            src={edit}
                            onClick={() => setEditShippingAddress(true)}
                          />
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="__button-next-page-payment">
            {confirmPay == false && productsInCart.length > 0 ? (
              <div className="_button-next-page-payment">
                <button className="cancel-payment" onClick={() => CloseModal()}>
                  Cancelar
                </button>
                <button
                  className="next-page-payment"
                  onClick={handleConfirmPay}
                >
                  {loading ? <LoadingOutlined /> : "Ir para o pagamento"}
                </button>
              </div>
            ) : (
              <></>
            )}
            {optionValue == "" && confirmPay == true ? (
              <div className="_button-next-page-payment">
                <button className="cancel-payment" onClick={() => CloseModal()}>
                  Cancelar
                </button>
                <button
                  className="next-page-payment"
                  onClick={() => handleConfirmPay}
                >
                  {loading ? <LoadingOutlined /> : "Ir para o pagamento"}
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}
