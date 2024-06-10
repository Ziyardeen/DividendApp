import React, { useEffect, useState } from 'react'
import { generateAIreport } from '../../api-requests'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Loader from './Loader'

import { Audio,CirclesWithBar } from 'react-loader-spinner'
;
import Sidebar from './Sidebar'




const ReportDetails = () => {
    const {symbol} = useParams()
    
    const [report,setReport] = useState("")
    const [Loading,setLoading] = useState(true)

    useEffect(() => {
        generateAIreport(symbol).then((data) => {
            const sanitizedData = DOMPurify.sanitize(data)
            setReport(sanitizedData)
            setLoading(false)
          
        })
    },[symbol])
  

  return (
 <div className='stock-report'>
    <Sidebar/>
 
        {Loading? <div className='loader-container'>
            <CirclesWithBar
            height="500"
            width="500"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
            </div>
            
            : <div className='report-container'>
                <div dangerouslySetInnerHTML={{ __html: report }} />

            </div> 
        }       
 </div>
   

  
  )
}

export default ReportDetails