import React from 'react'
import { Route,Redirect } from "react-router-dom";
import { useStateValue } from '../../contextApi/StateProvider';

function SecuredRoute({ component: Component, ...otherRoutes }) {
    const [{user},dispatch] = useStateValue();
    return  ( 
    <Route
    {...otherRoutes}
    render={(props) =>{
      if(user) {
       
        return <Component {...props} />
       } else {
        return (<Redirect to={{pathname: '/signin' , state: {from: props.location} }} />)
        // <Redirect to="/signin" />
       }
    }}
  />
    )
}

export default SecuredRoute


