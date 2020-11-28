import React from 'react'
import Basictable from '../table/Basictable'


const Viewalltags = (props)=>{
  
  
       const  columns = [
            {
              Header: 'Tagname',
              accessor: 'tagname',
              disableSortBy: true

              },
            {
                Header: 'Count',
                accessor:'tagcount',
              },
            {
                Header: 'type',
                accessor: 'tagtype',
               }
  
      ]
      const data = props.location.data

      const stylecol = [
        {
            width:"40%"
        },
        {
            width:"10%"
        },
        {
            width:"10%"
        },
    ]

    return(
        <>
       
       <div  className="DashboardContainer">
                    <h1 className="dashboaedhead">All Tags</h1>
                    <div className="Dashboardtable ">
                    <Basictable columns={columns} data={data} stylingcol={stylecol}/>
                </div>
            </div>
        </>
    )
}

export default Viewalltags