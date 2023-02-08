import './index.css'
import React, { useState, useEffect } from "react";
import ShoppingCard from '../ShoppingCard/Cart';
import { AiOutlineClose } from "react-icons/ai";
import apitest from '../../../services/apitest';


export default function ProductView({ modalProduct, selectedProduct, productsApi, setModalProduct, id }) {
  const [cartsVisibility, setCartsVisibility] = useState(false);
  const [product, setProduct] = useState('');
  
  const [productsInCart, setProductsInCart] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "shopping-cart"
        )
      ) || []
    );

  useEffect(() => {
    localStorage.setItem(
      "shopping-cart",
      JSON.stringify(productsInCart)
    )
  })

  const addProductToCart = (product) => {
    setCartsVisibility(true);
    /* verifica se já foi adicionado o mesmo produto
     let novoArray = JSON.parse(localStorage.getItem("shopping-cart")); */
    /* novoArray.forEach(function (item, index) {
         if(item.id == product.id){
          console.log(productsInCart)           
         }
     });*/

     setProduct(product);
    const newProduct = {
      ...product,
      count: 1,
    }
    setProductsInCart([

      newProduct,
    ]);
  }
  localStorage.getItem("shopping-cart");


  // adicionar quantidade
  /* const onQuantityChange = (
       productId,
       count
     ) => {
       setProductsInCart((oldState) => {
         const productsIndex = 
          oldState.findIndex(
           (item) =>
             item.id === productId
          );
         if (productsIndex !== -1) {
           oldState[productsIndex].count =
             count;
         }
         return [...oldState];
       });
     }; */

  const onProductRemove = (product) => {
    setProductsInCart((oldState) => {
      const productsIndex =
        oldState.findIndex(
          (item) =>
            item.id === product.id
        );
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  //pega o id do usuário para fazer alteração dos dados
  /* 
   useEffect(() => {
     FetchUser();
   }, [])
  const [userId, setUserId] = useState();
   async function FetchUser(){
     await apitest 
     .get(`user`)
     .then(response => {
       setUserId(response.data.id)
     })
     .catch(err => console.log(err));
   }*/

  useEffect(() => {
    console.log(productsApi)
  })

  return (
    <>
      <div
        className="__modalProductView"
        style={{
          display: modalProduct
            ? "flex"
            : "none",
        }}>
        <div className="teste-div">

          <div className="__closedProductView">
            <AiOutlineClose onClick={() => setModalProduct(false)}
              size={40} color={`#FFFFFF`} />
          </div>

          <div className='__option_energy_content'>
            <div className='__option_energy_header'>
              <h3>O quanto deseja investir?</h3>
              <span>Escolha o tipo de investimento da sua preferência para<br />continuar o processo</span>
            </div>
            <div className='__option_energy_header_map'>
              {productsApi.filter((val, index) => val?.category_id == 1).map((val, index) => {
                return (
                    <div className={`product ${val.title}`} onClick={() => addProductToCart(val)} key={index+1} >
                      <img src={val.image} title={`${val.title} - R$ ${val.price} - CDI ${(val.cdi * 100).toFixed(2)}%`}></img>
                    </div>
                )
              })}
            </div>
          </div>
        </div>


        {
          cartsVisibility == true ? <ShoppingCard
            cartsVisibility={cartsVisibility}
            setCartsVisibility={setCartsVisibility}
            productsInCart={productsInCart}
            onProductRemove={onProductRemove}
            setModalProduct={setModalProduct}
            id={id}
            product={product}
          /> : <></>
        }

      </div>
    </>


  )
}