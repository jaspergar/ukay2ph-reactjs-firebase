import React,{useEffect} from "react";
import SubcategoryRow from "./SubcategoryRow";
import "../../css/Subcategory.css";
import menTop from "../../images/menTop.jpg";
import menBottom from "../../images/bottomMen.jpg";
import menFootwear from "../../images/menFootwear.jpg";
import menBags from "../../images/menBags7.jpg";
import { useStateValue } from "../../contextApi/StateProvider";
import { useHistory } from "react-router-dom";



function Subcategory()  {
  const history = useHistory();

  const [{user},dispatch] = useStateValue();
  
  useEffect (() => {
  
    if(user){
      if( user.admin){
        history.push('/sellerOrder/myOrder')
      }
    }
  }, [user])
  
    return (
      <div className="subcategory">
        <div className="subcategory__container">
          <div className="subcategory__info">
            <h1 className="subcategory__title">The Men's Fashion</h1>
            <p className="subcategory__desc">
              Choose and Shop all the men's fashion wear.
            </p>
          </div>

          <div className="subcategory__row">
            <SubcategoryRow id="1" title="Top" image={menTop} />
            <SubcategoryRow id="2" title="Bottom" image={menBottom} />
            <SubcategoryRow id="3" title="Footwear" image={menFootwear} />
            <SubcategoryRow id="4" title="Bags" image={menBags} />
          </div>
        </div>
      </div>
    );
  
}

export default Subcategory;
