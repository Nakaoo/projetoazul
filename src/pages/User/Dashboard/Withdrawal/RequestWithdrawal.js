import './RequestWithdrawal.css'
import {AiFillDollarCircle} from "react-icons/ai"


export default function Withdrawal() {
   return (
      <div className="__containerWithdrawal">
        <div className="__contentWithdrawal">
        <div className="__modalWithdrawal">
            <div className="__titleWithdrawal">
                <h1>Saque</h1>
            </div>
            <div className="__availableWithdrawal">
                <div className="__titleAvailable">
                    <h1>Disponivel para Saque</h1>
                </div>
                <div className="__valueWithdrawal">
                    <div className="_valueWithdrawal">
                      <h1>R$ 2.850,75</h1>
                      <AiFillDollarCircle size={26} color={'#0058FF'}/>
                    </div>
                    <h2>Todo o Periodo</h2>
                </div>
            </div>
            <div className="__infoWithdrawal">
                <h1>Informações de Saque</h1>
            </div>
            <div className="__formWithdrawal">
                <h1>Forma de Saque</h1>
                <select className="_formWithdrawal">
                    <option className="_optionWithdrawal">
                    <h1>Selecione uma Opção</h1>
                    </option>
                </select>
            </div>
            <div className="__desiredValue">
                <h1>Valor desejado</h1>
                <form>R$ 500,00</form>
            </div>
        </div>
        <div className="__saveInfo"><h1>Salvar informações de Saque para operações futuras.</h1></div>
        <div className="__buttonWithdrawal">
            <button className="__buttonWithdrawalCancel">
                Cancelar
            </button>
            <button className="__buttonWithdrawalRequest">
                Solicitar
            </button>
        </div>
        </div>
      </div>

   )
}