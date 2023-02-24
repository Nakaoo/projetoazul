import './PendingOrder.scss';

export default function PendingOrder() {

    return (
        <div className="__contentOrderConfir">
            <div className="__orderComponent">
                <div className="__contentOrderConfirmation">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1>Parabens!</h1>
                        </div>
                        <div className="col-lg-12 text-center">
                            Estamos aguardando a confirmação do pagamento para concluir a abertura de sua conta.
                        </div>

                        <div className="col-lg-12 small mt-3">
                            Se você já fez o Pagamento, Por favor aguarde até 72h
                        </div>
                        <div className="col-lg-12 small mt-3">
                            Se você ainda não Pagou, <a className='text-link'>Clique Aqui</a> Clique Aqui para receber em seu e-mail as instruções de pagamento.
                        </div>

                        <div className="col-lg-12 small mt-5">
                            Precisa de Ajuda? <a className='text-link' href="mailto:esgtechadm@gmail.com">Clique Aqui</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}