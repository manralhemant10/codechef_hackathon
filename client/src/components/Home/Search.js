import React,{useEffect, useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import SelectedtagLook from './tags/SelectedtagLook'
import Addtag from '../User/Addtag'
import { isLoggedin } from '../Loggedin'

const Search = (props)=>{
    const [inputvalue, setInputvalue] = useState("")
    const [tags,setTags] = useState([{
        tagname:"",
        tagtype:"",
        tagcount:0
    }])
    const [showSelectedTags, setShowSelectedTags]=useState([/*{
        tagname:"",
        tagtype:""
    }*/])
    const logState = useContext(isLoggedin)
    const { loginState } = logState

   const getUserTags=async()=>{
        const token = localStorage.getItem('token')
        const res = await axios.get("http://localhost/codechef/server/api/v1/users/usertag",
         {headers:{Authorization: "Bearer "+token}})
        

        const tarr = (res.data).map(val => ( {
            tagname:val['tagname'],
             tagtype:val['type'],
             tagcount:val['tagcount']
         }))
         setTags(prev=>[...prev,...tarr])
   }

    const  getTags=async()=>{
       const res = await axios.get("http://localhost/codechef/server/api/v1/tags")
 
       setTags((res.data).map(val => ( {
        tagname:val['tagname'],
         tagtype:val['type'],
         tagcount:val['tagcount']
     })))
       
       if(loginState){
        getUserTags()
       }
    }
    useEffect(()=>{
        getTags()
    },[])
    
    const inputChange=(event)=>{
        setInputvalue(event.target.value)
    }
    const matchPrefix =(primaryStr, prefstr)=>{
        let i=0;
        if(prefstr.length>primaryStr.length)
            return false;
        else{
            while(i<prefstr.length){
                if(primaryStr[i]===prefstr[i]){
                    i++
                    continue
                }
                else
                    return false
            }
            return true
        }
        
    }
    
    const filteredSuggestions=  ()=>{
        var count=0
        const tagarr = []
        var val
        for(val of tags){
            if(count>=5)
                break
            if(matchPrefix(val['tagname'].toLowerCase(),inputvalue.toLowerCase())){
                count++;
                tagarr.push(val)
            }
        }
        return tagarr
    } 
    const dropDownSuggClicked =(e)=>{
        setInputvalue("")
        const type = e.currentTarget.dataset.tagtype
        const name =e.target.textContent
        setShowSelectedTags(prev=>{
            props.handleFun([...prev,{
                tagname:name,
                tagtype:type
            }])
            return [...prev,{
                tagname:name,
                tagtype:type
            }]
        })
        
    }
    const removeTag = (deleteval)=>{
        const temparr = showSelectedTags
            var searchTerm = deleteval.slice(0, -1),
                index = -1;
            for(var i = 0, len = temparr.length; i < len; i++) {
                if (temparr[i].tagname === searchTerm) {
                    index = i;
                    break;
                }
            }
             temparr.splice(index, 1);
             props.handleFun(temparr)
        setShowSelectedTags(temparr)
    }
    return(
        <>
        <div className="searchntagsContainer">
                <h1 className="headFiltertag">Filter by Tags</h1>
                <div className="searchnsuggContainer">
                    <input list="tags" value={inputvalue} onChange={inputChange} placeholder="Search tags..."/>
                    <Link className="viewall" to={{
                        pathname:'/alltags',
                        data: tags
                    }
                    }>View all</Link>
                    {
                        inputvalue.length>0?
                        (<ul className="suggestionsContainer">
                            {
                                inputvalue?
                                filteredSuggestions().map((val,index)=>{
                                        return (
                                            <li key={`val${index}`} id={`dropDownSugg${index}`} data-tagtype = {val['tagtype']} onClick={dropDownSuggClicked} value={val['tagname']}>{val['tagname']}</li>
                                        )
                                    })
                                :
                                null

                            }
                        </ul>):null
                    }
                </div>
                    {
                         showSelectedTags.length>0 && inputvalue.length===0?(
                        <div className="selectedTagsContainer">
                            {
                                showSelectedTags.map((val)=>{
                                    return <SelectedtagLook tagName={val['tagname']} handleFun={removeTag}/>
                                })
                            }
                        </div>
                        ):null
                    }
                    {
                        loginState && inputvalue.length===0?
                        <Addtag currTags = {setTags}/>:null
                    }
        </div>
    </>
    )

}

export default Search