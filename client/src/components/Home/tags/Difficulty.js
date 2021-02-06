import React from 'react'

const Difficulty = (props)=>{


    return(
        <>
            <div className="selectDiff">
           
                <label for="difficulty">Difficulty:</label>
                <select name="difficulty" id="difficulty" onChange={ e=>props.handleFun(e.target.value)}>
                <option value="" selected hidden></option>
                <option value="" ></option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                </select>
            </div>
        </>
    )
}

export default Difficulty