import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }
  return (
    <div className='mx-3'>
      <button type="button" className="btn btn-danger" onClick={handlelogout}>Logout</button>
    </div>
  )
}
