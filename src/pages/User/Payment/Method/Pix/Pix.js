import './Pix.css';
import pix from '../../../../../assets/icons/pix.png';
import step1 from '../../../../../assets/icons/step-1.png';
import step2 from '../../../../../assets/icons/step-2.png';
import step3 from '../../../../../assets/icons/step-3.png';
import { useEffect, useState } from 'react';
import QrCode from "./QRcode"
import apitest from '../../../../../services/apitest';
import { IoMdReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import api from '../../../../../services/api';
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export default function Pix({ OrderPayment, setConfirmPay, CloseModal }) {
  const [modalQrCode, setModalQrCode] = useState(false);
  const [orderPayment, setOrderPayment] = useState(OrderPayment.data.uuid);
  const [imgQrCode, setImgQrCode] = useState();
  const [keyQrCode, setKeyQrCode] = useState('7f6844d0-de89-47e5-9ef7-e0a35a681615');
  const [modalOrderConfirm, setModalOrderConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="__contentMain">

      <div className="__containerPix">
        <div className="__contentPix">
          <div className="__iconPix">
            {/* <div className="__returnOptionPix">
               <IoMdReturnLeft  size={30}  onClick={() => setConfirmPay(false)}/>
             </div> */}
            <img src={pix} alt="iconPix" />
          </div>
          <div className="__titlePix">Pagamento via PIX</div>
          <div className="__step_pix">
            <div className='__stepper'>1</div>
            <h1>Copie o código abaixo e faça o pagamento pelo seu banco</h1>
          </div>
          <div className="__randomKey">
            <h1>Chave Aleatoria</h1>
            <form className="_randomKey" ><div className="__keyQrCode"><h1>{keyQrCode}</h1></div></form>
          </div>
          <div className="__buttonCopy_pix">
            <button className="_buttonCopy_pix">COPIAR</button>
            <button className="_buttonCopy_pix" onClick={() => setModalQrCode(true)}>QRCODE</button>
          </div>
          {modalQrCode == true ? <QrCode ImgQrCode={imgQrCode} setModalQrCode={setModalQrCode} /> : <></>}
          <div className="__step_2_pix">
            <div className="__confirmPayment">
              <div className='__stepper'>2</div>
              <h1>Confirme as Informações de Pagamento </h1>
            </div>
            <div className="_infoPayment_pix">
              <div className="infoPayment_pix">
                <h1>Nome:</h1>
                <h2>ESGTECH</h2>
              </div>
              <div className="infoPayment_pix">
                <h1>CNPJ:</h1>
                <h2>41000245/47</h2>
              </div>
            </div>
          </div>
          <div className="__step_pix">
            <div className='__stepper'>3</div>
            <h1>Aguarde a Confirmação do Pagamento e Ativação da Comunidade</h1>
          </div>
        </div>

      </div>
      <div className="__buttonFinishPix">
        <button className="cancel-payment" onClick={() => CloseModal()}>
          Cancelar
        </button>
        <button className="_buttonFinishPix" onClick={() => navigate('/orderConfirmation')}>
          Finalizar
        </button>
      </div>

    </div>
  )
}