import React, { useState } from "react"
import './ChooseAffiliate.css'
import MenuBar from '../../../../components/MenuBar/index'
import ProductView from "../../ProductView/index"
import { useEffect } from "react"
import axios from "axios"
import { HiMenu } from "react-icons/hi"
import { UserContext } from "../../../../hooks/UserContext"
import { useContext } from "react"
import { getProducts } from "../../utils/apiFunctions"

function Afiliado({ menu }) {
  const [modalProduct, setModalProduct] = useState(false);
  const [productsApi, setProductsApi] = useState();

  async function getAllProducts() {
    const response = await getProducts()

    console.log(response)

    setProductsApi(response?.data.result)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  // selecionar produto
  const [selectedProduct, setSelectedProduct] = useState([]);

  const SelectedProduct = (product) => {
    setModalProduct(true)
    setSelectedProduct(product)
  }

  return (
    <div className="__container">
      <div className="__division-card">
        <div className="__title">

          <h1>Projeto Solar</h1>
          <h3>Faça seu investimento do futuro hoje mesmo!</h3>
        </div>

        <div className="__cardsDivision">
          {
            productsApi?.map((product, index) => (
              <div key={index} className="__card-MyHart">
                <div className="__cardImgMyHart">
                  <img src={product.image} onClick={() => SelectedProduct(product)} />
                </div>
                <div className="__cardImgTitleMyHart">
                  <img src={product.title} />
                </div>

              </div>

            ))
          }

        </div>

        {
          modalProduct == true ?
            <ProductView
              modalProduct={modalProduct}
              setModalProduct={setModalProduct}
              selectedProduct={selectedProduct}
            /> : <></>
        }
      </div>
    </div>
  )
}


export default Afiliado