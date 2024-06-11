import React, { useEffect,useState } from 'react';
import { deleteStock } from '../../appwrite/appwrite.config';
import getExchangeRate from '../../currency-convertor';


const Table = ({ data, handleDelete }) => {
    const[gbpToUsd, setgbpToUsd] = useState(1.27)

   


    useEffect(() => {
        getExchangeRate("GBP","USD").then((rate) => {
            setgbpToUsd(rate)
         
        })
        
      
    },[])


    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Amount Owned in USD</th>
                        <th>Daily Average Price</th>
                        <th>Ex-Dividend Date</th>
                        <th>Nearest Pay Date</th>
                        <th>Dividend/Share</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row.symbol} className='rows'>
                            <td>{row.symbol}</td>
                            <td>{row.name}</td>
                            <td>{(parseFloat(row.amountOwned*gbpToUsd).toFixed(2))}</td>
                            <td>{row.dailyAverageStockPrice}</td>
                            <td>{row.exdividendDate}</td>
                            <td>{row.dividendPaymentDate}</td>
                            <td>{row.dividendYield}</td>
                            <td><button id="delete-btn" onClick={() => handleDelete(row.symbol)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
