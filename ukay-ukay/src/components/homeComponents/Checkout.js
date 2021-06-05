import { Link, useHistory,withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../contextApi/StateProvider'
import CartProduct from './CartProduct';
import "../../css/Checkout.css"
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../contextApi/reducer';
import axios from '../../axios'
import {db} from "../../firebase"
import Modal from '../reuseableComponents/Modal'
import UserFullDetailsForm from "../reuseableComponents/UserFullDetailsForm"


function Checkout() {
  
    const history = useHistory();

   
    //stripe 
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setprocessing] = useState("")
    const[error, setError] =useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setclientSecret] = useState(true);
    const [userFullDetail, setUserFullDetail] = useState([]);
    const [openModal,setOpenModal] = useState(false)
    const [paymentMethod,setPaymentMethod] = useState('');

    const [{basket,user},dispatch] = useStateValue();

    

    useEffect(() => {
         //generate the special stripe secret which allows me to charge a customer
      let cleanup =false
      
    
         const getClientSecret = async () => {
             if(!cleanup){
                const response = await axios({
                    method:"post",
                    //Stripe expects the total in a currencies subunits
                    url:`/payments/create?total=${getBasketTotal(basket) * 100}`
                })
                setclientSecret(response.data.clientSecret)
             }
               
         }
            getClientSecret();

        // if(user){
        //     db.collection('users').doc(user?.uid).get().then(doc => {
        //         setUserFullDetail(doc.data()) 
        //     })
        // }
            
    return () => {
        cleanup =true;
      }

    }, [basket])


    useEffect(() => {
        // generate the special stripe secret which allows me to charge a customer
     let cleanup =false
     
        const getUserFullDetail =  () => {
            if(!cleanup){
                if(user){
                    db.collection('users').doc(user?.uid).get().then(doc => {
                        setUserFullDetail(doc.data()) 
                    })
                }
            }
              
        }
        getUserFullDetail();

      
           
   return () => {
       cleanup =true;
     }

   }, [openModal])


    console.log('The secret is >>>',clientSecret)
    console.log("user",user)
    console.log("the user full details >>>",userFullDetail)

    const handleSubmit = async (e) =>{
           e.preventDefault();
           setprocessing(true);

           const payload = await stripe.confirmCardPayment(clientSecret,{
               payment_method: {
                   card: elements.getElement(CardElement)
               }
           }).then(({paymentIntent}) =>{
               //paymentIntent = payment confirmation
               
              //adding orders to firebase firestore database
                db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    basket:basket,
                    amount:paymentIntent.amount,
                    created:paymentIntent.created
                })

               setSucceeded(true);
               setError(null)
               setprocessing(false)

               dispatch({
                   type:'EMPTY_BASKET'
               })

               history.replace('/orders')
           })
    }

    const handleChange = e =>{
        //listen for changes in the CardElement
        //and Display any errors as the  customer types their card

        setDisabled(e.empty);
        setError(e.error? e.error.message:"");

    }
    return (
        <div className="checkout">
           <Modal title={"Edit Delivery Details"} openModal={openModal} setOpenModal={setOpenModal}>
              <UserFullDetailsForm initialValue={userFullDetail} user={user} db={db} openModal={openModal} setOpenModal={setOpenModal} />
           </Modal>
           <div className="checkout__items">
           <h1>Checkout ( <Link to={'/cart'}><span> {basket?.length} items</span> </Link> ) </h1>
           </div>

           <div className="checkout__container">
              <div className="checkout__title">
                    <h1>Delivery Address</h1>
                </div>
                <div className="checkout__addressinfo">
                    <p>{userFullDetail.fullname}</p>
                    <p>{user?.email}, {userFullDetail.cnumber}</p>
                    <p>{userFullDetail.address} &nbsp; {userFullDetail.detailAddress},{userFullDetail.zip}</p>
                </div>
                    <div className="checkout__editaddress">
                
                        <h4 onClick={() => setOpenModal(true)}>Edit Address</h4>
            
                    </div>
            </div>

               <div className="checkout__container">
                    <div className="checkout__title">
                        <h1>Review Delivery Items</h1>
                    </div>
                    <div className="checkout__iteminfo">
                        {basket.map(item =>(
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

             <div className="checkout__container">
             <div className="checkout__title">
              <h1>Payment Method</h1>
              </div>
                 <div className="checkout__paymentinfo">
                     <div className="checkout__paymentMethod">
                           <button>COD</button>
                           <button>Credit/Debit Card</button>
                     </div>
                     <p>Card details</p>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
 
                            <div className="checkout__ordertotal">
                                    <CurrencyFormat
                                    renderText={(value) => (
                                            <p> Order Total: <strong><span>&#8369;</span>{value}</strong></p>
                                        )}
                                            decimalScale={2}
                                            value={getBasketTotal(basket)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            // prefix={"P"}
                                        />
                            
                                        <button disabled={processing || disabled || succeeded} className="checkout__button">
                                        <span>{processing? <p>processing</p> : "Buy now"}</span>
                                        </button>
                            </div>

                              {error && <div>{error}</div>}
                        </form>
                   
                     
                 </div>
             </div>
         
        </div>
    )
}

export default withRouter(Checkout)
