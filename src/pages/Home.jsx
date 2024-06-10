import React, { useEffect, useState } from 'react'
import Table from '../Components/Table'
import { useNavigate,Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { getAllStocks, postStock } from '../../appwrite/appwrite.config'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


 



const Home = () => {
    const [symbol, setSymbol] = useState('')
    const [amount, setAmount] = useState()
    const [stocks,setStocks] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [invalidStock,setInvalidStock] = useState(false)
    const [isNotDividend,setIsNotDividend] = useState(false)
    const [notFound,setNotFound] = useState(false)

    
   
 
    useEffect(() => {
        toast('Component rendered');
         getAllStocks().then((data) => {  
           
             setStocks(data)
             setIsSubmitted(true)
         })
     
    },[isSubmitted,stocks])






    const handleStockChange = (e)=>{

        setSymbol(e.target.value.toUpperCase())
    }
    const handleAmountChange = (e)=>{
        setAmount(e.target.value)
    }
    
   
    const handleSubmit = (e)=>{
        e.preventDefault()

        postStock(symbol,amount).then((data) => {
           
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
            console.log(typeof err.status,"KKKKKKKK")
            if(err.status === 404){
                console.log("hi");
                setNotFound(true)
            }
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
                
                {notFound && <h1>Stock connot be found on the Polygon API</h1>}
                {isNotDividend && <h1>Stock is not a Dividend Stock</h1>}
                {invalidStock && <h1>Unable to fetch Price data to work with</h1>}
                {!isNotDividend && !invalidStock && !notFound && <Table data = {stocks}/>}
            </div>


        </div>
    </div>
  )
}

export default Home