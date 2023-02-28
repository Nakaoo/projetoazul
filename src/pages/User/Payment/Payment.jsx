import "./Payment.scss";

import React, { useCallback, useEffect, useState } from "react";
import check from "../../../assets/icons/checkbox.svg";
import edit from "../../../assets/icons/edit.svg";
import ModalPix from "./Method/Pix/Pix";
import ModalTed from "./Method/Ted/Ted";
import ModalBoleto from "./Method/Boleto/Boleto";
import api from "../../../services/api";
import ProofModal from './ModalProof/Proof.js'

// eslint-disable-next-line
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { deleteOrder, generatePix, generateOrder, generateTed, getUser, sendProof } from "../utils/apiFunctions";
// eslint-disable-next-line
// import { uploadImg, uploadObject } from "../../../utils/uploadImg";
import uploadImg from "../../../utils/aws";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function Payment({
  productsInCart,
  setCartsVisibility,
  setModalProduct,
  id,
  product,
  firstBuy
}) {
  const [optionValue, setOptionValue] = useState("option1");
  const changeOption = (newState) => {
    setOptionValue(newState);
  };

  const initProofState = {
    Bucket: "mtbroadcast",
    Key: "",
    Body: "",
    // Acl: "public",
    Metadata: {
      'Accept': 'application/json',
      'Allow-Access-Control-Origin': '*',
      'Content-Type': `image/*`
    }
  }

  const [proof, setProof] = useState(initProofState)

  // eslint-disable-next-line
  const navigate = useNavigate();

  const [confirmPay, setConfirmPay] = useState(false);
  const [orderPayment, setOrderPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [pixDetails, setPixDetails] = useState();
  const [tedDetails, setTedDetails] = useState();
  const [contractAccept, setContractAccept] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileEx, setFileEx] = useState("");

  const onOk = () => {
    setShowModal(false)
  }

  // atual função para criar order
  async function CreateOrder() {
    setLoading(true)
    const dataFirstBuy = {
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

    const data = {
      wallet: id,
      product: [{
        id: product.uuid,
        qtt: 1
      }
      ]
    }

    if (contractAccept === false) {
      message.error("É preciso aceitar os termos do contrato")
      setLoading(false)
      return;
    }
    let order = ''
    if (!firstBuy) {
      order = await generateOrder(dataFirstBuy)
      setOrderPayment(order.data.result.data)
    }

    if (firstBuy) {
      order = await generateOrder(data)
      setOrderPayment(order.data.result.data)
    }

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

  // Enviar comprovante
  async function CreateOrderProof() {

    let dataProof = `${process.env.REACT_APP_DIGITAL_S3URL}/${proof.KeyName}`

    console.log(dataProof)

    const data = {
      proof: `${process.env.REACT_APP_DIGITAL_S3URL}/${proof.KeyName}`
    }

    let pay = await sendProof(orderPayment.uuid, data)

    console.log(pay)
  }

  const loadDataShippingCallback = useCallback(async () => {
    const rst = await getUser()
    setDataUser(rst.data.result)
    // await LoadDataShipping()
  }, [])

  useEffect(() => {
    loadDataShippingCallback();
  }, [loadDataShippingCallback]);

  async function handleConfirmPay() {
    setLoading(true)

    await uploadImg(proof)
    await CreateOrderProof()

    navigate('/paymentok')

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

  async function CloseModal() {
    setCartsVisibility(false);
    setModalProduct(false);
    await deleteOrder(orderPayment.uuid)
  }


  const handleRemoveUpload = async () => {
    setProof(initProofState)
  };

  const handleChangeUpload = async (file) => {
    const name = file.file.name.split('.')[0]
    let ext = file.file.name.split('.')[1]

    // Convert extension because files reading jpeg as jpg and bugging in link.
    if (file.file.type === "image/jpg" || file.file.type === "image/jpeg") {
      ext = "jpeg"
    }

    const dt = {
      ...proof,
      Key: `${process.env.REACT_APP_DIGITAL_PATH}/${dataUser?.uuid}/${file.file.uid}`,
      KeyName: `${process.env.REACT_APP_DIGITAL_PATH}/${dataUser?.uuid}/${file.file.uid}.${ext}`,
      Body: file.file,
      Metadata: {
        'Accept': 'application/json',
        'Allow-Access-Control-Origin': '*',
        "Content-Type": file.file.type,
      }
    }
    setProof(dt)

    console.log('proof', dt)
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
          proof={proof}
          setProof={setProof}
          pixDetails={pixDetails}
        />
      ) : optionValue === "option2" && confirmPay === true ? (
        <ModalTed setConfirmPay={setConfirmPay} CloseModal={CloseModal} tedDetails={tedDetails} orderDetails={orderPayment} />
      ) : optionValue === "option3" && confirmPay === true ? (
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
                  {editShippingName === true ? (
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
                            <img alt="" src={check} />
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <form className="__form-data-name">
                      <div>{dataUser?.shipping_first_name}</div>
                      <div>
                        <img alt="" src={check} />{" "}
                        <img alt=""
                          src={edit}
                          onClick={() => setEditShippingName(true)}
                        />
                      </div>
                    </form>
                  )}
                </div>
                <div className="input-data-name">
                  <h1>Sobrenome</h1>
                  {editShippingName === true ? (
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
                            <img alt="" src={check} />
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <form className="__form-data-name">
                      <div>{dataUser?.last_name}</div>
                      <div className="__validationShipping">
                        <img alt="" src={check} />{" "}
                        <img alt=""
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
                {editShippingCpf === true ? (
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
                          <img alt="" src={check} />
                        </>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <form className="__form-payment">
                    <div>{dataUser?.doc_fiscal}</div>
                    <div>
                      <img alt="" src={check} />{" "}
                      <img alt=""
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
                  {editShippingAddress === true ? (
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
                            <img alt="" src={check} />
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <form className="__form-address_logradouro">
                      <div>{dataUser?.address_1}</div>
                      <div className="__validationShipping">
                        <img alt="" src={check} />{" "}
                        <img alt=""
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
                    {editShippingAddress === true ? (
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
                              <img alt="" src={check} />
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <form className="__form-address_number">
                        <div>{dataUser?.number}</div>
                        <div className="__validationShipping">
                          <img alt="" src={check} />{" "}
                          <img alt=""
                            src={edit}
                            onClick={() => setEditShippingAddress(true)}
                          />
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="input-address-data">
                    <h1>Cidade</h1>
                    {editShippingAddress === true ? (
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
                              <img alt="" src={check} />
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <form className="__form-address">
                        <div>{dataUser?.city}</div>
                        <div className="_formCheck">
                          <img alt="" src={check} />{" "}
                          <img alt=""
                            src={edit}
                            onClick={() => setEditShippingAddress(true)}
                          />
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              <div className="__input_contract">
                <input className="form-check-input" type="checkbox" onClick={() => handleContract()} />
                <label htmlFor="check_contract">Li e aceito os termos de contrato da compra. <br />
                  <a onClick={() => setShowModal(true)} className="contract_a">
                    Visualizar termos
                  </a>
                </label>
              </div>
            </div>
          </div>
          <div className="__button-next-page-payment">
            {confirmPay === false && productsInCart.length > 0 ? (
              <div className="_button-next-page-payment">
                <button className="cancel-payment" onClick={() => CloseModal()}>
                  Cancelar
                </button>
                <button
                  className="next-page-payment"
                  onClick={() => CreateOrder()}
                >
                  {loading ? <LoadingOutlined /> : "Ir para o pagamento"}
                </button>
              </div>
            ) : (
              <></>
            )}
            {optionValue === "" && confirmPay === true ? (
              <div className="_button-next-page-payment">
                <button className="cancel-payment" onClick={() => CloseModal()}>
                  Cancelar
                </button>
                <button
                  className="next-page-payment"
                  onClick={() => CreateOrder()}
                >
                  {loading ? <LoadingOutlined /> : "Ir para o pagamento"}
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <ProofModal showModal={showModal} onOk={onOk} product={product} />
        </div>
      )}
    </>
  );
}
