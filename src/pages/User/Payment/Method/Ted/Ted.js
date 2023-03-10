import './Ted.css'
// eslint-disable-next-line
import step1 from '../../../../../assets/icons/step-1.png'
// eslint-disable-next-line
import step2 from '../../../../../assets/icons/step-2.png'
// eslint-disable-next-line
import step3 from '../../../../../assets/icons/step-3.png'
// eslint-disable-next-line
import step4 from '../../../../../assets/icons/step-4.png'
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { message, Upload, Form } from 'antd';
// eslint-disable-next-line
import { IoMdReturnLeft } from "react-icons/io";
// eslint-disable-next-line
import Product from '../../../ShoppingCard/Product/Product'

// eslint-disable-next-line
export default function Ted({ setConfirmPay, CloseModal, product, tedDetails, orderDetails, handleConfirmPay, handleRemoveUpload, handleChangeUpload }) {
  // eslint-disable-next-line
  const navigate = useNavigate();

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="__contentTed">
      <div className="__containerTed">
        <div className="__headerTed">
          Pagamento via TED
        </div>
        <div className="__stepTed">
          <div className='__stepper'>1</div>
          <h1>Seu pedido {orderDetails.uuid} foi aberto</h1>
        </div>

        <div className="__step_ted_2">

          <div className="__titlePaymentTed">
            <div className='__stepper'>2</div>
            <h1>Faça um depósito com as seguintes Informações.</h1>
          </div>

          <div className="__infoPaymentTed">
            <div className="__contentInfoTed">
              <div className="_infoPaymentTed">
                <h1>Títular:</h1>
                <h2>ROCHA INTERMEDIACAO DE PAGAMENTOS LTDA</h2>
              </div>
              <div className="_infoPaymentTed">
                <h1>Agência:</h1>
                <h2>0001 </h2>
              </div>
              <div className="_infoPaymentTed">
                <h1>Conta:</h1>
                <h2>216771-6</h2>
              </div>
            </div>

            <div className="__contentInfoTed">

              <div className="_infoPaymentTed">
                <h1>Banco:</h1>
                <h2>274 BMP MONEY PLUS </h2>
              </div>

              <div className="_infoPaymentTed">
                <h1>CNPJ:</h1>
                <h2>47.846.013/0001-40</h2>
              </div>

              <div className="_infoPaymentTed">
                <h1>Valor:</h1>
                <h2>R$ {orderDetails.amount}</h2>
              </div>

            </div>
          </div>
        </div>

        <div className="__stepTed_3">
          <div className="__titleStepTed_3">
            <div className='__stepper'>3</div>
            <h1>Anexe o comprovante de Transferência.</h1>
          </div>
          <div className="_buttonReceipt">
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
        <div className="__stepTed">
          <div className='__stepper'>4</div>
          <h1>Aguarde a Confirmação do Pagamento e Ativação da Plataforma</h1>
        </div>

      </div>
      <div className="__buttonFinishPix">
        <button className="cancel-payment" onClick={() => CloseModal()}>
          Cancelar
        </button>
        <button className="_buttonFinishPix" onClick={refreshPage}>
          Finalizar
        </button>
      </div>
    </div>
  )
}