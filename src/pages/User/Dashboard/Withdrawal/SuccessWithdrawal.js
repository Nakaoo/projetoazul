import './SuccessWithdrawal.css'

export default function SuccessWithdrawal(){
    return (
        <div className="__containerWithdrawal">
          <div className="__contentSuccessWithdrawal">
            <div className="__titleWithdrawal">
                    Saque
            </div>
            <div className="__successWithdrawal">
                <div className="__titleAvailable">
                    Solicitação Recebida com Sucesso
                </div>
                <div className="__requestWithdrawal">
                    <h2>Valor Solicitado</h2>
                    <h1>R$ 2.850,75</h1>
                    <img src=""></img>
               </div>
            </div>
            <div className="__informationWithdrawal">
                <h1>Informações do Saque:</h1>
                <div className="__infoAccWithdrawal">
                    <div className="_infoAccWithdrawal">
                        <div className="__infoAcc">
                            <h1>Tipo:</h1>
                            <h2>Via PIX</h2>
                        </div>
                        <div className="__infoAcc">
                            <h1>Tipo de Chave:</h1>
                            <h2>CNPJ</h2>
                        </div>
                        <div className="__infoAcc">
                            <h1>Chave:</h1>
                            <h2>414845154/0001</h2>
                        </div>
                    </div>
                    <div className="_infoAccWithdrawal">
                        <div className="__infoAcc">
                            <h1>Operação:</h1>
                            <h2>134574</h2>
                        </div>
                        <div className="__infoAcc">
                            <h1>Data:</h1>
                            <h2>06/01/2023</h2>
                        </div>
                        <div className="__infoAcc">
                            <h1>Valor:</h1>
                            <h2>R$5000,00</h2>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="__buttonSuccWithdrawal">
            <button className="_buttonSuccWithdrawal">
                FINALIZAR
            </button>
          </div>
        </div>
    )
}