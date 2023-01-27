import './index.css'
import React, { useState, useEffect } from "react";
import ShoppingCard from '../ShoppingCard/Cart';
import { AiOutlineClose } from "react-icons/ai";
import apitest from '../../../services/apitest';


export default function ProductView({modalProduct, selectedProduct, setModalProduct}){
    const [cartsVisibility, setCartsVisibility] = useState(false);

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
                   size={40} color={`#FFFFFF`}/>
            </div>
            <div className="__titleCardImg">
              <img src={selectedProduct.imageTitle} alt="" />
            </div>
            <div className="text-2">
             <div className="__productView">
               <div className="__productViewCardImg">
                  <img src={selectedProduct.image} alt="" />
               </div>
             </div>
             <div className="__description">
                <div className="__descriptProductView">
                    <h1>{selectedProduct.description}</h1>
                </div>
                <div className="__buttonProductView">
                   <button className="_buttonProductView" onClick={() => addProductToCart(selectedProduct)}><p>RESERVAR COMUNIDADE</p></button>
                </div>
            </div>
            </div>

           </div>
       
     
            {  
                cartsVisibility == true  ?  <ShoppingCard 
                  cartsVisibility={cartsVisibility}
                  setCartsVisibility={setCartsVisibility}
                  productsInCart={productsInCart}
                  onProductRemove={onProductRemove}
                  setModalProduct={setModalProduct}
                   />: <></>
           } 
          
         </div>  
        </>
      
        
    )
}