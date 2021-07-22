import React from "react";

const Button = (props)=> { 
    let { 
        border,
        bColor,
        children,
        padding,
        onClick, 
        radius,
        color,
        width,
        height
      } = props
  return (
    <button 
      onClick={onClick}
      style={{
         backgroundColor: bColor,
         border,
         borderRadius: radius,
         padding,
         color,
         width,
         height,
         boxShadow:"0 0 3px 0 bColor"
      }}
    >
    {children}
    </button>
  );
}

export default React.memo(Button);