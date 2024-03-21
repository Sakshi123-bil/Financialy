import React, { useEffect } from "react";
import './style.css';
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const Header = () =>{
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(()=>{
         if(user){
            navigate("/dashboard");
         }
    },[user,loading]);
    function logoutFnc(){

        try{
             signOut(auth).then(()=>{
                toast.success("Logged out Successfully!");
                navigate("/");

             }).catch((error)=>{
                toast.error(error.message);
             });
        }catch(e){
            toast.error(e.message);
        }
    }


    return(
        <div className="Navbar">
             <p  className="logo">Financely</p>
             {user && (<p onClick={logoutFnc} className="logo link">Logout</p>) }
             
            
        </div>
    )
}

export default Header;