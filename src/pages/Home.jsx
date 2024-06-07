import React, { useEffect, useState } from 'react'
import Table from '../Components/Table'
import { useNavigate,Link } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { getAllStocks, postStock } from '../../appwrite/appwrite.config'


 const stocksContext = React.createContext()



const Home = () => {
    const [symbol, setSymbol] = useState('')
    const [amount, setAmount] = useState()
    const [stocks,setStocks] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [invalidStock,setInvalidStock] = useState(false)
    
    useEffect(() => {
         getAllStocks().then((data) => {  
           
             setStocks(data)
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
            setIsSubmitted(!isSubmitted)
            if(data === "Stock does not exist"){
                    setInvalidStock(true)
            }
          console.log(data,"<><><><><><>")
          console.log(invalidStock,"||||||<><><><><><>")
        }).catch((err) => {
          console.log(err)
        })
       
        
    }
    console.log(symbol,"ppppp")
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
                {invalidStock && <h1>Please Enter A Valid Stock Symbol OR Stock May Not Exist on the API</h1>}
                {!invalidStock && <Table data = {stocks}/>}
            </div>


        </div>
    </div>
  )
}

export default Home