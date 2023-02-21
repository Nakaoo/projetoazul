import './Boleto.css'
// eslint-disable-next-line
import step1 from '../../../../../assets/icons/step-1.png'
// eslint-disable-next-line
import step2 from '../../../../../assets/icons/step-2.png'
// eslint-disable-next-line
import step3 from '../../../../../assets/icons/step-3.png'
// eslint-disable-next-line
import step4 from '../../../../../assets/icons/step-4.png'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line
import { IoMdReturnLeft } from "react-icons/io";

// eslint-disable-next-line
export default function Boleto({ setConfirmPay, CloseModal }) {
  const navigate = useNavigate();
  return (
    <div className="__contentBoleto">
      <div className="__containerBoleto">
        <div className="__headerBoleto">
          Pagamento via Boleto
        </div>
        <div className="__stepBoleto">
          <div className='__stepper'>1</div>
          <h1>Seu pedido Número #4343 foi aberto</h1>
        </div>

        <div className="__step_Boleto_2">
          <div className="__titlePaymentBoleto">
            <div className='__stepper'>2</div>
            <h1>Faça o Pagamento do Boleto pelo seu banco ou casa lotérica</h1>


          </div>
          <div className="_buttonReceipt">
            <button className="__buttonReceipt">
              FINALIZAR
            </button>
          </div>
        </div>

        <div className="__stepBoleto_3">
          <div className="__titleStepBoleto_3">
            <div className="_titleStepBoleto_3">
              <div className='__stepper'>3</div>
              <h1>Anexe o comprovante de Pagamento.</h1>
            </div>
          </div>
          <div className="_buttonReceipt">
            <button className="__buttonReceipt">
              ANEXAR
            </button>
          </div>
        </div>
        <div className="__stepBoleto_4">
          <div className="_stepBoleto_4">
            <div className='__stepper'>4</div>
            <h1>Aguarde a Confirmação do Pagamento e Ativação da Plataforma</h1>
          </div>
          <h2>OBS: Pagamentos via boleto levam até 3 dias utéis para ser compensados</h2>
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