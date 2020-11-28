import React, { useState } from 'react'
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Addtag = (props)=>{
    const [usertagname, setUsertagname] = useState("")
    const [problemcode, setProblemcode]=useState("")

    const userTagFun = (e)=> setUsertagname(e.target.value)
    const probleCodeFun =(e)=> setProblemcode(e.target.value)
    const [userTagStatus, setUserTagStatus] = useState("")
    
    const actionTag = async(param)=>{
        const token = localStorage.getItem('token')
        const url = "https://codechefmrtenhunter.000webhostapp.com/users/"+param
        await axios.post(url, {
            usertag:usertagname,
            problemcode:problemcode
        },
        {
                headers:{Authorization: "Bearer "+token}
        })
        .then((res)=>{
            setUserTagStatus(res.data.status)
            setTimeout(() => {
                setUserTagStatus("")
            }, 1000);
            
            setUsertagname("")
            setProblemcode("")
            props.currTags()
        })
        .catch((err)=>{
            setUserTagStatus("Unauthorized")
            setUsertagname("")
            setProblemcode("")
        })
    }

    const addTag =()=>{
        if(usertagname.length>0 && problemcode.length>0)actionTag("addtag")
        else{
             setUserTagStatus("names cannot be empty")
             setTimeout(() => {
                setUserTagStatus("")
            }, 1000);
        }
    }
    const removeTag =()=>{
        if(usertagname.length>0 && problemcode.length>0)actionTag("removetag")
        else{
             setUserTagStatus("names cannot be empty")
             setTimeout(() => {
                setUserTagStatus("")
            }, 1000);
        }
    }
return(
    <>
        <div className="addtagContainer">
                <h1>Add/Remove tag</h1>
                <input type="text" value={usertagname} onChange={userTagFun} placeholder="Tag Name" />
                <input type="text" value={problemcode} onChange={probleCodeFun} placeholder="Problem Code" />
                <div className="addremovebtn">
                    <AddIcon fontSize="large" onClick={addTag}>Add tag</AddIcon>
                    <RemoveIcon fontSize="large" onClick={removeTag}>remove tag</RemoveIcon>
                </div>
            <span style={{color: "#029adb",fontSize:"2.5rem"}}>{userTagStatus}</span>
        </div>
    </>
)

}

export default Addtag