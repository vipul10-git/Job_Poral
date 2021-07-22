import React, { useState, useEffect } from "react";
import Button from "../components/button";
import "../../assets/style/listingPage.css";
import Bag from "../../assets/img/bag.png";
import LocationIcon from "../../assets/img/location.png";
import { Data, language } from "../util/constants";
import Header from "../components/header";
import { useHistory } from "react-router-dom";
import LanguageSearch from '../components/languageSearch';

export default function ListingPage() {
    const [appliedList, setApplyList] = useState([]);
    const [userData, setUserData] = useState({});
    const [selectedLangList, setSelectedSortList] = useState([]);
    const [jobData, setJobData] = useState(Data);
    const [showFilterTab, setShowFiltertab] = useState(false);
    const [selectedSalaryFilter, setSelectedSalaryFilter] = useState(0);

    let history = useHistory();

    useEffect(() => {
        if (!sessionStorage.getItem("email")) {
            history.push("/")
        }
        let userEmail = sessionStorage.getItem("email");
        let userStoredData = localStorage.getItem(userEmail);
        userStoredData = JSON.parse(userStoredData)
        setUserData(userStoredData)
        if ('appliedList' in userStoredData) {
            setApplyList(userStoredData.appliedList)
        }
    }, [])

    function apply(id) {
        if (appliedList.indexOf(id) <= 0) {
            setApplyList([...appliedList, id])
            localStorage.setItem(userData.email, JSON.stringify({ ...userData, appliedList: [...appliedList, id] }))
        }
    }

    const logout = () => {
        sessionStorage.clear();
        history.replace('/login')
    }

    const toProfile = () => {
        history.replace('/user-profile')
    }

    const selecteListFilter = (i) => {
        let filteredSearchData = [];
        let filteredData = [];
        let dataSet = [...Data];
        if (selectedLangList.indexOf(i) !== -1) {
            filteredSearchData = selectedLangList.filter(lang => lang !== i)
            setSelectedSalaryFilter(0)
        } else {
            filteredSearchData = [...selectedLangList, i]
        }
        setSelectedSalaryFilter(0)
        setSelectedSortList(filteredSearchData);
        if (filteredSearchData.length > 0) {
            dataSet.forEach(element => {
                for (let i = 0; i < filteredSearchData.length; i++) {
                    if (element.skills_required.includes(filteredSearchData[i])) {
                        filteredData.push(element)
                    }
                }
            })
            setJobData([...new Set(filteredData)]);
        } else {
            setJobData(Data)

        }

    }

    const selectSalaryFilter = (input) => {
        let dataSet = [...Data];
        console.log(selectedSalaryFilter)
        if (input === selectedSalaryFilter) {
            setSelectedSalaryFilter(0);
        } else {
            if (input === 1) {
                dataSet.sort((i, j) => i.Sal - j.Sal)
            } else if (input === 2) {
                dataSet.sort((i, j) => j.Sal - i.Sal)
            }
            setSelectedSalaryFilter(input)
        }
        setSelectedSortList([])
        setJobData(dataSet)
    }

    return (
        <React.Fragment>
            <Header logout={logout} toProfile={toProfile} userImg={userData.userImg} />
            <div className="listing-wrapper">
                {!showFilterTab && <Button
                    border='none'
                    bColor='hsl(203deg, 85%, 52%)'
                    onClick={() => setShowFiltertab(!showFilterTab)}
                    radius="1rem"
                    padding="0.2rem 1rem"
                    color='hsl(0, 0%, 100%)'
                    children='Filter'
                />}
                {showFilterTab && <LanguageSearch showFilterTab={() => setShowFiltertab(false)} language={language} selecteListFilter={selecteListFilter} selectedList={selectedLangList} selectedSalaryFilter={selectedSalaryFilter} selectSalaryFilter={selectSalaryFilter} />}

                {jobData.length > 0 && jobData.map((i) => {
                    let appliedText = { text: "Apply", bColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(203deg, 85%, 52%)", color: "hsl(203deg, 85%, 52%)" }
                    if (appliedList.length > 0 && appliedList.indexOf(i.id) >= 0) {
                        appliedText = { text: "Applied", bColor: "hsl(203deg, 85%, 52%)", border: "none", color: "hsl(0, 0%, 100%)" }
                    }
                    return (
                        <div key={i.id} className="listing flex-row content-space-between displayFlex align-center">
                            <div className="displayFlex flex-column flex3">
                                <span className="mB1">{i.company} - {i.skills.join(', ')}
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
                                            height="2rem" />
                                    </div>
                                    }
                                </span>
                                <div className="displayFlex content-space-between">
                                    <div className="flex1">
                                        <img className='bag-icon' src={Bag} alt="bag" />
                                        <span className="subText"> &nbsp;{i.exp}-{i.exp + 3} yrs</span>
                                    </div>
                                    <div className="flex1">
                                        <img className='loc-icon' src={LocationIcon} alt="location" />
                                        <span className="subText ellpise"> {i.loc}</span>
                                    </div>
                                    <span className="subText flex1 textCenter">&#8377; {i.Sal}</span>
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
                                    height="2rem" />
                            }
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    );
}
