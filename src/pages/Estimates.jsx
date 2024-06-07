import React from 'react'
import Table from '../Components/Table'
import Sidebar from '../Components/Sidebar'
import data from "../../data.json"
import EstTable from '../Components/EstTable'


const Estimates = () => {
  return (
    <div className='estimates'>
         <div className="container">
            <Sidebar />
            
            <div className="content">

                <div className="top-bar">
                   <h1>ESTIMATES</h1>
                </div>

                <div className="main">
                    <EstTable data = {data}/>
                </div>


            </div>
        </div>
    </div>
  )
}

export default Estimates