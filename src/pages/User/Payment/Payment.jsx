import "./Payment.scss";

import check from "../../../assets/icons/checkbox.svg";
import edit from "../../../assets/icons/edit.svg";
import React, { useEffect, useState } from "react";
import ModalPix from "./Method/Pix/Pix";
import ModalTed from "./Method/Ted/Ted";
import ModalBoleto from "./Method/Boleto/Boleto";
// eslint-disable-next-line
import apitest from "../../../services/apitest";
import api from "../../../services/api";

// eslint-disable-next-line
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { deleteOrder, generatePix, generateOrder, generateTed } from "../utils/apiFunctions";
// eslint-disable-next-line
import { uploadImg, uploadObject } from "../../../utils/uploadImg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
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
  const [document, setDocument] = useState({
    Bucket: "mtbroadcast",
    Key: "",
    Body: "",
    ACL: "public",
    Metadata: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // eslint-disable-next-line
  const navigate = useNavigate();

  const [confirmPay, setConfirmPay] = useState(false);
  const [orderPayment, setOrderPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [pixDetails, setPixDetails] = useState();
  const [tedDetails, setTedDetails] = useState();
  const [contractAccept, setContractAccept] = useState(false);

  // atual função para criar order
  async function CreateOrder() {
    setLoading(true)
    const data = {
      wallet: id,
      product: [{
        id: product.uuid,
        qtt: 1
      },
      {
        id: 'a0b326b2-dd9f-40a3-87e4-6ee6857f0cdb',
        qtt: 1
      }
      ]
    }

    if (contractAccept === false) {
      message.error("É preciso aceitar os termos do contrato")
      setLoading(false)
      return;
    }

    let order = await generateOrder(data)
    setOrderPayment(order.data.result.data)

    if (optionValue === 'option1') {
      try {
        let pix = await generatePix(order.data.result.data.uuid);
        setPixDetails(pix.data.result)
      } catch (err) {
        message.error("Houve algum erro na geração")
        setLoading(false)
        return;
      }
    }
    if (optionValue === 'option2') {
      try {
        setConfirmPay(true)
        let ted = await generateTed(order.data.result.data.uuid)
        console.log('ted', ted)
        console.log('order', order)
        setTedDetails(ted)
      } catch (err) {
        message.error("Houve algum erro na geração")
        setLoading(false)
        return;
      }
    }

    setLoading(false)

    setConfirmPay(true)
  }

  useEffect(() => { LoadDataShipping(); });

  async function handleConfirmPay() {
    setLoading(true)
    // console.log(document)
    // let documentTst = await uploadImg(document.Body)
    // console.log(documentTst)
    window.onload('/')

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


  const handleRemoveUpload = async () => {
    setDocument({
      Bucket: "mtbroadcast",
      Key: "",
      Body: "",
      ACL: "public",
      Metadata: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Allow-Access-Control-Origin': '*'
      }
    })
  };

  const handleChangeUpload = async (file) => {
    setDocument({ ...document, Key: file.file.uid, Body: file.file })

    console.log(document)
  };

  function handleContract() {
    if (contractAccept === true) {
      setContractAccept(false)
    }
    else if (contractAccept === false) {
      setContractAccept(true)
    }
    else {
      setContractAccept(false)
    }
  }
  return (
    <>
      {optionValue === "option1" && confirmPay === true ? (
        <ModalPix OrderPayment={orderPayment}
          setConfirmPay={setConfirmPay}
          setCartsVisibility={setCartsVisibility}
          CloseModal={CloseModal}
          CreateOrder={CreateOrder}
          handleConfirmPay={handleConfirmPay}
          handleRemoveUpload={handleRemoveUpload}
          handleChangeUpload={handleChangeUpload}
          document={document}
          setDocument={setDocument}
          pixDetails={pixDetails}
        />
      ) : optionValue === "option2" && confirmPay === true ? (
        <ModalTed setConfirmPay={setConfirmPay} CloseModal={CloseModal} tedDetails={tedDetails} orderDetails={orderPayment} />
      ) : optionValue === "option3" && confirmPay === true ? (
        <ModalBoleto setConfirmPay={setConfirmPay} CloseModal={CloseModal} />
      ) : (
        <div className="payment">
          <div className="row text-light">
            <div className="border border-primary rounded p-4">
              <div className="col-lg-12">
                <div className="card bg-transparent">
                  <div className="card-head px-3">
                    <h1>
                      <strong>Pagamento</strong>
                    </h1>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <h2>
                          <b>Informações de Pagamento</b>
                        </h2>
                      </div>
                      <div className="col-lg-6"><h2 className="h4">Forma de Pagamento</h2></div>
                      <div className="col-lg-6">
                        <div className="form-group position-relative">
                          <select
                            className="form-control"
                            onChange={(event) => changeOption(event.target.value)}
                            value={optionValue}
                          >
                            <option value="">Selecione uma Opção</option>
                            <option value="option1">PIX</option>
                            <option value="option2">TED</option>
                            <option value="option3">BOLETO</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12 mt-3">
                        <div>OBS:</div>
                        <span className="h3">
                          Pagamentos via boleto levam até 3 dias utéis para ser
                          compensados
                        </span>
                      </div>

                      <div className="col-lg-6 mt-3">
                        <div className="form-group position-relative">
                          <label htmlFor=""><h2>Nome</h2></label>
                          {editShippingName === true ? (
                            <>
                              <input
                                className="form-control"
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
                                  <img alt="" src={check} />
                                </>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <div className="form-control">{dataUser?.shipping_first_name}</div>
                              <div className="formCheck">
                                <img alt="" src={check} />{" "}
                                <img alt=""
                                  src={edit}
                                  onClick={() => setEditShippingName(true)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6 mt-3">
                        <div className="form-group position-relative">
                          <label htmlFor=""><h2>Sobrenome</h2></label>
                          {editShippingName === true ? (
                            <>
                              <input
                                className="form-control"
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
                                  <img alt="" src={check} />
                                </>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <div className="form-control">{dataUser?.last_name}</div>
                              <div className="formCheck">
                                <img alt="" src={check} />{" "}
                                <img alt=""
                                  src={edit}
                                  onClick={() => setEditShippingName(true)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6 mt-3">
                        <div className="form-group position-relative">
                          <label htmlFor=""><h2>CPF</h2></label>
                          {editShippingCpf === true ? (
                            <>
                              <input
                                className="form-control"
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
                                  <img alt="" src={check} />
                                </>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <div className="form-control">{dataUser?.doc_fiscal}</div>
                              <div className="formCheck">
                                <img alt="" src={check} />{" "}
                                <img alt=""
                                  src={edit}
                                  onClick={() => setEditShippingCpf(true)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12 mt-3">
                        <div className="form-group position-relative">
                          <label htmlFor=""><h2>Logradouro</h2></label>
                          {editShippingAddress === true ? (
                            <>
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
                                  <img alt="" src={check} />
                                </>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <div className="form-control">{dataUser?.address_1}</div>
                              <div className="formCheck">
                                <img alt="" src={check} />{" "}
                                <img alt=""
                                  src={edit}
                                  onClick={() => setEditShippingAddress(true)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6 mt-3">
                        <div className="form-group position-relative">
                          <label htmlFor=""><h2>Numero</h2></label>
                          {editShippingAddress === true ? (
                            <>
                              <input
                                className="form-control"
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
                                  <img alt="" src={check} />
                                </>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <div className="form-control">{dataUser?.number}</div>
                              <div className="formCheck">
                                <img alt="" src={check} />{" "}
                                <img alt=""
                                  src={edit}
                                  onClick={() => setEditShippingAddress(true)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="form-group position-relative">
                          <label htmlFor=""><h2>Cidade</h2></label>
                          {editShippingAddress === true ? (
                            <>
                              <input
                                className="form-control"
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
                                  <img alt="" src={check} />
                                </>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <div className="form-control">{dataUser?.city}</div>
                              <div className="formCheck">
                                <img alt="" src={check} />{" "}
                                <img alt=""
                                  src={edit}
                                  onClick={() => setEditShippingAddress(true)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" onClick={() => handleContract()} />
                          <label className="form-check-label" htmlFor="check_contract">Li e aceito os termos de contrato da compra. <br />
                            <a href="https://onedrive.live.com/embed?cid=FA1C55DB9E5E3F29&resid=FA1C55DB9E5E3F29%21228540&authkey=AJ48AQI9pK142hQ&em=2"
                              className="text-decoration-none"
                              rel="noreferrer"
                              target="_blank">
                              Visualizar termos
                            </a>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-6 mt-3 button-group">
                        {confirmPay === false && productsInCart.length > 0 ? (
                          <div className="row">
                            <div className="col">
                              <button className="btn btn-outline-dark text-light" onClick={() => CloseModal()}>
                                Cancelar
                              </button>
                            </div>
                            <div className="col-7">
                              <button
                                className="btn btn-primary"
                                onClick={() => CreateOrder()}
                              >
                                {loading ? <LoadingOutlined /> : "Ir para o pagamento"}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}

                        {optionValue === "" && confirmPay === true ? (
                          <div className="row">
                            <div className="col">
                              <button className="btn btn-outline-dark text-light" onClick={() => CloseModal()}>
                                Cancelar
                              </button>
                            </div>
                            <div className="col-7">
                              <button
                                className="next-page-payment"
                                onClick={() => CreateOrder()}
                              >
                                {loading ? <LoadingOutlined /> : "Ir para o pagamento"}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}