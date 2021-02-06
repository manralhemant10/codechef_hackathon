import React,{useEffect, useState,useContext} from 'react'
import axios from 'axios'
import { isLoggedin } from '../../Loggedin';
import Basictable from '../../table/Basictable';

const Dashboard = ()=>{
    
    const [userQues, setUserques] = useState([]);
   
    const columns = [
        {
            Header: '#',
            accessor: 'code',
            Cell:(row)=>{
              return(
                  <a href={`https://codechef.com/problems/${row.value}` } rel="noreferrer" target="_blank">{row.value}</a>
              )
          }
        },
          {
            Header: 'title',
            accessor: 'prob',
            Cell: (row)=>{
              return(
                <>
                <a className="rowTitleName" href={`https://codechef.com/problems/${row.row.original.code}` } rel="noreferrer" target="_blank">{row.cell.row.original.prob.name}</a>
                <br/><span className="rowTitleOther">Solved:{row.cell.row.original.prob.solved}&nbsp;&nbsp;
                Attempted:{row.cell.row.original.prob.attempted}</span>
                </>
              )}
          },
          {
            Header: 'Tag Name',
            accessor: 'tagname',
          
          }
        

    ]
    const data = userQues

    const getUserques = async()=>{
        const token = localStorage.getItem('token')
        await axios.get("http://localhost/codechef/server/api/v1/users/mytags",
            { headers:{Authorization: "Bearer "+token}}
        )
        .then((res)=>{
            setUserques(res.data)
        }
        )
    }

    useEffect(()=>{
        getUserques()
    },[])

    const stylecol = [
        {
            width:"20%"
        },
        {
            width:"60%"
        },
        {
            width:"20%"
        },
 
    ]

    return(
        <>

                (<div className="dashboardContainer ">
                    <div className="QuesTableContainer Dashboardtable">
                    <Basictable columns={columns} data={data} stylingcol={stylecol}/>
                    </div>
                </div>)
           
        </>
    )
}

export default Dashboard