import React from "react";
import Header from "../componets/Header";
import SignupSigninComponent from "../componets/SignupSignin";
function Signup () {
    return(
        <div>
         <Header></Header>
         <div className="wrapper">
            <SignupSigninComponent></SignupSigninComponent>
         </div>
        </div>
       
    )
}

export default Signup;