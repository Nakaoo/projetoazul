
import "./Cart.css";
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line
import { IoMdReturnLeft } from "react-icons/io";
import Payment from '../Payment/Payment';
import Product from '../ShoppingCard/Product/Product'
// eslint-disable-next-line
import apitest from '../../../services/apitest'
// eslint-disable-next-line
import api from '../../../services/api';

function ShoppingCard({
    setCartsVisibility,
    cartsVisibility,
    productsInCart, 
    onProductRemove,
    id,
    setModalProduct,
    product
}) {
  
   // method payment *api bloqueando cors 
  /*const [methodPayment, setMethodPayment] = useState(); 
  useEffect(() => {
    var optionMethod = {
      method: 'GET',
      url: 'https://api.esgtechpower.com/api/v1/methodpayment/',
      headers: {
        Authorization: `Bearer ${tokenUser}`,
        Accept: 'application/json'
      }
    };
    axios.request(optionMethod).then(function (response) {
      setMethodPayment(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, []) */


   return (
        <div
         className="modal"
         style={{
            display: cartsVisibility
             ? "block"
             : "none", 
         }}>
        <div className="shoppingCart">
       
          <div className="headerShoppingCart">
          </div>
        <div className="content-products-payment">
        <div className="__content-payment-card_">
          <Product productsInCart={productsInCart}
                   onProductRemove={onProductRemove}
                   product={product}
                  />
          <Payment 
          productsInCart={productsInCart} 
          setCartsVisibility={setCartsVisibility} 
          setModalProduct={setModalProduct}
          id={id}
          product={product}
          />
        </div>
       </div>
      </div>
    </div>
    )
}

export default ShoppingCard;