import React, { useState } from "react";
import LOGO from "../../assets/img/logo.png" 
import "../../assets/style/header.css";

function Header(props) {
  const {logout , toProfile , userImg} = props;
const [showDropDown, setShow] = useState(false)

    return(
      <div className="header">
       <img className="logoImg" src={LOGO} alt="logo" onClick={()=>window.location.reload()}/>
       <img src={userImg ? userImg : LOGO} alt="profilePic" className="user-logo-img" onClick={()=>setShow(!showDropDown)}/>
       {showDropDown && 
            <div className="userOption">
                <div onClick={()=>logout()}>Logout</div>
                <div onClick={()=>toProfile()}>Profile</div>
           </div>
           }
      </div>
    );
  
}

export default React.memo(Header)
