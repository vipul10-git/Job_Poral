import React from 'react';
import Button from "../components/button";

const Pagination = (props) =>{
    let {getnextSetdata , paginationPosi, totalData, length} = props
    let paginationUI = [];
    let i=1
    while(i<totalData){
        paginationUI.push(i);
        i=i+length;
    }
return (
       
         paginationUI.map((i)=>{
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
    )

}

export default React.memo(Pagination);