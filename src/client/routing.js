import { useHistory } from "react-router-dom";
function LandingPage() {
    let history = useHistory();
    const route=()=>{
        history.replace('/login');
    }

    return(
      <div className="textCenter p10">
       {route()}
      </div>
    );
  
}

export default LandingPage
