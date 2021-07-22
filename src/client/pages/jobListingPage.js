import React, { useState,useEffect} from "react";
import Button from "../components/button";
import "../../assets/style/listingPage.css";
import Bag from "../../assets/img/bag.png";
import LocationIcon from "../../assets/img/location.png";
import { Data } from "../util/constants";
import Header from "../components/header";
import { useHistory } from "react-router-dom";

export default function ListingPage() {
    const [appliedList, setApplyList] = useState([]);
    const [userData, setUserData] = useState({});

    let history = useHistory();
    useEffect(() => {
        if(!sessionStorage.getItem("email")){
           history.push("/")
        }
        let userEmail = sessionStorage.getItem("email");
        let userStoredData = localStorage.getItem(userEmail);
        userStoredData = JSON.parse(userStoredData)
        setUserData(userStoredData)
        console.log(userStoredData)
        if('appliedList' in userStoredData){
            setApplyList(userStoredData.appliedList)
        }
    }, [])

    function apply(id) {
        if (appliedList.indexOf(id) <= 0) {
            setApplyList([...appliedList, id])
            localStorage.setItem(userData.email,JSON.stringify({...userData,appliedList : [...appliedList,id]}))
        }
    }

    const logout =()=>{
        sessionStorage.clear();
        history.replace('/login')
    }

    const toProfile =()=>{
        history.replace('/user-profile')
    }

    return (
        <React.Fragment>
            <Header logout={logout} toProfile={toProfile} userImg = {userData.userImg}/>
        <div className="listing-wrapper">
            {Data.length > 0 && Data.map((i) => {
                let appliedText = { text: "Apply", bColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(203deg, 85%, 52%)", color: "hsl(203deg, 85%, 52%)" }
                if (appliedList.length > 0 && appliedList.indexOf(i.id) >= 0) {
                    appliedText = { text: "Applied", bColor: "hsl(203deg, 85%, 52%)", border: "none", color: "hsl(0, 0%, 100%)" }
                }
                return (
                    <div key={i.id} className="listing flex-row content-space-between displayFlex align-center">
                        <div className="displayFlex flex-column flex3">
                            <span className="mB1">{i.comapny} - {i.skills_required}
                                {window.innerWidth < 780 && <div style={{ float: "right" }}>
                                    <Button
                                        border={appliedText.border}
                                        bColor={appliedText.bColor}
                                        onClick={() => apply(i.id)}
                                        radius="1rem"
                                        padding="0.2rem 1rem"
                                        color={appliedText.color}
                                        children={appliedText.text}
                                        width="5rem"
                                        height="2rem">
                                    </Button>
                                </div>
                                }
                            </span>
                            <div className="displayFlex content-space-between">
                                <div className="flex1">
                                    <img className='bag-icon' src={Bag} alt="bag" />
                                    <span className="subText"> &nbsp;{i.experience}-{i.experience + 3} yrs</span>
                                </div>
                                <div className="flex1">
                                    <img className='loc-icon' src={LocationIcon} alt="location" />
                                    <span className="subText ellpise"> {i.location}</span>
                                </div>
                                <span className="subText flex1 textCenter">{i.date_posted}</span>
                            </div>
                        </div>
                        {window.innerWidth > 780 &&
                            <Button
                                border={appliedText.border}
                                bColor={appliedText.bColor}
                                onClick={() => apply(i.id)}
                                radius="1rem"
                                padding="0.2rem 1rem"
                                color={appliedText.color}
                                children={appliedText.text}
                                width="5rem"
                                height="2rem">
                            </Button>
                        }
                    </div>
                )
            })}
        </div>
        </React.Fragment>
    );
}
