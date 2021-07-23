import {useEffect} from 'react';
import { useHistory } from "react-router-dom";
function LandingPage() {
    let history = useHistory();

    useEffect(() => {
      if(sessionStorage.getItem('email')){
        history.goBack();
      }else{
        history.replace('/login');
      }
    })
    return(<></>)
}

export default LandingPage
