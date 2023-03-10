
import './Resumo.css'
import graphic1 from '../../../../assets/img/graphic-1.svg'
import graphic2 from '../../../../assets/img/graphic-2.svg'
import viewMore from '../../../../assets/img/viewMore.svg'
import { message } from 'antd'
// eslint-disable-next-line
import { BsPersonSquare } from "react-icons/bs"
// eslint-disable-next-line
import { AiOutlineFall } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs'
import { formatCurrencyFront } from '../../../../utils/removeMask'
// eslint-disable-next-line
export default function Resumo({ pessoa, multinivel, multiniveltotal, sumMultiNivel }) {
  const navigate = useNavigate();


  async function copiarLink() {
    let range = document.createRange();
    range.selectNode(document.getElementById('email_indicacao'));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    message.success("Link copiado");
  }


  return (
    <>
      <div className="__cardSummary">

        <div className="__user_dashboard_cards">
          <div className="__user_dashboard_card">
            <div className="__user_dashboard_card_addon"><p className="__user_dashboard_card_addon_title">Total de indicações</p><span className="__user_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__user_dashboard_card_value">{pessoa?.indication?.total ?pessoa?.indication?.total : 0 }</span>
            <div className="__user_dashboard_last_addon"><span className="__user_dashboard_last_addon_percentage"></span><span className="__user_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__user_dashboard_card">
            <div className="__user_dashboard_card_addon"><p className="__user_dashboard_card_addon_title">Saldo a liberar</p><span className="__user_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__user_dashboard_card_value">{formatCurrencyFront(pessoa?.lockwallet?.balance)}</span>
            <div className="__user_dashboard_last_addon"><span className="__user_dashboard_last_addon_percentage"></span><span className="__user_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__user_dashboard_card">
            <div className="__user_dashboard_card_addon"><p className="__user_dashboard_card_addon_title">Indicações pendentes</p><span className="__user_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__user_dashboard_card_value">{pessoa?.indication?.total > 0 ? pessoa?.indication?.total - pessoa?.active?.active : 0}</span>
            <div className="__user_dashboard_last_addon"><span className="__user_dashboard_last_addon_percentage"></span><span className="__user_dashboard_card_explanation">que o mês passado</span></div>
          </div>

          <div className="__user_dashboard_card">
            <div className="__user_dashboard_card_addon"><p className="__user_dashboard_card_addon_title">Indicações aprovadas</p><span className="__user_dashboard_card_addon_people"><BsFillPersonFill /></span></div>
            <span className="__user_dashboard_card_value">{pessoa?.active?.active > 0 ? pessoa?.active?.active : "0"}</span>
            <div className="__user_dashboard_last_addon"><span className="__user_dashboard_last_addon_percentage"></span><span className="__user_dashboard_card_explanation">que o mês passado</span></div>
          </div>
        </div>

        <div className="__myCommunity">
          <div className="__summaryTitle" onClick={() => navigate("/community")}>Meus Indicados</div>
          <h1>Seu Link de Indicação:</h1>
          <div className="__linkIndication">
            <input type="text" name="teste" id="email_indicacao" value={window.location.hostname + `/cadastro?ref=${pessoa?.user.person.nickname}`} disabled=""
              className="__inputIndications" />

            <button className="__buttonIndications" onClick={copiarLink}>COPIAR</button>
          </div>

        </div>
        <div className="__cardRewards">
          <div className="__rewards">
            <div className="__rewardTitle">
              Recompensas
              <img src={viewMore} alt="" />
            </div>
            <h2>0</h2>
            <h3>Ultimos 30 dias</h3>
            <img src={graphic1} alt="" />
          </div>
          <div className="__incomeAmounts">
            Histórico de Recompensas
            <img src={graphic2} alt="" />
          </div>
        </div>


      </div>



    </>
  )
}