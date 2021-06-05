import React, { useState }  from 'react'
import { useEffect } from "react";
import { useStateValue } from "../../contextApi/StateProvider";
import {db} from '../../firebase'
import '../../css/Orders.css'
import Order from './Order';
import {useHistory, withRouter} from 'react-router-dom';


function Orders() {

  const [orders, setOrders] = useState([]);
  const [userFullDetail, setUserFullDetail] = useState([]);

  const [{basket,user},dispatch] = useStateValue();
  const history = useHistory()

  useEffect(() =>{
   let unmounted = false;

  
    if(user){

        if( user.admin){
      history.push('/sellerOrder/myOrder')
    }else if(!user.admin){
      if(!unmounted){
        db.collection('users').doc(user?.uid).collection('orders').orderBy('created','desc')
        .onSnapshot(snapShot => (
          setOrders(snapShot.docs.map(doc => ({
            id: doc.id,
            data : doc.data()
          })))
        ))
        }
    }
    
    }else{
      setOrders([])
    }
   
    const getUserFullDetail =  () => {
           
      if(user){
          db.collection('users').doc(user?.uid).get().then(doc => {
              setUserFullDetail(doc.data()) 
          })
      }
  
    
}
  
    getUserFullDetail();
    return () => {
      unmounted =true;
    }
   
  },[user])

  


  return (
    <div className="orders">
         <h1>My Orders</h1>

         <div className="orders__order"> 
           {orders?.map(order => (
             <Order order={order} userFullDetail={userFullDetail}/>
           ))}

          
         </div>  
    </div>
  )
}

export default withRouter(Orders) 





