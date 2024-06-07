import React from 'react'
import { getRemainingDividendDates } from '../../util'

const EstTable = ({data}) => {
    function estimate(row){
        const estimatedStockPrice =(Number(row["50DayMovingAverage"])+ Number(row["200DayMovingAverage"]))/2
        console.log(estimatedStockPrice)
        const numberOfSharesOwned = row.amount / estimatedStockPrice

        const estimatedDividendByShares = numberOfSharesOwned * row.DividendPerShare
        
        console.log(getRemainingDividendDates(row.DividendDate).length,"Hereeeeeeeeeee")
        const result =  estimatedDividendByShares * getRemainingDividendDates(row.DividendDate).length

        return parseFloat(result.toFixed(2))
    }

    const totalRemainingYearlyDividend = data.reduce((total, row) => total + estimate(row), 0);


  return (
    <div className='table-container'>
    <table>
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Amount Owned</th>
                <th>Remainning Yearly Dividend Estimate</th>
            </tr>
            
        </thead>

      

        <tbody>
            {data.map((row, index) => {
             
             return  <tr key={index} className='rows'>
                        <td>{index+1}</td>
                        <td>{row.Name}</td>
                        <td>{row.amount}</td>
                        <td>{estimate(row)}</td>
                       
                    </tr>
            })}

                    <tr>
                        <td colSpan="3"></td>
                        <td>Total: {totalRemainingYearlyDividend.toFixed(2)}</td>
                    </tr>
        </tbody>

    </table>

</div>
  )
}

export default EstTable