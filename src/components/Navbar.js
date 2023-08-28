import React from 'react'
import { Link } from 'react-router-dom'
// import logo from './logo1.svg'
import '../App.css'
import Logout from './Logout'
import img from './logo.png'

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" style={{color:'#004a94'}} to="/">TaskFlow</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {!localStorage.getItem('token')?<div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active my-2" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link type="button" className="btn btn-primary my-2 mx-1" to='/login'>Login</Link>
              </li>
              <li className="nav-item">
              <Link type="button" className="btn btn-primary my-2 mx-3" to='/signup'>SignUp</Link>
              </li>
            </ul>
          </div>:<ul className="navbar-nav ms-auto"><Logout/></ul>}
        </div>
      </nav>
    </>
  )
}
