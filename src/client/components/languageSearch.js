import React from "react";
import Button from "./button";

const LanguageSearch = (props) => {
    let { selectedSalaryFilter, selectSalaryFilter, selectedList, language, selecteListFilter, showFilterTab } = props;
    return (
        <div className='lang-section'>
            <div onClick={showFilterTab} className='displayFlex' style={{ justifyContent: 'flex-end', cursor: 'pointer' }}>X</div>
            <h4>By Language</h4>
            {language.map(i => {
                let appliedText = { bColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(203deg, 85%, 52%)", color: "hsl(203deg, 85%, 52%)" }
                if (selectedList.length > 0 && selectedList.indexOf(i) >= 0) {
                    appliedText = { bColor: "hsl(203deg, 85%, 52%)", border: "none", color: "hsl(0, 0%, 100%)" }
                }
                return (
                    <Button
                        key={i}
                        border={appliedText.border}
                        bColor={appliedText.bColor}
                        onClick={() => selecteListFilter(i)}
                        radius="1rem"
                        padding="0.2rem 1rem"
                        color={appliedText.color}
                        margin='0 0.5rem 0.5rem 0'
                        children={i}>
                    </Button>
                )
            })
            }
            <h4>By Salary </h4>
            {[1, 2].map(i => {
                let appliedText = { bColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(203deg, 85%, 52%)", color: "hsl(203deg, 85%, 52%)" }
                if (selectedSalaryFilter === i) {
                    appliedText = { bColor: "hsl(203deg, 85%, 52%)", border: "none", color: "hsl(0, 0%, 100%)" }
                }
                return (
                    <Button
                        key={i}
                        border={appliedText.border}
                        bColor={appliedText.bColor}
                        onClick={() => selectSalaryFilter(i)}
                        radius="1rem"
                        padding="0.2rem 1rem"
                        color={appliedText.color}
                        margin='0 0.5rem 0.5rem 0'
                        children={i === 1 ? 'Salary min to max' : 'Salary max to min'}>
                    </Button>
                )
            })}
        </div>
    )

};

export default React.memo(LanguageSearch)