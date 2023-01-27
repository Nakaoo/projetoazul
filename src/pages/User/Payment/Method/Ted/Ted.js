import './Ted.css'
import step1 from '../../../../../assets/icons/step-1.png'
import step2 from '../../../../../assets/icons/step-2.png'
import step3 from '../../../../../assets/icons/step-3.png'
import step4 from '../../../../../assets/icons/step-4.png'

import { IoMdReturnLeft } from "react-icons/io";


export default function Ted({setConfirmPay}) {
    return (
        <div className="__contentTed">
          <div className="__containerTed">
             <div className="__headerTed">
              <div className="__returnOptionTed">
              <IoMdReturnLeft  size={30}  onClick={() => setConfirmPay(false)}/>
              </div>
             Pagamento via TED
             </div>
              <div className="__stepTed">
                 <img src={step1} alt="iconTed" />
                 <h1>Seu pedido Número #4343 foi aberto</h1>
               </div>

               <div className="__step_ted_2">

                 <div className="__titlePaymentTed">
                   <img src={step2} alt="iconTed" />
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
                      <img src={step3} alt="step3" />
                      <h1>Anexe o comprovante de Transferência.</h1>
                    </div>
                   <div className="_buttonReceipt">
                     <button className="__buttonReceipt">
                        ANEXAR
                     </button>
                   </div>  
                </div>
                <div className="__stepTed">
                    <img src={step4} alt="" /> 
                    <h1>Aguarde a Confirmação do Pagamento e Ativação da Plataforma</h1>
                </div> 
               
          </div>
          <div className="__buttonFinishTed">
                  <button className="_buttonFinishTed">
                   Finalizar       
                  </button>
                </div>
  </div>
    )
}