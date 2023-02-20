import React, { useState } from "react"
import './ChooseAffiliate.css'
// eslint-disable-next-line
import MenuBar from '../../../../components/MenuBar/index'
import ProductView from "../../ProductView/index"
// eslint-disable-next-line
import { useEffect } from "react"
// eslint-disable-next-line
import axios from "axios"
// eslint-disable-next-line
import { HiMenu } from "react-icons/hi"
// eslint-disable-next-line
import { UserContext } from "../../../../hooks/UserContext"
// eslint-disable-next-line
import { useContext } from "react"
// eslint-disable-next-line
import { getProducts } from "../../utils/apiFunctions"
import { globalImg } from "../../../../utils/globalImg"

function Afiliado({ menu, id, productsApi }) {
  const [modalProduct, setModalProduct] = useState(false);
  let cardImg = globalImg.cardImg

  // selecionar produto
  // eslint-disable-next-line
  const [selectedProduct, setSelectedProduct] = useState([]);

// eslint-disable-next-line
  const SelectedProduct = (product) => {
    setModalProduct(true)
    setSelectedProduct(product)
  }

  function handleModalOpen(){
    setModalProduct(true)
  }
  return (
    <div className="__division-card">
      <div className="__title">

        <h1>Projeto Solar</h1>
        <h3>Faça seu investimento do futuro hoje mesmo!</h3>
      </div>

      <div className="__cardsDivision">
        <div className="__choose_img">
          <img src={cardImg} alt="CardImg" />
        </div>
        <div className="__choose_text">
          <div className="__choose_text">
            <div className="__choose_text_title">Rendimentos</div>
            <div className="__choose_text_content">Valor atual líquido (VPN) 23'480'677.07 BRL</div>
            <div className="__choose_text_content">Rendimentos (ROI) 2043.6%</div>
            <div className="__choose_text_content">Dividendos pagos 119'568''571.74 BRL</div>
          </div>

          <div className="__choose_text_buttons">
            <button className="__chose" onClick={handleModalOpen}>Investir agora mesmo</button>
          </div>
        </div>
      </div>

      {
        modalProduct === true ?
          <ProductView
            modalProduct={modalProduct}
            setModalProduct={setModalProduct}
            productsApi={productsApi}
            id={id}
          /> : <></>
      }
    </div>
  )
}


export default Afiliado