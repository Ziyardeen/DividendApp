import React from 'react'
import { deleteStock } from '../../appwrite/appwrite.config'

const Table = ({data,amount}) => {

    const handleDelete = (row)=>{
       
        deleteStock(row.symbol)
    }

  
    
  return (
    <div className='table-container'>
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Amount Owned</th>
                    <th>Daily Average Price</th>
                    <th>Ex-Dividend Date</th>
                    <th>Nearest Pay Date</th>
                    <th>Dividend/Share</th>
                    <th>Action</th>
                </tr>
            </thead>

          

            <tbody>
                {data.map((row, index) => {
                 
                 return  <tr key={index} className='rows'>
                            <td>{row.symbol}</td>
                            <td>{row.name}</td>
                            <td>{row.amountOwned}</td>
                            <td>{row.dailyAverageStockPrice}</td>
                            <td>{row.exdividendDate}</td>
                            <td>{row.dividendPaymentDate}</td>
                            <td>{row.dividendYield}</td>
                            <td><button id="delete-btn" onClick={() => handleDelete(row)}>Delete</button></td>
                        </tr>
                })}
            </tbody>

        </table>

    </div>
  )
}

export default Table