import React, { Component, useEffect } from "react";
import "../../css/Item.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Product from "./Product";
import menTop from "../../images/menTop.jpg";
import menTop1 from "../../images/menTop1.jpg";
import menTop2 from "../../images/menTop2.jpg";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../contextApi/StateProvider";
function Item()  {
  const history = useHistory();

  const [{user},dispatch] = useStateValue()
  
  useEffect (() => {
 
  if(user){
    if( user.admin){
      history.push('/sellerOrder/myOrder')
    }
  }
  }, [user])
    return (
      <div className="item">
        <div className="item__sortnav">
          <p>sort function here</p>
        </div>
        <div className="item__container">
          <div className="item__sidecategory">
            <div className="item__back">
              <ArrowBackIosIcon className="item__arrowback" />
              <p>{/*dynamic*/}Back</p>
            </div>

            <h3 className="item__categorytitle">{/*dynamic*/}Top</h3>
            {/*item will be dynamic*/}
            <div className="item__categoryrow">
              <p className="item__category">Shirts</p>
              <p className="item__category">Polo</p>
              <p className="item__category">Sweaters</p>
              <p className="item__category">Jackets</p>
              <p className="item__category">Fashion Hoodie</p>
            </div>
            <h3 className="item__categorytitle">Brand</h3>
            <div className="item__categoryrow">
              <div className="item__brand">
                {/*dynamic*/}
                <input type="checkbox" />
                <p className="item__category">Adidas</p>
                </div>
                <div className="item__brand">
                <input type="checkbox" />
                <p className="item__category">H&M</p>
                </div>
                <div className="item__brand">
                <input type="checkbox" />
                <p className="item__category">Nike</p>
                </div>
                <div className="item__brand">
                <input type="checkbox" />
                <p className="item__category">Lacoste</p>
                </div>
                <div className="item__brand">
                <input type="checkbox" />
                <p className="item__category">Penshoppe</p>
                </div>
              
            </div>

            
          </div>
          <div className="item__content">
            <div className="item__info">
              <h1 className="item__title">title</h1>
              <p className="item__desc">Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="item__row">
              <Product
                key={9}
                id={9}
                image={menTop}
                title="Forever21"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={578.79}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
                key={8}
                id={8}
                image={menTop1}
                title="THE COMFY Original"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={344.23}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
              key={7}
                id={7}
                image={menTop2}
                title="Not Guilty"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={654.90}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
              key={6}
                id={6}
                image={menTop1}
                title="THE COMFY Original"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={999.99}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
              key={5}
                id={5}
                image={menTop2}
                title="UnderArmor"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={235.77}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
              key={4}
                id={4}
                image={menTop}
                title="H&M"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={998.77}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
              key={3}
                id={3}
                image={menTop2}
                title="Nike"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={477.56}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
              key={2}
                id={2}
                image={menTop1}
                title="Adidas"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={709.34}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
              key={1}
                id={1}
                image={menTop}
                title="Penshoppe"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={423.34}
                delivery="free shipping"
                seller="mr.gar"
              />
              <Product
                key={10}
                id={10}
                image={menTop2}
                title="Penshoppe"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, odio."
                rating={5}
                price={599.34}
                delivery="free shipping"
                seller="mr.gar"
              />
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default Item;
