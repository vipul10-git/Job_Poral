import React from "react";
import Button from "./button";

const LanguageSearch = (props) => {
    let { selectedSalaryFilter, selectSalaryFilter, selectedList, language, selecteListFilter, showFilterTab } = props;
    return (
        <div className='lang-section'>
            <div onClick={showFilterTab} className='displayFlex' style={{ justifyContent: 'flex-end', cursor: 'pointer' }}>X</div>
            <h4>By Language</h4>
            {language.map(i => {
                let applied = false
                if (selectedList.length > 0 && selectedList.indexOf(i) >= 0) {
                    applied = true
                }
                return (
                    <Button
                    active={applied}
                    key={i}
                        onClick={() => selecteListFilter(i)}
                        radius="1rem"
                        padding="0.2rem 1rem"
                        margin='0 0.5rem 0.5rem 0'
                        children={i}>
                    </Button>
                )
            })
            }
            <h4>By Salary </h4>
            {[1, 2].map(i => {
                let applied = false
                if (selectedSalaryFilter === i) {
                    applied = true
                }
                return (
                    <Button
                        active={applied}
                        key={i}
                        onClick={() => selectSalaryFilter(i)}
                        radius="1rem"
                        padding="0.2rem 1rem"
                        margin='0 0.5rem 0.5rem 0'
                        children={i === 1 ? 'Salary min to max' : 'Salary max to min'}>
                    </Button>
                )
            })}
        </div>
    )

};

export default React.memo(LanguageSearch)