import React, { useEffect, useState } from 'react';
import "./Cart.css";
import { IoMdReturnLeft } from "react-icons/io";
import Payment from '../Payment/Payment';
import Product from '../ShoppingCard/Product/Product'
import apitest from '../../../services/apitest'

function ShoppingCard({
    setCartsVisibility,
    cartsVisibility,
    productsInCart, 
    onProductRemove,
    userId,
    setModalProduct,
}) {
  
  const [orderPayment, setOrderPayment] = useState(); 


   // adiciona produto para criar order
   let product = [];
   for (let i=0; i< productsInCart.length; i++){
    let id = productsInCart[i]?.uuid;
    let qtt = productsInCart[i]?.count;
    product.push({id: id, qtt: qtt})
   }

     useEffect(() => {
      CreateOrder();
   },[])

   // atual função para criar order
   async function CreateOrder() {
    await apitest.
    post(`order`, {
      product: product
    })
    .then(response => {
        setOrderPayment(response.data.result)
        console.log("create order", response)
    })
    .catch(err => console.error(err)); 
   }

   // method payment *api bloqueando cors 
  /*const [methodPayment, setMethodPayment] = useState(); 
  useEffect(() => {
    var optionMethod = {
      method: 'GET',
      url: 'https://api.dkawasaka.com/api/v1/methodpayment/',
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
             <IoMdReturnLeft  size={30}  onClick={() => setCartsVisibility(false)}/>
            
          </div>
        <div className="content-products-payment">
        <div className="__content-payment-card_">
          <Product productsInCart={productsInCart}
                   onProductRemove={onProductRemove}
                  />
          <Payment 
          productsInCart={productsInCart} 
          OrderPayment={orderPayment} userId={userId} 
          setCartsVisibility={setCartsVisibility} 
          setModalProduct={setModalProduct}
          />
        </div>
       </div>
      </div>
    </div>
    )
}

export default ShoppingCard;