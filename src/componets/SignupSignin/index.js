import React, { useState } from 'react';
import './style.css';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import {db, auth , provider } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc ,getDoc} from "firebase/firestore"; 
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
function SignupSigninComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(false);
    const navigate = useNavigate();
    function signupWithEmail() {
        //Autthenticate the user , or basically create a new account using email and password
        console.log("Name", name);
        console.log("email", email);
        console.log("password", password);
        console.log("confirmpassword", confirmPassword);
        setLoading(true);

        if (name != "" && email != "" && password != "" && confirmPassword != "") {
            if (password == confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        console.log("User>>>", user);
                        toast.success("user created");
                        setLoading(false);
                        setName("");
                        setPassword("");
                        setEmail("");
                        setConfirmPassword("");
                        createDoc(user);
                        navigate("/dashboard");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage);
                        setLoading(true);

                    });
            } else {
                toast.error("Password and confirm password don't match!");
                setLoading(false);
            }

        }
        else {
            toast.error("All fields are mendatory");
            setLoading(false);
        }
    }

    function loginUsingEmail() {
        console.log("Email", email);
        console.log("password", password);
        setLoading(true);
        if ( email != "" && password != ""){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                toast.success("User Logged In!");
                console.log("userd Logged in",user);
                navigate("/dashboard");
                setLoading(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage);
                setLoading(false);
            });
        }else{
            toast.error("All fields are mendatory");
            setLoading(true);
            setLoading(false);
        }

        
    }

   async function createDoc(user) {
     setLoading(true);
    if(!user)return;
    const useRef = doc(db,"users",user.uid);
    const userData = await getDoc(useRef);
    if(!userData.exists()){
        try{
            await setDoc(doc(db,"users",user.uid),{
                name:user.displayName ? user.displayName : name ,
                email:user.email,
                photoURL : user.photoURL ? user.photoURL : "",
                createdAt:new Date()
            });
    
            toast.success("Doc Created!");
            setLoading(false);
        }catch(e){
            toast.error(e.message);
            setLoading(false);
        }
    }else{
        toast.error("Doc already Exist");
        setLoading(false);
    }

    }

    function googleAuth(){
        setLoading(true);
        try{

            signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("User>>>",user);
    createDoc(user);
    setLoading(false);
    navigate("/dashboard");
    toast.success("user authenticated");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
  });

        }catch(e){
            toast.error(e.message);
            setLoading(false);
        }
        
    }
    return (

        <>
            {loginForm ? (<div className='signup-wrapper'>
                <h2 className='title'>Login on<span style={{ color: "var(--theme)" }}>Financely.</span></h2>
                <form>

                    <Input
                        type={"email"}
                        label={"Email"}
                        state={email}
                        setState={setEmail}
                        placeholder={"Sakshipadamwar2002@gmail.com"}
                    ></Input>
                    <Input
                        type={"password"}
                        label={"Password"}
                        state={password}
                        setState={setPassword}
                        placeholder={"Example@123"}
                    ></Input>
                    <Button
                        disabled={loading}
                        text={loading ? "Loading..." : "Login Using Email and Password"}
                        onClick={loginUsingEmail}></Button>
                    <p style={{ textAlign: "center", margin: 0 }}>or</p>
                    <Button
                        onClick={googleAuth}
                        text={loading ? "Loading..." : "Login Using Google"}
                        blue={true}></Button>
                    <p className="p-login" style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>or Don't Have An Account ? Click here</p>
                </form>
            </div>) : (<div className='signup-wrapper'>
                <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span></h2>
                <form>
                    <Input
                        label={"Full name"}
                        state={name}
                        setState={setName}
                        placeholder={"Sakshi Padamwar"}
                    ></Input>
                    <Input
                        type={"email"}
                        label={"Email"}
                        state={email}
                        setState={setEmail}
                        placeholder={"Sakshipadamwar2002@gmail.com"}
                    ></Input>
                    <Input
                        type={"password"}
                        label={"Password"}
                        state={password}
                        setState={setPassword}
                        placeholder={"Example@123"}
                    ></Input>
                    <Input
                        type={"password"}
                        label={"Confirm Passoword"}
                        state={confirmPassword}
                        setState={setConfirmPassword}
                        placeholder={"Example@123"}
                    ></Input>
                    <Button
                        disabled={loading}
                        text={loading ? "loading..." : "Signup Using Email and Password"}
                        onClick={signupWithEmail}></Button>
                    <p className='p-login'>or</p>
                    <Button
                        onClick={googleAuth}
                        text={loading ? "Loading..." : "Signup Using Google"}
                        blue={true}></Button>
                    <p className="p-login" style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}> or Have An Account Already ? Click Here </p>
                </form>
            </div>)}

        </>
    )
}

export default SignupSigninComponent;