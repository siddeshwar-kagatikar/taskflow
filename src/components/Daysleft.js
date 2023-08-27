import React from 'react'
import moment from 'moment'

export default function Daysleft(props) {
    const presentdate = moment().format("YYYY-MM-DD")
    const dewdate = String(props.date).slice(0,10)
    const d1 =  new Date((dewdate).slice(0,10))
    const d2 = new Date(String(presentdate).slice(0,10))
    var daysintime = d1.getTime() - d2.getTime()
    var daysleft = daysintime/(1000*3600*24)

    return (
    <div>
      {daysleft>=0?<span className="badge text-bg-success">{`${daysleft} Days Left`}</span>:<span className="badge text-bg-danger">{`${-daysleft} Days overdew`}</span>}
    </div>
  )
}
