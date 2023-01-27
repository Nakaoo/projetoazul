import './index.css'

import {FcApproval} from "react-icons/fc"

export default function OrderPlaced(){
    return (
      <>
      <div className="__contentPlacedOrder">
        <div className="__orderContent">
          <div className="_orderContent">
            <div className="__titleOrderPlaced">
                <h1>Pagamento</h1>
            </div>
            <div className="__orderConfirmed">
                <h1>Pedido Efetuado Com Sucesso!</h1>
                  <FcApproval size={70} />
                <h2>Parabens!</h2>
            </div>
            <div className="__waitingPayment">
                <div className="_waitingPayment">
                  <h1>Estamos aguardando a confirmação do pagamento para concluir a abertura de sua conta.
                  </h1>
                </div>
              
            </div>
            <div className="__detailsOrderPlaced">
                <div className="__titleDetailsOrderPlaced">
                    <h1>Detalhes do Pedido:</h1>
                </div>
                <div className="__infoUserOrderPlaced">
                    <div className="_infoUserOrderPlaced">
                        <div className="__dataUserPlaced">
                            <h1>Tipo:</h1>
                            <h2>Via PIX</h2>
                        </div>
                        <div className="__dataUserPlaced">
                            <h1>Tipo da Chave:</h1>
                            <h2>cpf</h2>
                        </div>
                        <div className="__dataUserPlaced">
                            <h1>Chave:</h1>
                            <h2>44541548/21</h2>
                        </div>
                    </div>
                    <div className="_infoUserOrderPlaced">
                    <div className="__dataUserPlaced">
                            <h1>Operação:</h1>
                            <h2>134647</h2>
                        </div>
                        <div className="__dataUserPlaced">
                            <h1>Data:</h1>
                            <h2>12/21/21</h2>
                        </div>
                        <div className="__dataUserPlaced">
                            <h1>Valor:</h1>
                            <h2>R$ 2500,00</h2>
                        </div>
                    </div>
                </div>
            </div>
         </div>
       </div>
       <div className="_buttonOrderPlaced">
         <button className="__buttonOrderPlaced">
           Concluir
          </button>
       </div>
        
        </div>
        </>
    )
}