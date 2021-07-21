import React, { useState } from "react";
import LOGO from "../../assets/img/logo.png" 
import "../../assets/style/header.css";
function Header(props) {
const [showDropDown, setShow] = useState(false)

    const logout =()=>{
      props.logout()
    }

    return(
      <div className="header">
       <img className="logoImg" src={LOGO} alt="logo" onClick={()=>window.location.reload()}/>
       <img src={LOGO} alt="profilePic" className="logoImg" onClick={()=>setShow(!showDropDown)}/>
       {showDropDown && 
            <div className="userOption">
                <div onClick={()=>logout()}>Logout</div>
           </div>
           }
      </div>
    );
  
}

export default Header
