import { DatePicker } from 'antd'
import React,{ useState, useContext } from 'react'
import 'react-datepicker/dist/react-datepicker.module.css'
import slotContext from '../context/slots/slotContext'
import { useEffect } from "react";

export default function Calendar(props) {
    const [selectedDate,setselectedDate] = useState(null)
    const [sendDate,setsendDate] = useState(props.date)
    const [writeDate,setwriteDate] = useState(props.date)
    const [render,setrender] = useState(false)
    const [render2,setrender2] = useState(true)
    const context = useContext(slotContext)
    const { updatedate } = context;

    useEffect(() => {
      selectedDate&&setsendDate(String(selectedDate.$y) + "-" + String(selectedDate.$M+1) + "-" + (String(selectedDate.$D+1)))
      selectedDate&&setwriteDate(String(selectedDate.$y) + "-" + String(selectedDate.$M+1) + "-" + (String(selectedDate.$D)))
      // updatedate(props.id,sendDate)
      setrender2(!render2)
      // eslint-disable-next-line 
    },[render])
    useEffect(() => {
      updatedate(props.id,sendDate)
    },[render2])
  return (
    <div className='my-2'>
      <DatePicker
        selected={selectedDate}
        onChange={date=>[setselectedDate(date),setrender(!render)]}
        isClearable
        minDate={new Date()}
        />
        <div>
          <p>{selectedDate?writeDate:String(writeDate).slice(0,10)}</p>
        </div>
    </div>
  )
}
