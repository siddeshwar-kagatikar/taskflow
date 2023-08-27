import React, { useState } from 'react'
import { useContext } from 'react'
import slotContext from '../context/slots/slotContext'
import '../App.css'

export default function CreateSlot() {
    const context = useContext(slotContext)
    const { createslot,sort,slots } = context;

    const [slot, setSlot] = useState({ "title" : "--",
    "dewdate" : new Date(),
    "priority" : 1,
    "status" : "Status",
    "description" : " "})

    const handleClick = (e) => {
        e.preventDefault();
        createslot(slot.title,slot.dewdate,slot.priority,slot.status,slot.description);
        setSlot({ "title": "--",
        "dewdate" : "2023-08-09",
        "priority" : 1,
        "status" : "Status",
        "description" : " "})
    }

    const handlesort = () => {
     sort(slots) 
    }
  return (
    <div align="left">
     <button type="button" className="btn btn-light" onClick={handleClick}>Add <i className="fa-solid fa-plus"></i></button>
     <i className="fa-solid fa-arrow-down-short-wide fa-2xl mx-3" style={{color: '#bbbcbf'}} onClick={handlesort}></i>
    </div>
  )
}
