import React, { useEffect, useState } from 'react'
import Table from '../Components/Table'
import { useNavigate,Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { getAllStocks, postStock } from '../../appwrite/appwrite.config'


 



const Home = () => {
    const [symbol, setSymbol] = useState('')
    const [amount, setAmount] = useState()
    const [stocks,setStocks] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [invalidStock,setInvalidStock] = useState(false)
    const [isNotDividend,setIsNotDividend] = useState(false)

    
    useEffect(() => {
         getAllStocks().then((data) => {  
           
             setStocks(data)
             setIsSubmitted(false)
         })
     
    },[isSubmitted])






    const handleStockChange = (e)=>{

        setSymbol(e.target.value.toUpperCase())
    }
    const handleAmountChange = (e)=>{
        setAmount(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        postStock(symbol,amount).then((data) => {
            console.log(data,"LLLLLLLLLLL")
            setIsSubmitted(true)
            
            if(data === "Stock is not a dividend stock"){
                    setIsNotDividend(true)
                    setInvalidStock(false)
                   
            }
            if(data === "Unable to fetch Price data to work with"){
                    setIsNotDividend(false)
                    setInvalidStock(true)
                   
            }

          
        }).catch((err) => {
          console.log(err,"KKKKKKKK")
          return
        })
       
        
    }
   
  return (
    <div className="container">
        <Sidebar />
        
        <div className="content">

            <div className="top-bar">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="stock">Stock Symbol</label>
                    <input id='stock' type="text" required onChange={handleStockChange}/>
                    <label htmlFor="amount">Amount owned</label>
                    <input id='amount' type="number" step="any" required onChange={handleAmountChange}/>
                    <button>Submit</button>
                </form>
            
            </div>

            <div className="main">
                
                {isNotDividend && <h1>Stock is not a Dividend Stock</h1>}
                {invalidStock && <h1>Unable to fetch Price data to work with</h1>}
                {!isNotDividend && !invalidStock && <Table data = {stocks}/>}
            </div>


        </div>
    </div>
  )
}

export default Home