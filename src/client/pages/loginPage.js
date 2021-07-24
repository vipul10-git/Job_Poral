import React, { useState, useEffect, Fragment, useRef } from "react";
import Button from "../components/button";
import Input from "../components/inputBox";
import "../../assets/style/login.css";
import { useHistory } from "react-router-dom";
import LOGO_LARGE from "../../assets/img/logo_large.png";
import {setTheme} from'../util/constFun';
import {useDispatch} from 'react-redux';
import {getUserGithubdata, clearReducer} from '../../action/action';
import Container from '../../container/dataContainer';

let callApi;
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [name, setName] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [collegeInfo, setCollege] = useState({ collegeName: "", collegeLastDate: "" });
    const [gitHubAcc, setGitHubAcc] = useState([]);
    const [githubAccName, setGithubAccName] = useState("");
    const [gitProjSelected, setGitProjSelected] = useState([]);
    const [errorType, setError] = useState("");
    const [password, setPassword] = useState("");
    const [userImg, setUserImg] = useState("");
    const [ui, setUi] = useState(1);
    let history = useHistory();
    const inputFile = useRef(null)
    const dispatch = useDispatch();

    let {gitHubUserData} = Container();

    useEffect(() => {
        dispatch(clearReducer());
        if(sessionStorage.getItem('email')){
            let userdataifavailable = localStorage.getItem(sessionStorage.getItem('email'))
            userdataifavailable = JSON.parse(userdataifavailable);
            if(userdataifavailable.userExtraData){
                history.replace('/job-listing')
            }else{
                setUi(2);
            }
        }
    }, [])

    useEffect(() => {
        setGitHubAcc(gitHubUserData)
    }, [gitHubUserData])

    function validateForm() {
        let emailRex = /\S+@\S+\.\S+/;
        if (email.length === 0 || !emailRex.test(email)) {
            setError("email")
            return;
        }
        if (password.length <= 7) {
            setError("password")
            return;
        }
        if (localStorage.getItem(email)) {
            let userData = JSON.parse(localStorage.getItem(email));
            if (userData.password === password) {
                sessionStorage.setItem('email', email)
                if(!userData.userExtraData){
                    setUi(2);
                }else{
                    history.replace("/job-listing");
                }
            } else {
                setError('password')
            }
            return;
        }
        sessionStorage.setItem('email', email)
        setUi(2);
        
        localStorage.setItem(email, JSON.stringify({ email: email, password: password }));
    }

    function submitForm() {
        if (name.length === 0) {
            setError("name")
            return;
        }
        if (mobile.length !== 10) {
            setError("mobile")
            return;
        }
        let data = localStorage.getItem(sessionStorage.getItem('email') ? sessionStorage.getItem('email') : email);
        data = JSON.parse(data);
        let additionalData = {
            userImg,
            linkedIn,
            githubAccName: githubAccName,
            gitProjSelected,
            mobile,
            name,
            collegeInfo,
            appliedList:[],
            userExtraData : true,
        }
        data = { ...data, ...additionalData };
        localStorage.setItem(data.email, JSON.stringify(data))
        history.replace("/job-listing");
    }

    function getGitAccounts(e) {
        setGithubAccName()
        clearTimeout(callApi);
        callApi = setTimeout(() => dispatch(getUserGithubdata(e.target.value)), 1000)
    }

    const opneImageBox = () => {
        inputFile.current.click();
    }

    const loadFile = (event) => {
        setUserImg(URL.createObjectURL(event.target.files[0]))
    };

    const addGitAccount = (i, e) => {
        if (e.target.checked) {
            setGitProjSelected([...gitProjSelected, i])
        } else {
            let updatedList = gitProjSelected.filter(element => element.name !== i.name)
            setGitProjSelected(updatedList)
        }
    }

    const themeSet = () =>{
        let theme = localStorage.getItem('selectedTheme');
        if(theme === 'theme-light'){
            theme = 'theme-dark'
        }else{
            theme = 'theme-light'
        }
        localStorage.setItem('selectedTheme',theme);
        setTheme()
    }

    let { collegeName, collegeLastDate } = collegeInfo

    return (
        <div className="login-wrapper content-space-around">
            <div className="displayFlex flex-column align-center">
                <img src={LOGO_LARGE} className="login-logo-img mB1" alt="logo" />
                <div className="hiringFont">Hiring is Simpler, Smarter & Faster with I</div>
            <Button
                active={true}
                onClick={()=>themeSet()}
                radius="1rem"
                padding="0.5rem 2rem"
                margin ="1rem"
                children='change Theme'>
            </Button>
            </div>

            <div className="Login">
                {ui === 1 && <Fragment>
                    <div className="mB1 displayFlex">
                        <label className="flex1">Email Address</label>
                        <Input
                            errorType={errorType === "email" ? true : false}
                            type="email"
                            value={email}
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            onClick={() => setError("")}
                            autoFocus={true}
                        />
                    </div>
                    <div className="mB1 displayFlex">
                        <label className="flex1">Password</label>
                        <Input
                            errorType={errorType === "password" ? true : false}
                            type="password"
                            value={password}
                            placeholder="Enter min 8 characters"
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={() => setError("")}
                        />
                    </div>
                </Fragment>}
                {ui === 2 && <Fragment>
                    <div>
                        <input type="file" accept="image/*" name="image" ref={inputFile} id="file" onChange={loadFile} style={{ display: "none" }} />
                        {userImg.length > 0 && <img src={userImg} id="imgId" alt="user-img" className="user-img" onClick={() => opneImageBox()} />}
                        {userImg.length <= 0 && <div className="dummyImage" onClick={() => opneImageBox()}>Upload image</div>}
                    </div>
                    <div className="mB1 displayFlex">
                        <label className="flex1">Name</label>
                        <Input
                            errorType={errorType === "name" ? true : false}
                            type="text"
                            value={name}
                            placeholder="Character only"
                            onChange={(e) => setName(e.target.value)}
                            onClick={() => setError("")}
                        />
                    </div>
                    <div className="mB1 displayFlex">
                        <label className="flex1">Mobile Number</label>
                        <Input
                            errorType={errorType === "mobile" ? true : false}
                            type="number"
                            maxlength="10"
                            value={mobile}
                            placeholder="Mobile number"
                            onChange={(e) => setMobile(e.target.value)}
                            onClick={() => setError("")}
                        />
                    </div>
                    <div className="mB1"><u><strong>College Info</strong></u></div>
                    <div className="mB1 displayFlex">
                        <label className="flex1">College Name</label>
                        <Input
                            errorType={false}
                            type="text"
                            value={collegeName}
                            placeholder="Enter your college name"
                            onChange={(e) => setCollege({ collegeName: e.target.value, collegeLastDate: collegeLastDate })}
                        />
                    </div>
                    <div className="mB1 displayFlex">
                        <label className="flex1">Year of Completion</label>
                        <Input
                            errorType={false}
                            type="date"
                            value={collegeLastDate}
                            placeholder="When you completed the College"
                            onChange={(e) => setCollege({ collegeName: collegeName, collegeLastDate: e.target.value })}
                        />
                    </div>
                    <div className="mB1"><u><strong>Link Account</strong></u></div>
                    <div className="mB1 displayFlex">
                        <label className="flex1">LinkedIn</label>
                        <Input
                            errorType={false}
                            type="url"
                            value={linkedIn}
                            placeholder="LinkedIn "
                            onChange={(e) => setLinkedIn(e.target.value)}
                        />
                    </div>
                    <div className="mB1 displayFlex">
                        <label className="flex1">GitHub</label>
                        <Input
                            errorType={false}
                            type="url"
                            value={githubAccName}
                            placeholder="GitHub"
                            onChange={(e) => getGitAccounts(e)}
                        />
                    </div>
                    <div>
                        {gitHubAcc.length > 0 && gitHubAcc.map(i => {
                            return (
                                <div key={i.name}>
                                    <Input
                                        errorType={false}
                                        type="checkbox"
                                        placeholder="GitHub"
                                        onChange={(e) => addGitAccount(i, e)}
                                    />
                                    <label className="flex1" style={{ cursor: "pointer" }} onClick={() => window.open(i.gitUrl)}>{i.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </Fragment>
                }
                <div className="content-space-around displayFlex">
                        <Button
                            active={true}
                            onClick={ui === 1 ? () => validateForm():() => submitForm()}
                            radius="1rem"
                            padding="0.5rem 2rem"
                            children={ui === 1 ? "Login" : "Submit"}>
                        </Button>
                    </div>
            </div></div>
    );
}
