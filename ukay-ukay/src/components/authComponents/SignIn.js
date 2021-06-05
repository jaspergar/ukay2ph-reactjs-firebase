import React, { useEffect, useLayoutEffect, useState } from "react";
import logo from "../../images/logo.png";
import "../../css/SignIn.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { useStateValue } from "../../contextApi/StateProvider";
import classnames from "classnames"

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState('');

  const [{user},dispatch] = useStateValue();

  useEffect (() => {
    if(user && user.admin){
      history.push('/sellerOrder/myOrder')
    }else if(user && !user.admin){
      history.push('/')
    }
  }, [user])

  const signIn = (e) => {
    e.preventDefault();

    //firebase auth
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if(auth){
         
          if(auth.user && auth.user.admin){
            history.push('/sellerOrder/myOrder')
          }else if(auth.user && !auth.user.admin){
            history.push('/sellerOrder/myOrder')
          }
        }
          
        
      })
      .catch((error) => setErrors(error.message));
  };

  return (
    <div className="signin">
      <div className="signin__container">
        <Link to="/">
          <div className="signin__logocontainer">
            <img src={logo} className="signin__logo" />
            <h1>UKAY2PH</h1>
          </div>
        </Link>
        <div className="signin__formcontainer">
        {errors && (
                    <div className="invalid-feedback">{errors}</div>
                  )}
          <h1>Sign-in</h1>
          <form action="" className="signin__form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classnames("signin__input",{
                "is-invalid": errors
              })}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classnames("signin__input",{
                "is-invalid": errors
              })}
            />
            <button
              type="submit"
              onClick={signIn}
              className="signin__signinbutton"
            >
              Sign-in
            </button>
          </form>
          <p className="signin__conditions">
            By continuing, you agree to Ukay2PH's Conditions of Use and Privacy
            Notice.
          </p>
        </div>

        <p className="signin__new">New to Ukay2PH?</p>
        <div className="signin__signupbutton">
          <Link to={"/signup"}>
            <button>Create your Ukay2PH account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
