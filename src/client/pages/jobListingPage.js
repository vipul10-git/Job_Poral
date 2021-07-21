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
    let history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem("email")){
           history.push("/")
        }
    }, [])

    function apply(id) {
        if (appliedList.indexOf(id) >= 0) {
            let idAfterRemoved = appliedList.filter(function (item) {
                return item !== id
            })
            setApplyList(idAfterRemoved)
        } else {
            setApplyList([...appliedList, id])
        }
    }

    const logout =()=>{
        localStorage.clear();
        history.push('/login')
    }

    return (
        <React.Fragment>
            <Header logout={logout}/>
        <div className="listing-wrapper">
            {Data.length > 0 && Data.map((i) => {
                let appliedText = { text: "Apply", bColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(178, 60%, 55%)", color: "hsl(178, 60%, 55%)" }
                if (appliedList.length > 0 && appliedList.indexOf(i.id) >= 0) {
                    appliedText = { text: "Applied", bColor: "hsl(178, 60%, 55%)", border: "none", color: "hsl(0, 0%, 100%)" }
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
