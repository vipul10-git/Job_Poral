import React from "react";
import { useHistory } from "react-router-dom";

export default function UserProfile() {
    let history = useHistory();
    const logout = () => {
        sessionStorage.clear();
        history.replace('/login')
    }
    return (
        <React.Fragment>
        </React.Fragment>
    );
}
