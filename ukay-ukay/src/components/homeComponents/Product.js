import React,{useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import { useStateValue } from "../../contextApi/StateProvider";
import "../../css/Product.css";
import {storage,db} from "../../firebase"


function Product(props) {
  const [fileUrl , setFileUrl] = useState(null);
  const [cart, setCart] = useState({
    id: props.id,
    title: props.title,
    image: props.image,
    price: props.price,
    seller: props.seller,
    desc: props.desc,
    rating: props.rating,
    delivery: props.delivery
  });
  

  // const [state, dispatch] = useStateValue(); //original
  const [{ basket,user }, dispatch] = useStateValue(); //for checking the basket
  const history = useHistory();
  console.log("this is the basket ->>>>>>>", basket);


  
  

  const addToBasket = async (e) => {
    e.preventDefault();
    if(user){
       setCart(prevState => {
         return { ...prevState, 
        
          id: prevState.id,
          title: prevState.title,
          image: prevState.image,
          price: prevState.price,
          seller: prevState.seller,
          desc: prevState.desc,
          rating: prevState.rating,
          delivery: prevState.delivery
        }
       })
      
       
   
      // add product to the firestore and image to storage
      
    //   const file = cart.image
    //   const storageRef = storage.ref()
    //   const fileRef = storageRef.child(file)
    //   await fileRef.put(file)
    //   setFileUrl(await fileRef.getDownloadURL())
    //   console.log(fileUrl)
  
    //   db.collection('users').doc(user?.uid).collection('cart').doc(cart.title).set({
    //     product:cart,
    //     productImage: fileUrl
    // })
      
   // retrieve product from firestore

  //  db.collection('users').doc(user?.uid).collection('cart')
  //  .onSnapshot(snapShot => (
  //    setCart(snapShot.docs.map(doc => ({
  //      id: doc.id,
  //      data : doc.data()
  //    })))
  //  ))

     // dispatch retrieve product to ADD_TO_BASKET
     dispatch({
       type: "ADD_TO_BASKET",
       item: cart           
     });


    
    }else{
        history.push("/signin")
    }
  
  };


  return (
    <div className="product">
      <Link to="/pview" className="product__link">
        <div className="product__info">
          <img src={props.image} alt="" className="product__image" />

          <div className="product__title">
            <h3>{props.title}</h3>
            <p>by {props.seller}</p>
          </div>

          <p className="product__desc">{props.desc}</p>
          <div className="product__rating">
            {Array(props.rating)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
          </div>
          <p className="product__price">
            <small>&#8369;</small>
            <strong>{props.price}</strong>
          </p>
        </div>
      </Link>
      <button onClick={addToBasket}>add to cart</button>
      <p className="product__delivery">{props.delivery}</p>
    </div>
  );
}

export default Product;
