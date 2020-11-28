import React from 'react'

const Globalfilter =({filter, setFilter})=>{
    return(
        <>
            <span className="filter">
                <input value={filter || ''} onChange={e=>setFilter(e.target.value)} placeholder="Search table..."/>
            </span>
        </>
    )
}

export default Globalfilter