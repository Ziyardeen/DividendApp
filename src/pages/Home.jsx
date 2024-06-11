import React, { useEffect, useState } from 'react';
import Table from '../Components/Table';
import { deleteStock, getAllStocks, postStock } from '../../appwrite/appwrite.config';
import Sidebar from '../Components/Sidebar';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [symbol, setSymbol] = useState('');
    const [amount, setAmount] = useState('');
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchStocks = async () => {
        setLoading(true); 
        const data = await getAllStocks();
        setStocks(data);
        setLoading(false); 
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    const handleStockChange = (e) => {
        setSymbol(e.target.value.toUpperCase());
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await postStock(symbol, amount);
            
            if (data === "Stock is not a dividend stock") {
                toast.error('Stock is not a Dividend Stock', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else if (data === "Unable to fetch Price data to work with") {
                toast.error('Unable to fetch Price data to work with', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else if (data === "Unable to fetch Price data to work with") {
                toast.error('Unable to fetch Price data to work with', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
             else {
                await fetchStocks(); 
                toast.success('Stock added successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (err) {
            
            if (err.status === 404) {
                toast.error('Stock cannot be found on the Polygon API', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })
            }
            else if(err.code === 409){
                toast.error('Stock Already Exist', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })
            }
            else if(err.status === 429){
                toast.error('Error: TOO MANY REQUESTS, Please try Again', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })
            }
            else {
                toast.error('Error', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })
            }
        }
    };

    const handleDelete = async (symbol) => {
        await deleteStock(symbol);
        await fetchStocks(); 
    };

    if (loading) return <div>Loading...</div>; 

    return (
        <div className="container">
            <Sidebar />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <div className="content">
                <div className="top-bar">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="stock">Stock Symbol</label>
                        <input id='stock' type="text" required onChange={handleStockChange} />
                        <label htmlFor="amount">Amount owned (GBP)</label>
                        <input id='amount' type="number" step="any" required onChange={handleAmountChange} />
                        <button>Submit</button>
                    </form>
                </div>
                <div className="main">
                    <Table data={stocks} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default Home;
