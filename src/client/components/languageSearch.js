import React from "react";
import Button from "./button";

const LanguageSearch = (props) => {
    let { selectedList, language, selectedLanguage } = props;
    return (
        <div className='lang-section'>
            {language.map(i => {
                let appliedText = { bColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(203deg, 85%, 52%)", color: "hsl(203deg, 85%, 52%)" }
                if (selectedList.length > 0 && selectedList.indexOf(i) >= 0) {
                    appliedText = { bColor: "hsl(203deg, 85%, 52%)", border: "none", color: "hsl(0, 0%, 100%)" }
                }
                return (
                    <Button
                        key = {i}
                        border={appliedText.border}
                        bColor={appliedText.bColor}
                        onClick={() => selectedLanguage(i)}
                        radius="1rem"
                        padding="0.2rem 1rem"
                        color={appliedText.color}
                        children={i}>
                    </Button>
                )

            })
            }
        </div>
    )

};

export default React.memo(LanguageSearch)