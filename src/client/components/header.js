import React, { Fragment } from "react";
import LOGO from "../../assets/img/logo.png"
import "../../assets/style/header.css";

function Header(props) {
  const {toProfile, userImg } = props;

  return (
    <Fragment>
    <div className="header">
      <img className="logoImg" src={LOGO} alt="logo" onClick={() => window.location.reload()} />
      <img src={userImg ? userImg : LOGO} alt="profilePic" className="user-logo-img" onClick={() => toProfile()} /> 
    </div>
    </Fragment>
  );

}

export default React.memo(Header)
