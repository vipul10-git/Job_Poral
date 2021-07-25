import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/button";
import Container from '../../container/dataContainer';
import { getUserSelectedList, clearReducer } from '../../action/action';
import { useDispatch } from 'react-redux';
import '../../assets/style/userProfile.css';
import JobList from '../components/joblist';
import Loader from "../components/loader";
import dummyImage from "../../assets/img/dummyUser.png"

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
        window.open(url);
    }

    let { userImg, name, mobile, githubAccName, email, linkedIn, gitProjSelected, collegeInfo } = userData;

    return (
        <Fragment>

            <div className="listing-wrapper">
                {userData && Object.keys(userData).length <= 0 && <Loader height='50vh'/>}
                {userData && Object.keys(userData).length > 0 && <div className='user-Profile-section'>
                    <div>
                        <img src={userImg ? userImg : dummyImage} alt='user-img' className='mB1' />
                        <table>
                            <tbody>
                                {name ? <tr><th>Name</th><td>{name}</td></tr> : null}
                                {mobile ? <tr><th>Mobile No.</th><td>{mobile}</td></tr>  : null}
                                {email ? <tr><th>Email</th><td>{email}</td></tr>  : null}
                            </tbody>
                        </table>
                    </div>
                    <table>
                        <tbody>
                            {collegeInfo?.collegeName ?<tr><th>College Name</th><td>{collegeInfo.collegeName}</td></tr>:null}
                            {collegeInfo?.collegeLastDate ? <tr><th>College Last Date</th><td>{collegeInfo.collegeLastDate}</td></tr> : null}
                            {linkedIn ? <tr><th>LinkedIn</th><td>{linkedIn}</td></tr> : null}
                            {githubAccName ? <tr><th>GitHub</th><td>{githubAccName}</td></tr> : null}
                       
                    {gitProjSelected?.length > 0 &&
                        <tr>
                            <th>GitHub Project</th>
                            <td>
                                <ul>
                            {gitProjSelected?.map(i => {
                                return (
                                    <li key={i.name} style={{cursor:'pointer'}} onClick={() => openGithub(i.gitUrl)}>{i.name}</li>
                                )
                            })
                            }
                            </ul>
                            </td>
                        </tr>
                    }
                     </tbody>
                    </table>
                </div>
                }
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
                {jobData.length > 0 && <div style={{ marginLeft: '1rem' }}><strong>Applied Jobs</strong></div>}
                <JobList jobData={jobData} btnReq={false} />
            </div>

        </Fragment>
    );
}
