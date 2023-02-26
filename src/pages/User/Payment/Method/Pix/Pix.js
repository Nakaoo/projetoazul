import './Pix.css';
import pix from '../../../../../assets/icons/pix.png';
// eslint-disable-next-line
import { useEffect, useState } from 'react';
import QrCode from "./QRcode"
// eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
import { message, Upload, Form } from 'antd';

// eslint-disable-next-line
export default function Pix({ pixDetails, proof, setProof, OrderPayment, setConfirmPay, CloseModal, handleConfirmPay, handleRemoveUpload, handleChangeUpload }) {
  const [modalQrCode, setModalQrCode] = useState(false);
  // eslint-disable-next-line
  const [keyQrCode, setKeyQrCode] = useState('5b851cea-2ee8-403f-899b-f090831107c2');
  // eslint-disable-next-line
  const navigate = useNavigate();

  async function copiarLink() {
    let range = document.createRange();
    range.selectNode(document.getElementById('key'));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    message.success("Link copiado");
  }

  function refreshPage() {
    window.location.reload(false);
  }

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
            <form className="_randomKey" ><div className="__keyQrCode"><h1 id="key">{keyQrCode}</h1></div></form>
          </div>
          <div className="__buttonCopy_pix">
            <button className="_buttonCopy_pix" onClick={copiarLink}>COPIAR</button>
            <button className="_buttonCopy_pix" onClick={() => setModalQrCode(true)}>QRCODE</button>
          </div>
          {modalQrCode === true ? <QrCode ImgQrCode={pixDetails?.pix} setModalQrCode={setModalQrCode} /> : <></>}
          <div className="__step_2_pix">
            <div className="__confirmPayment">
              <div className='__stepper'>2</div>
              <h1>Confirme as Informações de Pagamento </h1>
            </div>
            <div className="_infoPayment_pix">
              <div className="infoPayment_pix">
                <h1>Nome:</h1>
                <h2>ROCHA INTERMEDIACAO DE PAGAMENTOS LTDA</h2>
              </div>
              <div className="infoPayment_pix">
                <h1>CNPJ:</h1>
                <h2>47.846.013/0001-40</h2>
              </div>
            </div>
          </div>
          <div className="__stepTed_3">
            <div className="__titleStepTed_3">
              <div className='__stepper'>3</div>
              <h1>Anexe o comprovante de Transferência.</h1>
            </div>
            <div className="_buttonReceipt">
              <Upload
                style={{ color: "white" }}
                onPreview={() => null}
                onChange={(file) =>
                  handleChangeUpload(file)
                }
                onRemove={() => {
                  handleRemoveUpload();
                }}

                beforeUpload={(file) => {
                  let valid = true;

                  if (
                    ![
                      "image/png",
                      "image/jpg",
                      "image/jpeg",
                      "application/pdf",
                    ].includes(file.type)
                  ) {
                    message.error(
                      `${file.name} não possui um formato válido`
                    );
                    valid = false;
                  }

                  if (file.size > 15000000) {
                    message.error("O arquivo possui tamanho superior a 5mb");
                    valid = false;
                  }

                  return valid ? false : Upload.LIST_IGNORE;
                }}
                listType="picture"
                maxCount={1}
                accept=".png, .jpg, .jpeg, application/pdf"
              >
                <button className="__buttonReceipt">
                  ANEXAR
                </button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
      <div className="__buttonFinishPix">
        <button className="cancel-payment" onClick={() => CloseModal()}>
          Cancelar
        </button>
        {/* <button className="_buttonFinishPix" onClick={refreshPage}> */}
        <button className="_buttonFinishPix" onClick={handleConfirmPay}>
          Finalizar
        </button>
      </div>

    </div>
  )
}