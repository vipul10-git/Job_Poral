import React, { useState, useEffect, Fragment, useRef } from "react";
import Button from "../components/button";
import Input from "../components/inputBox";
import "../../assets/style/login.css";
import { useHistory } from "react-router-dom";
import LOGO_LARGE from "../../assets/img/logo_large.png"
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
    useEffect(() => {
        sessionStorage.clear();
    }, [])
    function validateForm() {
        let emailRex = /\S+@\S+\.\S+/;
        if (email.length === 0 || !emailRex.test(email)) {
            setError("email")
            return;
        }
        console.log(password)
        if (password.length <= 7) {
            console.log(121212)
            setError("password")
            return;
        }
        if (localStorage.getItem(email)) {
            let userData = JSON.parse(localStorage.getItem(email));
            if (userData.password === password) {
                console.log(12121212)
                sessionStorage.setItem('email', email)
                history.replace("/job-listing");
            } else {
                setError('password')
            }
            return;
        }
        setUi(2);
        localStorage.setItem(email, JSON.stringify({ email: email, password: password }));
    }
    console.log(errorType)
    function submitForm() {
        if (name.length === 0) {
            setError("name")
            return;
        }
        if (mobile.length !== 10) {
            setError("mobile")
            return;
        }
        let data = localStorage.getItem(email);
        data = JSON.parse(data);
        let additionalData = {
            userImg,
            linkedIn,
            githubAccName: githubAccName,
            gitProjSelected,
            mobile,
            name,
            collegeInfo
        }
        data = { ...data[0], ...additionalData };
        sessionStorage.setItem('email', email)
        localStorage.setItem(email, JSON.stringify(data))
        history.replace("/job-listing");
    }

    function getGitAccounts(e) {
        setGithubAccName(e.target.value)
        clearTimeout(callApi);
        callApi = setTimeout(() => apicall(e.target.value), 1000)
    }

    const apicall = (data) => {
        fetch(`https://api.github.com/users/${data}/repos`).then(resp => resp.json()).then(res => {
            let data = []
            res.length > 0 && res.forEach(element => {
                data.push({ name: element.full_name, gitUrl: element.html_url })
            });
            setGitHubAcc(data)
        })
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

    let { collegeName, collegeLastDate } = collegeInfo

    return (
        <div className="login-wrapper content-space-around">
            <div className="displayFlex flex-column align-center">
                <img src={LOGO_LARGE} className="login-logo-img mB1" alt="logo" />
                <div className="hiringFont">Hiring is Simpler, Smarter & Faster with I</div>
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
                        {userImg.length <= 0 && <div className="dummyImage noImg" onClick={() => opneImageBox()}>Upload image</div>}
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
