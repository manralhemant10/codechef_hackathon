import React, {useState, useEffect,useContext } from 'react'
import axios from 'axios'
import Search from './Search'
import Difficulty from './tags/Difficulty'
import { isLoggedin } from '../Loggedin'
import Basictable from '../table/Basictable'

const Home =()=>{

    const logState = useContext(isLoggedin)
    const { loginState } = logState
    const [ques,setQues] = useState([])
    const [diffselected,setDiffselected] = useState([{
        tagname:"",
        tagtype:""
    }])

    const stylecol = [
        {
            width:"16%"
        },
        {
            width:"48%"
        },
        {
            width:"15%"
        },
        {
            width:"22%"
        },
    ]
    const diffselectedFun = (e)=> Array.isArray(e)?setDiffselected([...e]): setDiffselected([{tagname:e,tagtype:""}])
    
    const nonloggedinuserreq = async(url)=>{
        await axios.get(url)
        .then((res)=>{setQues(res.data)}
        )
        .catch(err=>{
            console.log(err.message);
        })       
    }

    const loggedinusereq = async(url)=>{
        const token = localStorage.getItem('token')
        const js = [...diffselected]
        await axios.post(url,js,{ headers:{Authorization: "Bearer "+token} })
        .then((res)=>{
            setQues(res.data)
        })
        .catch((err)=>{
          
        })
    }

    const getQues = async () => {
        let url=""
        //url according to tagtype-
        if(diffselected.length===0 || diffselected[0]['tagname']==="") {
            
            url = "https://codechefmrtenhunter.000webhostapp.com/questionfilter"
            nonloggedinuserreq(url)
        }
        else{
            if(loginState){
                url = "https://codechefmrtenhunter.000webhostapp.com/users/problems"
                loggedinusereq(url)
             }
             else{
                 url="https://codechefmrtenhunter.000webhostapp.com/questionfilter"
                 diffselected.map((val)=>
                     url+=`/${val['tagname']}`
                 )
                 nonloggedinuserreq(url)
             }
        } 
       

    }

    useEffect(()=>{
        getQues()
    },[diffselected])
 
    //Columns for using in tables , columns is passed to QuesTable as prop
    const columns = [
        {
           
            Header: '#',
            accessor: 'code',
            Cell:(row)=>{
              return(
                  <a href={`https://codechef.com/problems/${row.value}` } rel="noreferrer" target="_blank">{row.value}</a>
              )
          },
          disableSortBy: true
                  
        },
          {
              
            Header: ()=>{
                return(
                <div className="titlenDiff">
                <span>Title</span>
                <Difficulty handleFun={diffselectedFun}/>
                </div>
                )
            },
            accessor: 'name',
            Cell: (row)=>{
                let tempval
                if((row.value)!=null)
                    tempval = row.value
                else
                    tempval=row.row.original.code
              return(
                <a className="rowTitleName" href={`https://codechef.com/problems/${row.row.original.code}` } rel="noreferrer" target="_blank">{tempval}</a>
              )},
              disableSortBy: true

          },
          {
            
              Header: 'Solved',
              accessor:'solved',
            
            },
          {
              Header: 'Attempted',
              accessor: 'attempted',
            }

    ]
    
    return(
        <>
                <div  className="tablensearchContainer">
                    <div className="hometableContainer">
                    <Basictable  data={ques} columns={columns} stylingcol={stylecol}/>
                    </div>
                    <Search handleFun={diffselectedFun} />
                </div>
        </>
    )

}

export default Home