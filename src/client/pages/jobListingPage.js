import React, { useState, useEffect } from "react";
import Button from "../components/button";
import "../../assets/style/listingPage.css";
import Bag from "../../assets/img/bag.png";
import LocationIcon from "../../assets/img/location.png";
import { language } from "../util/constants";
import Header from "../components/header";
import { useHistory } from "react-router-dom";
import LanguageSearch from '../components/languageSearch';
import { useDispatch } from 'react-redux';
import Container from '../../container/container';
import { apiCall } from '../../action/action';

export default function ListingPage() {
    const [appliedList, setApplyList] = useState([]);
    const [userData, setUserData] = useState({});
    const [selectedLangList, setSelectedSortList] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [totalData, setTotalItem] = useState(0);
    const [showFilterTab, setShowFiltertab] = useState(false);
    const [selectedSalaryFilter, setSelectedSalaryFilter] = useState(0);
    const [paginationPosi, setPosition] = useState(200)
    const { jobDataSet, totalItem } = Container();

    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(apiCall(1));
    }, [dispatch])

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        setJobData(jobDataSet);
        setTotalItem(totalItem)
      }, [jobDataSet,totalItem])

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

    const toProfile = () => {
        history.push('/user-profile');
    }

    const selecteListFilter = (i) => {
        let filteredSearchData = [];
        let filteredData = [];
        let dataSet = [...jobDataSet];
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
                    if (element.skills.includes(filteredSearchData[i])) {
                        filteredData.push(element)
                    }
                }
            })
            setJobData([...new Set(filteredData)]);
        } else {
            setJobData(jobDataSet)
        }
    }

    const selectSalaryFilter = (input) => {
        let dataSet = [...jobDataSet];
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

    const getnextSetdata = (position) =>{
        setPosition(position)
        dispatch(apiCall(position))
    }

    const pagination = () => {
        let paginationUI = [];
        let i=1
        while(i<totalData){
            paginationUI.push(i);
            i=i+200;
        }
        return paginationUI.map((i)=>{
            let applied = false
            if (i === paginationPosi) {
                applied = true
            }
            return(
                <Button
                    active={applied}
                    key={i}
                    onClick={() => getnextSetdata(i)}
                    radius="1rem"
                    padding="0.2rem 1rem"
                    margin='0.5rem 0.5rem 0 0'
                    children={i}
                />
            )
        })
    }

    return (
        <React.Fragment>
            <Header toProfile={toProfile} userImg={userData.userImg} />
            <div className="listing-wrapper">
                {!showFilterTab && <Button
                    active={true}
                    onClick={() => setShowFiltertab(!showFilterTab)}
                    radius="1rem"
                    padding="0.2rem 1rem"
                    children='Filter'
                />}
                {showFilterTab && <LanguageSearch showFilterTab={() => setShowFiltertab(false)} language={language} selecteListFilter={selecteListFilter} selectedList={selectedLangList} selectedSalaryFilter={selectedSalaryFilter} selectSalaryFilter={selectSalaryFilter} />}

                {jobData && jobData.length > 0 && jobData.map((i) => {
                    let applied = false
                    if (appliedList.length > 0 && appliedList.indexOf(i.id) >= 0) {
                        applied = true
                    }
                    return (
                        <div key={i.id} className="listing flex-row content-space-between displayFlex align-center">
                            <div className="displayFlex flex-column flex3">
                                <span className="mB1">{i.company} - {i.skills.join(', ')}
                                    {window.innerWidth < 780 && <div style={{ float: "right" }}>
                                        <Button
                                            active={applied}
                                            onClick={!applied ? () => apply(i.id):()=>{}}
                                            radius="1rem"
                                            padding="0.2rem 1rem"
                                            children={applied ? "Applied" : 'Apply'}
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
                                    active ={applied}
                                    onClick={!applied ? () => apply(i.id):()=>{}}
                                    radius="1rem"
                                    padding="0.2rem 1rem"
                                    children={applied ? "Applied" : 'Apply'}
                                    width="5rem"
                                    height="2rem" />
                            }
                        </div>
                    )
                })}
                {pagination()}
            </div>
        </React.Fragment>
    );
}
