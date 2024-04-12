import React from "react";
function NoTransaction(){
    return(
        <div
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"100%",
            flexDirection:"column",
            marginBottom:"2rem",
        }}
        >
        <p style={{textAlign:"center", fontSize:"1.2rem"}}>
            You Have No Transaction Currently
        </p>
        </div>
    )
}

export default NoTransaction;