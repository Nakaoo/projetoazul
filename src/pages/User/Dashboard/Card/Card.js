import leftArrow from "../../../../assets/img/leftArrow.svg"
import rightArrow from "../../../../assets/img/rightArrow.svg"
import limitBar from "../../../../assets/img/limitBar.svg"
import './Card.css'
import { useState, useEffect } from "react"
import { globalImg } from "../../../../utils/globalImg"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line
export default function Card({ products, balanceUser, pessoa }) {
    // eslint-disable-next-line
    const [modalWithdrawal, setModalWithdrawal] = useState(false);
    const cardImg = globalImg.cardImg
    const navigate = useNavigate();

    // eslint-disable-next-line
    let product = [];
    if (Array.isArray(products)) {
        // eslint-disable-next-line
        product = products[0];
    }

    useEffect(() => {
        console.log(pessoa)
    })
    return (
        <>
            <div className="__divisionCardCommunity">

                <div className="__cardLimit">
                    <div className="__productsCards">
                        <img src={leftArrow} className="__arrows" alt="" />

                        <div className="__imgCard-">
                            <img src={cardImg} className="__imgProduct" alt="" />
                        </div>

                        <img src={rightArrow} className="__arrows" alt="" />
                    </div>
                    <div className="__limitBar">
                        <img src={limitBar} alt="" />
                    </div>
                    <div className="__limitValue">
                        <h1>valor minimo para saque:</h1>
                        <h2>R$ 00.00 / R$ 1.000</h2>
                    </div>

                </div>
            </div>
            <div className="__contentLimit">
                <div className="__divisionLimit">
                    <div className="__valueLimit">
                        <div className="__currentBalance">
                            <span className="__current_balance_amount"><span className="__current_balance_currency">R$</span> {pessoa?.wallet?.balance}</span>
                            <span className="__current_balance_description">Saldo Atual</span>
                        </div>
                        <div className="__income">
                            <span className="__income_balance_amount"><span className="__income_balance_currency">R$</span> {pessoa?.invertmentb ?? 0}</span>
                            <span className="__income_balance_description">Rendimentos</span>
                        </div>
                        <div className="__income">
                            <span className="__income_balance_amount"><span className="__income_balance_currency">R$</span> 0.00</span>
                            <span className="__income_balance_description">Cashback</span>
                        </div>
                        <div className="__income">
                            <span className="__income_balance_amount"><span className="__income_balance_currency">R$</span> {pessoa?.invertment ?? 0}</span>
                            <span className="__income_balance_description">Investimento</span>
                        </div>
                    </div>

                </div>
                <div className="__buttonRequest">
                    <button onClick={() => navigate('/withdraw')}>
                        <h1>SOLICITAR SAQUE</h1>
                    </button>
                </div>
            </div>
        </>
    )
}