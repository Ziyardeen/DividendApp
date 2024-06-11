import React, { useState,useEffect } from 'react'
import { getRemainingDividendDates } from '../../util'
import { UpdateStockWithEstimate, getAllStocks } from '../../appwrite/appwrite.config'
import  getExchangeRate from '../../currency-convertor'



const EstTable = () => {
    const[stocks, setStocks] = useState([])
    const[gbpToUsd, setgbpToUsd] = useState(1.27)

    useEffect(() => {
        getAllStocks().then((data) => {  
            
            setStocks(data)
            getExchangeRate("GBP","USD").then((rate) => {
                setgbpToUsd(rate)
             
            })
        })
    
   },[])

   

    function estimate(row){
        const estimatedStockPrice = row.dailyAverageStockPrice 

       
        const numberOfSharesOwned = (row.amountOwned * gbpToUsd) / estimatedStockPrice

        const estimatedDividendByShares = numberOfSharesOwned * row.dividendYield
        
        const numberOfremainingDividends = getRemainingDividendDates(row.dividendPaymentDate)
        const result =  estimatedDividendByShares * numberOfremainingDividends

        return parseFloat(result.toFixed(2))
    }

    const totalRemainingYearlyDividend = stocks.reduce((total, row) => total + estimate(row), 0);


  return (
    <div className='table-container'>
    <table>
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th className='table-center-align'>Amount Owned in USD</th>
                <th className='table-center-align'>Remainning Yearly Dividend Estimate in USD</th>
            </tr>
            
        </thead>

      

        <tbody>
            {stocks.map((row, index) => {
                
                
                UpdateStockWithEstimate(row.symbol,estimate(row))
             
             return  <tr key={index} className='rows'>
                        <td>{row.symbol}</td>
                        <td>{row.name}</td>
                        <td className='table-center-align'>{(parseFloat(row.amountOwned*gbpToUsd).toFixed(2))}</td>
                        <td className='table-center-align'>{row.yearlyDividendEstimate}</td>
                       
                    </tr>
            })}

                    <tr>
                        <td colSpan="3"></td>
                        <td className='table-center-align'>Total: {totalRemainingYearlyDividend.toFixed(2)}</td>
                    </tr>
        </tbody>

    </table>

</div>
  )
}

export default EstTable