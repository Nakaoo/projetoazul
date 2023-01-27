import './Boleto.css'
import step1 from '../../../../../assets/icons/step-1.png'
import step2 from '../../../../../assets/icons/step-2.png'
import step3 from '../../../../../assets/icons/step-3.png'
import step4 from '../../../../../assets/icons/step-4.png'

import { IoMdReturnLeft } from "react-icons/io";


export default function Boleto({setConfirmPay}) {
    return (
        <div className="__contentBoleto">
          <div className="__containerBoleto">
            <div className="__headerBoleto">
              <div className="__returnOptionBoleto">
                <IoMdReturnLeft  size={30}  onClick={() => setConfirmPay(false)}/>
              </div>
               Pagamento via Boleto
             </div>
              <div className="__stepBoleto">
                 <img src={step1} alt="iconBoleto" />
                 <h1>Seu pedido Número #4343 foi aberto</h1>
               </div>

               <div className="__step_boleto_2">
                 <div className="__titlePaymentBoleto">
                   <img src={step2} alt="iconBoleto" />
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
                      <img src={step3} alt="step3" />
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
                     <img src={step4} alt="" /> 
                     <h1>Aguarde a Confirmação do Pagamento e Ativação da Plataforma</h1>
                    </div>
                    <h2>OBS: Pagamentos via boleto levam até 3 dias utéis para ser compensados</h2>
                </div>   
          </div>
          <div className="__buttonFinishBoleto">
                  <button className="_buttonFinishPix">
                   Finalizar       
                  </button>
                </div>
  </div>
    )
}