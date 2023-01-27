
import graphic1 from '../../../../assets/img/graphic-1.svg'
import graphic2 from '../../../../assets/img/graphic-2.svg'
import viewMore from '../../../../assets/img/viewMore.svg'
import { message } from 'antd'
import './Resumo.css'
import { BsPersonSquare } from "react-icons/bs"
import { AiOutlineFall } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';


export default function Resumo({pessoa}){
    const navigate = useNavigate();

    
    async function copiarLink(){
        let range = document.createRange();
        range.selectNode(document.getElementById('email_indicacao'));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
  
        message.success("Link copiado");
    }


    return(
        <>
          <div className="__cardSummary">
            <div className="_contentCardIndication">
             
            <div className="_contentCard">
              <div className="_cardIndication">
                <div className="_divisionCardIndication">
                 <div className="_totalCardIndicationTitle">
                   <h1>Total de Indicações</h1>
                   <h1>11</h1>
                 </div>
                
                <div className="_percentageIndication">
                    <div className="_percentage">
                        <div className="_iconPercentage">
                        <div>
                          <AiOutlineFall color={'#D9534F'} />
                        </div>
                        <h1>127%</h1>
                        </div>
                       
                        <h2>Que o mês passado</h2>
                    </div>
                </div>
                </div>
                <div className="_userIndication">
                  <BsPersonSquare color={'#2CB67D'} size={30}/>
                </div>
               
              </div>
            
              <div className="_cardIndication">
                <div className="_divisionCardIndication">
                 <div className="_totalCardIndicationTitle">
                   <h1>Total de Indicações</h1>
                   <h1>11</h1>
                 </div>
                
                <div className="_percentageIndication">
                    <div className="_percentage">
                        <div className="_iconPercentage">
                        <div>
                          <AiOutlineFall color={'#D9534F'} />
                        </div>
                        <h1>127%</h1>
                        </div>
                       
                        <h2>Que o mês passado</h2>
                    </div>
                </div>
                </div>
                <div className="_userIndication">
                  <BsPersonSquare color={'#2CB67D'} size={30}/>
                </div>
               
              </div>
            </div>

            <div className="_contentCard">
              <div className="_cardIndication">
                <div className="_divisionCardIndication">
                 <div className="_totalCardIndicationTitle">
                   <h1>Total de Indicações</h1>
                   <h1>11</h1>
                 </div>
                
                <div className="_percentageIndication">
                    <div className="_percentage">
                        <div className="_iconPercentage">
                        <div>
                          <AiOutlineFall color={'#D9534F'} />
                        </div>
                        <h1>127%</h1>
                        </div>
                       
                        <h2>Que o mês passado</h2>
                    </div>
                </div>
                </div>
                <div className="_userIndication">
                  <BsPersonSquare color={'#2CB67D'} size={30}/>
                </div>
               
              </div>
            
              <div className="_cardIndication">
                <div className="_divisionCardIndication">
                 <div className="_totalCardIndicationTitle">
                   <h1>Total de Indicações</h1>
                   <h1>11</h1>
                 </div>
                
                <div className="_percentageIndication">
                    <div className="_percentage">
                        <div className="_iconPercentage">
                        <div>
                          <AiOutlineFall color={'#D9534F'} />
                        </div>
                        <h1>127%</h1>
                        </div>
                       
                        <h2>Que o mês passado</h2>
                    </div>
                </div>
                </div>
                <div className="_userIndication">
                  <BsPersonSquare color={'#2CB67D'} size={30}/>
                </div>
               
              </div>
            </div>

              </div>
              <div className="__myCommunity">
                <div className="__summaryTitle" onClick={() => navigate("/community")}>Minha Comunidade</div>
                <h1>Seu Link de Indicação:</h1>
                <div className="__linkIndication">
                    <input type="text" name="teste" id="email_indicacao" value={window.location.hostname + `/cadastro?ref=${pessoa}`} disabled=""
                        className="__inputIndications" />

                    <button className="__buttonIndications" onClick={copiarLink}>COPIAR</button>
                </div>
                <div className="__favorites">
                    <div className="__people">
                        <img alt="" />
                        <div className="__peopleName">
                            Ana
                        </div>
                    </div>
                    <div className="__people">
                        <img alt="" />
                        <div className="__peopleName">
                            Monica
                        </div>
                    </div>
                    <div className="__people">
                        <img alt="" />
                        <div className="__peopleName">
                            James
                        </div>
                    </div>
                    <div className="__people">
                        <img alt="" />
                        <div className="__peopleName">
                            Mike
                        </div>
                    </div>
                    <div className="__people">
                        <img alt="" />
                        <div className="__peopleName">
                            Mia
                        </div>
                    </div>
                    <a onClick={() => navigate("/community")}>Ver Todos</a>
                </div>
            </div>
            <div className="__cardRewards">
                <div className="__rewards">
                    <div className="__rewardTitle">
                        Recompensas
                        <img src={viewMore} alt="" />
                    </div>
                    <h2>R$1,750.23</h2>
                    <h3>Ultimos 30 dias</h3>
                    <img src={graphic1} alt="" />
                </div>
                <div className="__incomeAmounts">
                    Income Amounts
                    <img src={graphic2} alt="" />
                </div>
            </div>


          </div>

          
            
            </>
    )
}