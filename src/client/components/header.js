import React, { Fragment, useState } from "react";
import LOGO from "../../assets/img/logo.png"
import "../../assets/style/header.css";

function Header(props) {
  const { logout, toProfile, userImg } = props;
  const [showDropDown, setShow] = useState(false)

  return (
    <Fragment>
    <div className="header">
      <img className="logoImg" src={LOGO} alt="logo" onClick={() => window.location.reload()} />
      <img src={userImg ? userImg : LOGO} alt="profilePic" className="user-logo-img" onClick={() => setShow(!showDropDown)} />
      
    </div>
    {showDropDown &&
      <div className="profileOption">
        <div onClick={() => logout()} className='userOption-list'>Logout</div>
        <div onClick={() => toProfile()} className='userOption-list'>Profile</div>
      </div>
    }
    </Fragment>
  );

}

export default React.memo(Header)
