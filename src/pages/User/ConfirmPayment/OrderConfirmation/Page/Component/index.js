import './index.css';



export default function OrderComponent(){
    
    return (
            <div className="__contentOrderConfirmation">
            <div className="_contentTitleOrder">
            <div className="__titleOrderConfirmation">
                <h1>Parabens!</h1>
            </div>
            <div className="__subTitleOrderConfirmation">
                <div className="_subTitleOrderConfirmation">
                   <h1>Estamos aguardando a confirmação do pagamento para concluir a abertura de sua conta.</h1>
                </div>
            </div>
            </div>
          
           <div className="_contentDescriptionOrder">
            <div className="__waitConfirmation">
                <div className="__titleWaitConfirmation">
                    <h1>Se você já fez o Pagamento, Por favor aguarde até 72h

                    </h1>
                </div>
                <div className="__subTitleWaitConfirmation">
                    <h1>Se você ainda não Pagou, <p>Clique Aqui</p>Clique Aqui para receber em seu e-mail as instruções de pagamento.</h1>
                </div>
            </div>
            <div className="__needHelp">
                <h1>Precisa de Ajuda? <p>Clique Aqui</p></h1>
            </div>
            </div>
       
       
        </div>
   
    )
}