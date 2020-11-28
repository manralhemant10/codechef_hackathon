import React from 'react'

const SelectedtagLook = (props)=>{
    return(
        
        <>
            <div className="tagLookDiv">
                <strong>{props.tagName}{' '}<span onClick={(e)=>{
                    props.handleFun(e.target.previousSibling.wholeText)}}>X</span></strong>    
            </div>
        </>
    )
}

export default SelectedtagLook