import React from "react";

const Input = (props) => {
    let {
        errorType,
        type,
        value,
        placeholder,
        onChange,
        onClick,
        autoFocus 
    } = props
    return (
        <input
            className={errorType ? "flex1 borderError" : "flex1"}
            type = {type}
            value = {value}
            placeholder={placeholder}
            onChange = {onChange}
            onClick = {onClick}
            autoFocus = {autoFocus}
        />
    );
}

export default Input;