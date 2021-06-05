import React, { isValidElement,useEffect,useState } from "react";
import "../css/Header.css";
import logo from "../images/logo.png";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../contextApi/StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [isLoggedIn , setIsLoggedIn] = useState(false);

  useEffect(()=>{
       if(user){
         setIsLoggedIn(true)
       }
  },[user])

  const handleAuthentication = () => {
    if (user) {
      setIsLoggedIn(false);
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logoContainer">
          <Link to="/">
            <img src={logo} className="header__logo" />
            <h1>UKAY2PH</h1>
          </Link>
        </div>

        <div className="header__search">
          <input type="text" className="header__searchInput" />
          <SearchIcon className="header__searchIcon" />
        </div>
        <div className="header__nav">
          <Link to={!user ? "/signin" : "/buyeraccount"} className="header__link">
            <div  className="header__option">
              <span className="header__optionOne">
                Welcome {!user ? 'Guest' : user.email}
              </span>
              <span className="header__optionTwo">
                {user ? "Manage your profile" : "Sign In"}
              </span>
            </div>
          </Link>
          <Link to={user?"/orders":"/signup"} className="header__link">
            <div className="header__option">
              <span className="header__optionOne">{user? "View my" : "No Account?"}</span>
              <span className="header__optionTwo"> {user?"Orders" : "Sign Up"}</span>
            </div>
          </Link>
          {/* {
            isLoggedIn &&
            <Link to="/sellerOrder/myOrder" className="header__link" >
            <div className="header__option" >
              <span className="header__optionOne">Become a</span>
              <span className="header__optionTwo">Seller</span>
            </div>
          </Link>
          } */}
          
          <Link className="header__link" to="/cart">
            <div className="header__basket">
              <ShoppingBasketIcon />
              <span className="header__optionTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
          
            <div className="header__option" onClick={handleAuthentication}>
              <span className="header__optionLogout"> {user && "Logout"}</span>
            </div>
     
        </div>
      </div>
    </div>
  );
}

export default Header;
