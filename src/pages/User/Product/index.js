import './index.css'
import React, { useState, useEffect, useCallback } from "react";
import ShoppingCard from '../ShoppingCard/Cart';
import { getProducts } from '../utils/apiFunctions';
import { useOutletContext } from 'react-router-dom';

export default function ProductList() {
    const [accountType, people] = useOutletContext();
    const [cartsVisibility, setCartsVisibility] = useState(false);
    const [product, setProduct] = useState('');
    const [productsApi, setProductsApi] = useState();

    let id = people.wallet.id

    async function getAllProducts() {
        const response = await getProducts()

        setProductsApi(response?.data.result)
    }

    const callBackEffect = useCallback(async () => {
        await getAllProducts();
    }, []);

    useEffect(() => {
        callBackEffect();
    }, [callBackEffect])

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
        <div className="__division-card">
            <div className="__title">
                <h2>Selecione seu produto</h2>
                <h3>Escolha um dos produtos abaixo</h3>
            </div>

            <div className='__option_energy_header_map_new'>
                {productsApi?.filter((val) => val?.category_id === 1 && val?.is_active === 1).map((val, index) => {
                    return (
                        <div className={`product_new`} onClick={() => addProductToCart(val)} key={index + 1} >
                            <h5>{val.title}</h5>
                            <img src={val.image} title={`${val.title} - R$ ${val.price} - CDI ${(val.cdi * 100).toFixed(2)}%`}></img>
                            <h5>R${val.price}</h5>
                        </div>
                    )
                })}
            </div>

            {
                cartsVisibility === true ? <ShoppingCard
                    cartsVisibility={cartsVisibility}
                    setCartsVisibility={setCartsVisibility}
                    productsInCart={productsInCart}
                    onProductRemove={onProductRemove}
                    id={id}
                    product={product}
                    firstBuy="true"
                /> : <></>
            }
        </div>
    )
}