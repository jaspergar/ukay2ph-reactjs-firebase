import React, { useEffect } from "react";
import banner from "../images/banner6.jpg";
import "../css/Home.css";
import Category from "../components/homeComponents/Category";
import menCategory from "../images/menCategory.jpg";
import womenCategory from "../images/womenCategory1.jpg";
import boyFashion from "../images/boyFashion.jpg";
import girlFashion from "../images/girlFashion.jpg";
import baby from "../images/baby2.jpg";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../contextApi/StateProvider";
function Home() {
  const history = useHistory();

  const [{user},dispatch] = useStateValue();

  useEffect (() => {
 
    if(user){
      if( user.admin){
        history.push('/sellerProduct/myProduct')
      }else if(!user.admin){
        history.push('/')
      }
    }
    
  }, [user])
  return (
    <div className="home">
      <div className="home__container">
        <img src={banner} className="home__banner" />

        <div className="home__row">
          <Category id="1" title="Men's Fashion" image={menCategory} />
          <Category id="2" title="Women's Fashion" image={womenCategory} />
        </div>

        <div className="home__row">
          <Category id="3" title="Boys Fashion" image={boyFashion} />
          <Category id="4" title="Girls Fashion" image={girlFashion} />
          <Category id="5" title="Baby" image={baby} />
        </div>
      </div>
    </div>
  );
}

export default Home;
