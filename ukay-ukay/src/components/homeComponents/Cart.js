import React, { useEffect } from "react";

import ad from "../../images/ad2.jpg";
import "../../css/Cart.css";
import Subtotal from "./Subtotal";
import CartProduct from "./CartProduct";
import menTop from "../../images/menTop2.jpg";
import { useStateValue } from "../../contextApi/StateProvider";
import { useHistory } from "react-router-dom";
function Cart() {
  const [{ basket,user }, dispatch] = useStateValue();

  const history = useHistory()

  useEffect (() => {
 
    if(user){
      if( user.admin){
        history.push('/sellerOrder/myOrder')
      }
    }
    }, [user])
 
  console.log(basket)
  return (
    <div className="cart">
      <div className="cart__left">
        <img src={ad} alt="" className="cart__ad" />
        <div className="cart__product">
          <div className="cart__title">
            <h2>Your Shopping Cart</h2>
            <p>Price</p>
          </div>
          <div className="cart__item">
          {basket.map((item) => (
            <CartProduct
            key={item.id}
              id={item.id}
              title={item.title}
              delivery={item.delivery}
              desc={item.desc}
              image={item.image}
              price={item.price}
              rating={item.rating}
              seller={item.seller}
            />
          ))}
          </div>
        </div>
      </div>
      <div className="cart__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Cart;
