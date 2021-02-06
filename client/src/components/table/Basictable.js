import React from 'react'
import {useTable, useSortBy, usePagination, useGlobalFilter} from 'react-table'
import Globalfilter from './Globalfilter'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const Basictable = (props)=>{

   const generateSortingIndicator = column => {
  return column.isSorted ? (column.isSortedDesc ? <ArrowDropDownIcon fontSize="Large"/> : <ArrowDropUpIcon fontSize="Large"/>) : ""
} 
   
    const columns = props.columns
    const data = props.data
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        state,
        setGlobalFilter, 
        prepareRow,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 7 }
    },useGlobalFilter ,useSortBy,usePagination)
    
    const {pageIndex,globalFilter}=state
    
    return (
        <div className="basicTableContainer">
                <Globalfilter filter={globalFilter} setFilter={setGlobalFilter}/>
                <table {...getTableProps()} >
                    {//styling each column
                    (props.stylingcol).map((val)=>{
                        return(
                            <col span="1" style={val}/>
                        )
                    })
                    }
                     <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {generateSortingIndicator(column)}
                                </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </table>
                <div className="belowTablediv">
                    <button onClick={()=>previousPage()}disabled={!canPreviousPage}>{'<'}</button>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex+1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <button onClick={()=>nextPage()} disabled={!canNextPage}>{'>'}</button>
                </div>
                <span className="gotoPageSpan">
                        Go to page : {' '}
                        <input type='number' defaultValue={pageIndex+1} onChange={e=>{
                            const pageNumber = e.target.value?e.target.value-1:0
                            gotoPage(pageNumber)
                        }}/>
                </span>
        </div>
    )
}

export default Basictable