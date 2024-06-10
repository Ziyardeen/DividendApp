import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllStocks } from '../../appwrite/appwrite.config'
import Sidebar from '../Components/Sidebar'

const Report = () => {
  const [stocks, setStocks] = useState([])

useEffect(() => {
  
  getAllStocks().then((data) => {
    setStocks(data)
  })
},[])

const handleGenerate = ()=>{
 
}


  return (
///
<div className='reports'>
  <div className="container">
    <Sidebar />
    <div className="content">

      <div className="top-bar">
          <h1 className='table-center-align' >Reports</h1>
      </div>

      <div className="main">
        <div className='table-container'>
                  
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Report</th>
              </tr>
            </thead>

            <tbody>
                {stocks.map((row, index) => {
                
                return  <tr key={index} className='rows'>
                            <td>{row.symbol}</td>
                            <td>{row.name}</td>
                            <td><Link id="generate-btn" to={`${row.symbol}`}>Generate</Link></td>    
                        </tr>
                })}
            </tbody>

          </table>

        </div>
      </div>


   </div>
  </div>
</div>
///


    
  )
}

export default Report