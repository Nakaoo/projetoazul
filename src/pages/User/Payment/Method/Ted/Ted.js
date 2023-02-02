import './Ted.css'
import step1 from '../../../../../assets/icons/step-1.png'
import step2 from '../../../../../assets/icons/step-2.png'
import step3 from '../../../../../assets/icons/step-3.png'
import step4 from '../../../../../assets/icons/step-4.png'
import { useNavigate } from 'react-router-dom'
import { IoMdReturnLeft } from "react-icons/io";


export default function Ted({ setConfirmPay, CloseModal }) {
  const navigate = useNavigate();

  return (
    <div className="__contentTed">
      <div className="__containerTed">
        <div className="__headerTed">
          Pagamento via TED
        </div>
        <div className="__stepTed">
          <div className='__stepper'>1</div>
          <h1>Seu pedido Número #4343 foi aberto</h1>
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
                <h2>MyhartBank</h2>
              </div>
              <div className="_infoPaymentTed">
                <h1>Agência:</h1>
                <h2>410000245/47</h2>
              </div>
              <div className="_infoPaymentTed">
                <h1>Conta:</h1>
                <h2>41000245/47</h2>
              </div>
            </div>

            <div className="__contentInfoTed">

              <div className="_infoPaymentTed">
                <h1>Banco:</h1>
                <h2>Fitbank</h2>
              </div>

              <div className="_infoPaymentTed">
                <h1>CNPJ:</h1>
                <h2>41000245/47</h2>
              </div>

              <div className="_infoPaymentTed">
                <h1>Valor:</h1>
                <h2>R$110,00</h2>
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
            <button className="__buttonReceipt">
              ANEXAR
            </button>
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
        <button className="_buttonFinishPix" onClick={() => navigate('/orderConfirmation')}>
          Finalizar
        </button>
      </div>
    </div>
  )
}