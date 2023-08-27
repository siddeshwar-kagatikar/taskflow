import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/slots/slotContext'

export default function Delete(props) {
  const context = useContext(noteContext)
  const {delslot} = context;
  const handleClick = () => {
    delslot(props.id)
  }
  return (
    <div className='my-3'>
      <i className="fa-sharp fa-solid fa-trash" onClick={handleClick}></i>
    </div>
  )
}
