import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="side-bar">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/estimates">Estimates</Link>
                <Link to="/report">Report</Link>
            </nav>
    </div>
  )
}

export default Sidebar