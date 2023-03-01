import React, {useEffect, useState} from "react";

const FooterSome = props => {

    const [total,setTotal]=useState(0)

    useEffect(()=>{
        if (props.data?.length) {
            let tempTotal = props?.data?.reduce(
                (acc, current) => acc + parseFloat(current[props.field]) || 0,
                0
            );
            setTotal(tempTotal)
        }

    },[props.data])

    return (
        <td colSpan={props.colSpan} className={` word-break ${props?.className ? props?.className : ''}`} style={props.style}>
            {total?.toLocaleString()}
        </td>
    );
};

export default FooterSome