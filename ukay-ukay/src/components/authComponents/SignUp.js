import React, { useEffect, useState,useRef } from "react";
import logo from "../../images/logo.png";
import "../../css/SignUp.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useStateValue } from "../../contextApi/StateProvider";
import {db} from "../../firebase"
import classnames from "classnames"

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [errors, setErrors] = useState('');
  const [cnumber ,setCnumber] = useState("");
  const [zip, setZip] = useState('');
  const [address ,setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState('');
  

  const [{user},dispatch] = useStateValue();

  useEffect (() => {
    // user && history.push('/') 
    if(user && user.admin){
      history.push('/sellerOrder/myOrder')
    }else if(user && !user.admin){
      history.push('/')
    }
  }, [user])

  const signUp = (e) => {
    e.preventDefault();

    if(password !== cpassword ){
      return setErrors('Passwords Do not match')
    }else if(fullname === '' || cnumber === '' || zip === '' || address === '' || detailAddress === ''){
      return setErrors('All fields are required')
    }
   
    try {
          setErrors("")
          auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
            //if successful create a new user with email and password
            return db.collection('users').doc(auth.user.uid).set({
              fullname:fullname,
              cnumber:cnumber,
              zip:zip,
              address:address,
              detailAddress:detailAddress
              
          });
          
          }).then((auth) =>{
                 if(auth){
                   history.push("/")
                 }
          })
          .catch((error) =>  setErrors(error.message));
    } catch{
          setErrors("Failed to create an account")
    }
  
  };
    
  return (
    <div className="signup">
      <div className="signup__container">
        <Link to="/">
          <div className="signup__logocontainer">
            <img src={logo} className="signup__logo" />
            <h1>UKAY2PH</h1>
          </div>
        </Link>
        <div className="signup__formcontainer">
        {errors && (
                    <div className="invalid-feedback">{errors}</div>
                  )}
          <h1>Sign-up</h1>
          <form action="" className="signup__form">
           <div className="signup_formdivider">
            <label htmlFor="fullname" className="signup__labelpassword">
              Full name
            </label>
            <input
            
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
            />

            <label htmlFor="email" className="signup__labelemail">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
            />

            <label htmlFor="password" className="signup__labelpassword">
              Password
            </label>
            <input
           
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
              placeholder="At least 6 characters"
            />

            <label htmlFor="cpassword" className="signup__labelpassword">
              Re-enter password
            </label>
            <input
           
              type="password"
              id="cpassword"
              name="cpassword"
              value={cpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
            />
            </div>

            <div className="signup_formdivider">
            <label htmlFor="cnumber" className="signup__labelcnumber">
              Contact Number
            </label>
            <input
              type="text"
              id="cnumber"
              name="cnumber"
              value={cnumber}
              onChange={(e) => setCnumber(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
            />
                <label htmlFor="zip" className="signup__labelzip">
              ZIP
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
            />

<label htmlFor="address" className="signup__labeladdress">
              Address : Region/Province/City/Barangay
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder="e.g Visayas/Cebu/Cebu City/Guadalupe"
              onChange={(e) => setAddress(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
            />

<label htmlFor="detailAddress" className="signup__labeldetailAddress">
              Detail Address
            </label>
            <input
              type="text"
              id="detailAddress"
              name="detailAddress"
              value={detailAddress}
              placeholder="Unit No.,Building,street and etc..."
              onChange={(e) => setDetailAddress(e.target.value)}
              className={classnames("signup__input",{
                "is-invalid": errors
              })}
            />

              <button
              type="submit"
              onClick={signUp}
              className="signup__signupbutton"
            >
              Sign-up
            </button>
            <p className="signup__conditions">
            By creating an account, you agree to Ukay2PH's Conditions of Use and
            Privacy Notice.
          </p>
            </div>

           
          </form>
         
        </div>

        <p className="signup__new">
          Already have an account?{" "}
          <Link to="/signin" className="signup__link">
            <span>Sign-in</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
