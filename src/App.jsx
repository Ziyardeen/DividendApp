
import './App.css'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Estimates from './pages/Estimates'
import Report from './pages/Report'
import ReportDetails from './Components/ReportDetails'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={ <Home />}/>
      <Route path="/estimates" element={ <Estimates />}/>
      <Route path="/report" element={ <Report />}/> 
      <Route path="/report/:symbol" element={ <ReportDetails />}/> 
 
    </Routes>
  )
}

export default App
