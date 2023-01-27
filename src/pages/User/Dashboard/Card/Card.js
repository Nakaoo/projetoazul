import leftArrow from "../../../../assets/img/leftArrow.svg"
import rightArrow from "../../../../assets/img/rightArrow.svg"
import limitBar from "../../../../assets/img/limitBar.svg"
import './Card.css'
import { useState, useEffect } from "react"

import RequestWithdrawal from "../Withdrawal/RequestWithdrawal"


export default function Card({products, balanceUser}) {
const [modalWithdrawal, setModalWithdrawal] = useState(false);

let product = [];
if (Array.isArray(products)) {
     product = products[0];
  }

    return (
        <>      
         {
           modalWithdrawal == true ?
           <RequestWithdrawal setModalWithdrawal={setModalWithdrawal}/> : <></> }
        <div className="__divisionCardCommunity">
          
            <div className="__cardLimit">
                <div className="__productsCards">
                <img src={leftArrow} className="__arrows" />
         
                    <div className="__imgCard-">
                      <img src={product?.image} className="__imgProduct" />
                    </div>
              
                <img src={rightArrow} className="__arrows" />
                </div>
                <div className="__limitBar">
                    <img src={limitBar} alt="" />
                </div>
                <div className="__limitValue">
                    <h1>valor minimo para saque:</h1>
                    <h2>R$2.850/ R$5.000</h2>
                </div>

            </div>
        </div>
           <div className="__contentLimit">
            <div className="__divisionLimit">
                <div className="__valueLimit">
                    <div className="__currentBalance">
                        <h2>R$</h2>
                        <h1>{balanceUser}</h1>
                        <h3>Saldo Atual</h3>
                    </div>
                    <div className="__income">
                        <h1>{product.cdi}</h1>
                        <h2>Rendimentos</h2>      
                    </div>
                    <div className="__cashBack">
                        <h1>{product.cashback}</h1>
                        <h2>Cashback</h2>   
                    </div>
                    
                </div>
              
            </div>
            <div className="__buttonRequest">
                        <button onClick={() => setModalWithdrawal(true)}>
                            <h1>SOLICITAR SAQUE</h1>
                        </button>
            </div>
            </div>
            </>
    )
}