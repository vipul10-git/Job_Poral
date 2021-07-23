import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/button";
import Container from '../../container/dataContainer';
import { getUserSelectedList, clearReducer } from '../../action/action';
import { useDispatch } from 'react-redux';
import '../../assets/style/userProfile.css';
import JobList from '../components/joblist';

export default function UserProfile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [jobData, setJobData] = useState({});
    const [userData, setUserData] = useState({});
    const { jobDataSet } = Container();

    useEffect(() => {
        if (!sessionStorage.getItem("email")) {
            history.push("/")
        }
        let userEmail = sessionStorage.getItem("email");
        let userStoredData = localStorage.getItem(userEmail);
        userStoredData = JSON.parse(userStoredData)
        setUserData(userStoredData);
        dispatch(clearReducer());
        if ('appliedList' in userStoredData) {
            dispatch(getUserSelectedList(userStoredData.appliedList))
        }
    }, [])

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        setJobData(jobDataSet);
    }, [jobDataSet])

    const logout = () => {
        sessionStorage.clear();
        history.replace('/login')
    }

    const openGithub = (url) => {
        console.log(url)
        window.open(url);
    }

    let { userImg, name, mobile, githubAccName, email, linkedIn, gitProjSelected, collegeInfo } = userData;

    return (
        <React.Fragment>
            
            <div className="listing-wrapper">
                {userData && Object.keys(userData).length > 0 && <div className='user-Profile-section'>
                    <div>
                        {userImg && <img src={userImg} alt='user-img' />}
                        {!userImg && <div className='dummyImage noImg'>No image</div>}
                        <div>{name}</div>
                        <div>{name && `+91 ${mobile}`}</div>
                        <div>{email}</div>
                        <Button
                            active={false}
                            onClick={() => logout()}
                            radius="1rem"
                            padding="0.5rem 1rem"
                            margin='1rem'
                            children="Logout"
                            bColor="var(--errorColor)"
                            border="none"
                            color="var(--white)"
                        />
                    </div>
                    <table>
                        <tbody>
                        {collegeInfo && <Fragment><tr><th>College Name</th><td>{collegeInfo.collegeName}</td></tr>
                        <tr><th>College Last Date</th><td>{collegeInfo.collegeLastDate}</td></tr></Fragment>}
                        {linkedIn && <tr><th>LinkedIn</th><td>{linkedIn}</td></tr>}
                        {githubAccName && <tr><th>GitHub</th><td>{githubAccName}</td></tr>}
                        </tbody>
                    </table>
                    <div>
                        {gitProjSelected && <strong>GitHub Project</strong>}
                        {gitProjSelected?.map(i => {
                            return (
                                <div key={i.name} onClick={() => openGithub(i.gitUrl)}>{i.name}</div>
                            )
                        })
                        }
                    </div>
                </div>
                }

                {jobData.length > 0 && <div style={{marginLeft:'1rem'}}><strong>Applied Jobs</strong></div>}
                <JobList jobData={jobData} btnReq={false} />
            </div>

        </React.Fragment>
    );
}
