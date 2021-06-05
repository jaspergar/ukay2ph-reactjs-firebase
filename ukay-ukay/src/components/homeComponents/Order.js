import React from 'react'
import '../../css/order.css'
import moment from "moment"
import CartProduct from './CartProduct'
import CurrencyFormat from 'react-currency-format';

function Order(props) {
    return (
        <div className="order">
            <div className="order__info">
              <div className="order__id">
              <h2>Order</h2>
              <p >
                    <small>{props.order.id}</small>
              </p>
              </div>
           
              <p>Placed on {moment.unix(props.order.data.created).format("MMMM Do YYYY, h:mma")}</p>

              <p>{props.userFullDetail.address} &nbsp; <span> {props.userFullDetail.detailAddress} </span> &nbsp; <span> {props.userFullDetail.zip} </span></p>
              
            </div>
             
              {props.order.data.basket?.map(item => (

                <CartProduct
              id={item.id}
              title={item.title}
              delivery={item.delivery}
              desc={item.desc}
              image={item.image}
              price={item.price}
              rating={item.rating}
              seller={item.seller}
              hideButton
            />
              ))}
              <CurrencyFormat 
              renderText={(value) => (
                      <p className="order__total"> Order Total: <strong><span>&#8369;</span>{value}</strong></p>
                  )}
                      decimalScale={2}
                      value={props.order.data.amount / 100}
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"P"}
                  />
        </div>
    )
}

export default Order
