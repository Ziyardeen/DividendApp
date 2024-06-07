import React from 'react'

const Table = ({data,amount}) => {
    let currentDate = new Date()
   currentDate =  currentDate.toISOString().split('T')[0]

    console.log(currentDate)
    
  return (
    <div className='table-container'>
        <table>
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Name</th>
                    <th>Amount Owned</th>
                    <th>50 Day SMA</th>
                    <th>200 Day SMA</th>
                    <th>Ex div Date</th>
                    <th>Dividend/Share</th>
                </tr>
            </thead>

          

            <tbody>
                {data.map((row, index) => {
                 
                 return  <tr key={index} className='rows'>
                            <td>{index+1}</td>
                            <td>{row.Name}</td>
                            <td>{row.amount}</td>
                            <td>{row["50DayMovingAverage"]}</td>
                            <td>{row["200DayMovingAverage"]}</td>
                            <td>{row.DividendDate}</td>
                            <td>{row. DividendPerShare}</td>
                        </tr>
                })}
            </tbody>

        </table>

    </div>
  )
}

export default Table