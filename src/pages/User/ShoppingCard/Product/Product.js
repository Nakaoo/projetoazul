
// eslint-disable-next-line
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatCurrencyFront } from "../../../../utils/removeMask";
// eslint-disable-next-line
export default function ({productsInCart, onProductRemove}) {
let taxValue = 0;

/* alterar quantidade de produto 
<span className="product-quantity">
                  <h1>Quantidade</h1>
                <select
               className="count-product-quantity"
               value={product.count}
               onChange={(event) => {
                onQuantityChange(
                    product.id,
                    event.target
                    .value
                );
               }}>
                {[
                    ...Array(
                        10
                    ).keys(),
                ].map(number => {
                    const num = number + 1;
                    return (
                        <option 
                          value={
                            num
                          }
                          key={num}>
                            {num}
                          </option>
                    )
                })
                }
               </select>
</span> */

    return (
        <div className="cart-products-payment">
        {productsInCart.lenght === 0 && (
            <span className="empty-text">
            Carrinho Vazio
            </span>
        )}
        {productsInCart.map((product) => (
            <div className="cart-product" key={product.id}>
              <h1 className="cart-product-title">Resumo do Pedido</h1>
              <div className="cart-product-img">
              <img src={product.image} alt="" />
              </div>
              <div className="product-info">
                <span className="product-price">
                  <h1>{product.name}</h1>
                  <h2>{formatCurrencyFront(product.price)}</h2>
                </span>
                <span className="product-subtotal">
                  <h1>CDI</h1>
                  <h2>{(product.cdi * 100).toFixed(2)}%</h2>
                </span>
                <span className="product-delivery">
                  <h1>Taxa</h1>
                  <h2>R$ 0</h2>
                </span>
                <span className="product-delivery">
                  <h1>Entrega</h1>
                  <h2>Gr??tis</h2>
                </span>
                <span className="total-products-car">
                  <h1>Subtotal</h1>
                  <h2>{formatCurrencyFront((parseFloat(product.price, 2) + taxValue).toFixed(2))}</h2>
                </span>
                {/* <span className="remove-item-car">
                  <h1>Remover Produto</h1>
                   <button 
              className="btn remove-btn"
              onClick={() => 
                onProductRemove(product) 
             }>
                
                <RiDeleteBin6Line size={20} />
             </button>
                </span> */}
              </div>
             

            
            </div>
        ))} 
            
      </div>
    )
}