// import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../contextApi/StateProvider";
import "../../css/Subtotal.css";
import React from "react";
import { getBasketTotal } from "../../contextApi/reducer";
import {  useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const history = useHistory();

  const proceedToCheckout = e => {
    e.preventDefault()

   basket.length <= 0 ? alert("No item added to cart. Please add item to cart before checkout.") : history.push('/checkout')
     
    
  }

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong><span>&#8369;</span>{value}</strong>
            </p>

            {/* <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small> */}
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        // prefix={"P"}
      />
      <button onClick={proceedToCheckout} className="subtotal__button">Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
