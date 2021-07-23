import React from "react";
import '../../assets/style/button.css';
const Button = (props) => {
  let {
    border,
    bColor,
    children,
    padding,
    onClick,
    radius,
    color,
    width,
    height,
    margin,
    active
  } = props
  return (
    <button
      onClick={onClick}
      className={active ? 'activeBtn' : active === false && 'inActiveBtn'}
      style={{
        backgroundColor: bColor,
        border,
        borderRadius: radius,
        padding,
        color,
        width,
        height,
        margin,
      }}
    >
      {children}
    </button>
  );
}

export default React.memo(Button);