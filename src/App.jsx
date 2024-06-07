import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Estimates from './pages/Estimates'
import Report from './pages/Report'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={ <Home />}/>
      <Route path="/estimates" element={ <Estimates />}/>
      <Route path="/report" element={ <Report />}/> 
    </Routes>
  )
}

export default App
