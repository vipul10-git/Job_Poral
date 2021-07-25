import React from 'react';
import Bag from "../../assets/img/bag.png";
import LocationIcon from "../../assets/img/location.png";
import Button from './button';

const JobList = (props) => {
    let { jobData, appliedList, btnReq, apply } = props;
    return (
        jobData && jobData.length > 0 && jobData.map((i) => {
            let applied = false
            if(btnReq){
                if (appliedList.length > 0 && appliedList.indexOf(i.id) >= 0) {
                    applied = true
                }
            }
            return (
                <div key={i.id} className="listing displayFlex align-center">
                    <div className="displayFlex flex-column flex3">
                        <span className="mB1">{i.company} - {i.skills.join(', ')}
                            {btnReq && window.innerWidth < 780 && <div style={{ float: "right" }}>
                                <Button
                                    active={applied}
                                    onClick={!applied ? () => apply(i.id) : () => { }}
                                    radius="1rem"
                                    padding="0.2rem 1rem"
                                    children={applied ? "Applied" : 'Apply'}
                                    width="5rem"
                                    height="2rem" />
                            </div>
                            }
                        </span>
                        <div className="displayFlex">
                            <div className="flex1">
                                <img className='bag-icon' src={Bag} alt="bag" />
                                <span className="subText"> &nbsp;{i.exp}-{i.exp + 3} yrs</span>
                            </div>
                            <div className="flex1">
                                <img className='loc-icon' src={LocationIcon} alt="location" />
                                <span className="subText ellpise"> {i.loc}</span>
                            </div>
                            <span className="subText flex1">&#8377; {i.Sal}</span>
                        </div>
                    </div>
                    {btnReq && window.innerWidth > 780 &&
                        <Button
                            active={applied}
                            onClick={!applied ? () => apply(i.id) : () => { }}
                            radius="1rem"
                            padding="0.2rem 1rem"
                            children={applied ? "Applied" : 'Apply'}
                            width="5rem"
                            height="2rem" />
                    }
                </div>
            )
        })
    )
}

export default React.memo(JobList)